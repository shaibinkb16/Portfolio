import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const EMAILJS_SERVICE_ID = 'service_hsw3ufm';
const EMAILJS_TEMPLATE_ID = 'template_uge58en';
const EMAILJS_PUBLIC_KEY = '7BJU6XZt7VqAxd8Ye';
const RECIPIENT_EMAIL = 'shaibinkb16@gmail.com';

async function sendNewSessionEmail(metadata) {
  const message = `
New visitor landed on your portfolio!

📍 Location: ${metadata.city}, ${metadata.country}
🔗 Referrer: ${metadata.referer}
🌐 IP Address: ${metadata.ip}
📱 Device: ${metadata.userAgent}
🖥️ Screen: ${metadata.screen} (Language: ${metadata.lang})
⏰ Time: ${metadata.timestamp}

View live visitor streams at:
https://www.shaibin-kb.in/api/visit?secret=${process.env.ANALYTICS_SECRET || 'shaibin_analytics_key'}
  `.trim();

  const payload = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    template_params: {
      name: 'Portfolio Tracker',
      email: RECIPIENT_EMAIL,
      message: message,
    },
  };

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('EmailJS error:', text);
    }
  } catch (err) {
    console.error('Failed to send email alert:', err);
  }
}

export async function POST(request) {
  // 1. Increment total visit counter
  const count = await redis.incr('portfolio:visits');

  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ count });
    }

    const body = await request.json().catch(() => null);
    if (!body || !body.sessionId) {
      return NextResponse.json({ count });
    }

    const { sessionId, type, path, screen, lang, tz, action } = body;

    const sessionMetaKey = `portfolio:session:${sessionId}:metadata`;
    const sessionActionsKey = `portfolio:session:${sessionId}:actions`;

    // Check if this session is already registered in Redis
    const sessionExists = await redis.exists(sessionMetaKey);

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';

    // If it's a new session, gather metadata, record it, and send an email alert
    if (sessionExists === 0) {
      const ip = request.headers.get('x-forwarded-for') || request.ip || 'Unknown';
      const userAgent = request.headers.get('user-agent') || 'Unknown';
      const referer = request.headers.get('referer') || 'Direct';
      
      const country = request.headers.get('x-vercel-ip-country') || request.headers.get('x-nf-country') || 'Unknown';
      const city = request.headers.get('x-vercel-ip-city') || 'Unknown';

      const cleanIp = ip.split(',')[0].trim();

      const metadata = {
        sessionId,
        ip: cleanIp,
        userAgent,
        referer,
        country,
        city,
        screen: screen || 'Unknown',
        lang: lang || 'Unknown',
        tz: tz || 'Unknown',
        timestamp
      };

      // Store session metadata
      await redis.set(sessionMetaKey, JSON.stringify(metadata));
      
      // Add session to global sessions list and keep last 150 sessions
      await redis.lpush('portfolio:sessions', sessionId);
      await redis.ltrim('portfolio:sessions', 0, 149);

      // Email developer if IP is new and not local host
      const isNewVisitor = await redis.sadd('portfolio:unique_ips', cleanIp);
      if (isNewVisitor === 1 && cleanIp !== 'Unknown' && cleanIp !== '127.0.0.1' && cleanIp !== '::1') {
        await sendNewSessionEmail(metadata);
      }
    }

    // 2. Append this specific action (e.g. Pageview, click) to session history
    const actionItem = {
      type,
      path,
      action: action || null,
      timestamp
    };
    await redis.rpush(sessionActionsKey, JSON.stringify(actionItem));
    await redis.ltrim(sessionActionsKey, 0, 49); // Keep last 50 actions for this session

  } catch (err) {
    console.error('Error recording analytics in POST:', err);
  }

  return NextResponse.json({ count });
}

export async function GET(request) {
  const count = await redis.get('portfolio:visits') ?? 0;
  
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // Securely expose detailed session logs if query secret matches environment key
  if (secret && secret === process.env.ANALYTICS_SECRET) {
    try {
      const sessionIds = await redis.lrange('portfolio:sessions', 0, -1);
      
      const sessionPromises = sessionIds.map(async (sessionId) => {
        const metaKey = `portfolio:session:${sessionId}:metadata`;
        const actionsKey = `portfolio:session:${sessionId}:actions`;
        
        const [metaRaw, actionsRaw] = await Promise.all([
          redis.get(metaKey),
          redis.lrange(actionsKey, 0, -1)
        ]);

        let metadata = null;
        if (metaRaw) {
          metadata = typeof metaRaw === 'string' ? JSON.parse(metaRaw) : metaRaw;
        }

        const actions = actionsRaw.map((action) => {
          try {
            return typeof action === 'string' ? JSON.parse(action) : action;
          } catch {
            return action;
          }
        });

        return {
          sessionId,
          metadata,
          actions
        };
      });

      const sessions = await Promise.all(sessionPromises);
      return NextResponse.json({ count, sessions });
    } catch (err) {
      return NextResponse.json({ error: 'Failed to retrieve session logs', details: err.message }, { status: 500 });
    }
  }

  // Backwards compatible response for Footer.jsx visit display
  return NextResponse.json({ count });
}
