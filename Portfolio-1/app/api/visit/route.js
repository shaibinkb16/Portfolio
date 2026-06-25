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

const countryNames = {
  'IN': 'India 🇮🇳',
  'US': 'United States 🇺🇸',
  'GB': 'United Kingdom 🇬🇧',
  'DE': 'Germany 🇩🇪',
  'FR': 'France 🇫🇷',
  'CA': 'Canada 🇨🇦',
  'AU': 'Australia 🇦🇺',
  'SG': 'Singapore 🇸🇬',
  'JP': 'Japan 🇯🇵',
  'BR': 'Brazil 🇧🇷',
  'RU': 'Russia 🇷🇺',
  'AE': 'United Arab Emirates 🇦🇪',
  'NL': 'Netherlands 🇳🇱',
  'SE': 'Sweden 🇸🇪',
  'CH': 'Switzerland 🇨🇭',
  'UA': 'Ukraine 🇺🇦',
  'IT': 'Italy 🇮🇹',
  'ES': 'Spain 🇪🇸',
  'MY': 'Malaysia 🇲🇾',
  'LK': 'Sri Lanka 🇱🇰',
  'NP': 'Nepal 🇳🇵',
  'BD': 'Bangladesh 🇧🇩',
  'PK': 'Pakistan 🇵🇰',
  'Unknown': 'Unknown Location 🌐'
};

const parseUA = (uaString) => {
  if (!uaString) return { browser: 'Unknown Browser', os: 'Unknown OS' };
  let browser = 'Unknown Browser';
  let os = 'Unknown OS';
  const ua = uaString.toLowerCase();
  
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('macintosh') || ua.includes('mac os')) os = 'macOS';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';

  if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('chrome') && !ua.includes('chromium')) browser = 'Chrome';
  else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
  else if (ua.includes('edge') || ua.includes('edg')) browser = 'Edge';
  else if (ua.includes('opr') || ua.includes('opera')) browser = 'Opera';

  return { browser, os };
};

async function sendNewSessionEmail(metadata) {
  const uaParsed = parseUA(metadata.userAgent);
  const deviceLabel = `${uaParsed.browser} on ${uaParsed.os}`;
  
  const country = metadata.country || 'Unknown';
  const countryName = countryNames[country.toUpperCase()] || `${country} 🌐`;
  const cityStr = metadata.city && metadata.city !== 'Unknown' ? `${metadata.city}, ` : '';
  const locationLabel = `${cityStr}${countryName}`;

  const secret = process.env.ANALYTICS_SECRET || 'shaibin_analytics_key';
  const dashboardUrl = `https://www.shaibin-kb.in/api/visit?secret=${secret}`;

  const message = `
==================================================
        PORTFOLIO TELEMETRY: NEW VISITOR ALERT     
==================================================

📍 Location:   ${locationLabel}
🌐 IP Address: ${metadata.ip || 'Unknown'}
🔗 Referrer:   ${metadata.referer || 'Direct'}

📱 Device:     ${deviceLabel}
🖥️ Screen:     ${metadata.screen || 'Unknown'} (${metadata.lang || 'Unknown'})
⏰ Time:       ${metadata.timestamp || 'Unknown'}

--------------------------------------------------
View active session details & live logs:
${dashboardUrl}
==================================================
  `.trim();

  const payload = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    template_params: {
      name: 'Portfolio Tracker',
      email: RECIPIENT_EMAIL,
      message: message,
      // Individual fields for rich EmailJS templates
      location: locationLabel,
      ip: metadata.ip || 'Unknown',
      referer: metadata.referer || 'Direct',
      device: deviceLabel,
      screen: metadata.screen || 'Unknown',
      lang: metadata.lang || 'Unknown',
      timezone: metadata.tz || 'Unknown',
      timestamp: metadata.timestamp || 'Unknown',
      dashboard_url: dashboardUrl
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

  const expectedSecret = process.env.ANALYTICS_SECRET || 'shaibin_analytics_key';

  // Securely render HTML dashboard if secret key matches
  if (secret && secret === expectedSecret) {
    try {
      const [totalUniqueIps, sessionIds] = await Promise.all([
        redis.scard('portfolio:unique_ips'),
        redis.lrange('portfolio:sessions', 0, -1)
      ]);

      const uniqueIps = totalUniqueIps || 0;
      
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

        return { sessionId, metadata, actions };
      });

      const sessions = await Promise.all(sessionPromises);
      const validSessions = sessions.filter(s => s.metadata !== null);

      // Aggregations
      let totalActions = 0;
      let interactiveSessions = 0;
      const pageCounts = {};
      const referrerCounts = {};
      const countryCounts = {};
      let mobileCount = 0;
      let desktopCount = 0;

      validSessions.forEach(s => {
        const meta = s.metadata || {};
        const actions = s.actions || [];
        totalActions += actions.length;

        const hasClicks = actions.some(a => a.type === 'click');
        if (hasClicks) {
          interactiveSessions++;
        }

        // Count pageviews
        actions.forEach(a => {
          if (a.type === 'pageview') {
            const p = a.path || '/';
            pageCounts[p] = (pageCounts[p] || 0) + 1;
          }
        });

        // Count referrers
        const refRaw = meta.referer || 'Direct';
        let refClean = 'Direct';
        if (refRaw && refRaw !== 'Direct' && refRaw !== 'Unknown') {
          try {
            const urlObj = new URL(refRaw);
            refClean = urlObj.hostname;
          } catch {
            refClean = refRaw;
          }
        }
        referrerCounts[refClean] = (referrerCounts[refClean] || 0) + 1;

        // Count countries
        const country = meta.country || 'Unknown';
        countryCounts[country] = (countryCounts[country] || 0) + 1;

        // Count devices
        const screen = meta.screen || '';
        const width = parseInt(screen.split('x')[0]) || 0;
        const ua = (meta.userAgent || '').toLowerCase();
        if (width > 0) {
          if (width < 768) mobileCount++;
          else desktopCount++;
        } else {
          if (ua.includes('mobi') || ua.includes('android') || ua.includes('iphone')) {
            mobileCount++;
          } else {
            desktopCount++;
          }
        }
      });

      const topPages = Object.entries(pageCounts)
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      const topReferrers = Object.entries(referrerCounts)
        .map(([referrer, count]) => ({ referrer, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      const topCountries = Object.entries(countryCounts)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      const totalSessionsCount = validSessions.length;
      const interactionRate = totalSessionsCount > 0 ? Math.round((interactiveSessions / totalSessionsCount) * 100) : 0;
      const avgActions = totalSessionsCount > 0 ? (totalActions / totalSessionsCount).toFixed(1) : 0;



      const topPagesHtml = topPages.map((tp) => {
        const pct = Math.round((tp.count / (totalActions || 1)) * 100) || 0;
        return `
          <div class="stats-item">
            <div class="stats-item-header">
              <span class="stats-item-name">${tp.path}</span>
              <span class="stats-item-val">${tp.count} hit${tp.count === 1 ? '' : 's'}</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${pct}%; --bar-start: var(--sky); --bar-end: var(--emerald);"></div>
            </div>
          </div>
        `;
      }).join('');

      const topReferrersHtml = topReferrers.map((tr) => {
        const pct = Math.round((tr.count / (totalSessionsCount || 1)) * 100) || 0;
        return `
          <div class="stats-item">
            <div class="stats-item-header">
              <span class="stats-item-name">${tr.referrer}</span>
              <span class="stats-item-val">${tr.count} sess</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${pct}%; --bar-start: var(--rose); --bar-end: var(--amber);"></div>
            </div>
          </div>
        `;
      }).join('');

      const topCountriesHtml = topCountries.map((tc) => {
        const name = countryNames[tc.country.toUpperCase()] || `${tc.country} 🌐`;
        const pct = Math.round((tc.count / (totalSessionsCount || 1)) * 100) || 0;
        return `
          <div class="stats-item">
            <div class="stats-item-header">
              <span class="stats-item-name">${name}</span>
              <span class="stats-item-val">${tc.count} sess</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${pct}%; --bar-start: var(--violet); --bar-end: var(--sky);"></div>
            </div>
          </div>
        `;
      }).join('');

      const emptyStateHtml = `
        <div style="text-align: center; padding: 4rem 2rem; color: var(--text-dark); border: 1px dashed var(--border-light); border-radius: 18px; background: rgba(255,255,255,0.01);">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem; opacity: 0.5;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <h3 style="color: #ffffff; font-size: 1.1rem; margin-bottom: 0.5rem; font-weight: 600;">No Active Sessions Logged</h3>
          <p style="font-size: 0.85rem; max-width: 320px; margin: 0 auto; color: var(--text-muted)">Visitor telemetry is online and waiting. Land on the homepage or perform actions to begin listing stream events.</p>
        </div>
      `;

      const sessionCardsHtml = validSessions.map((sess) => {
        const meta = sess.metadata || {};
        const actions = sess.actions || [];
        const country = meta.country || 'Unknown';
        const countryName = countryNames[country.toUpperCase()] || `${country} 🌐`;
        const cityStr = meta.city && meta.city !== 'Unknown' ? `${meta.city}, ` : '';
        const locationStr = `${cityStr}${countryName}`;
        
        const hits = actions.length;
        const isInteractive = actions.some(a => a.type === 'click');
        const deviceType = (meta.screen && parseInt(meta.screen.split('x')[0]) < 768) || 
                           (meta.userAgent && (meta.userAgent.toLowerCase().includes('mobi') || meta.userAgent.toLowerCase().includes('android') || meta.userAgent.toLowerCase().includes('iphone')))
                           ? 'mobile' : 'desktop';

        const dateStr = meta.timestamp || 'Unknown Time';
        const uaParsed = parseUA(meta.userAgent);
        const browserLabel = `${uaParsed.browser} on ${uaParsed.os}`;

        const actionsListHtml = actions.length === 0 
          ? `<li style="font-size: 0.8rem; color: var(--text-dark); padding: 0.5rem 0;">No events logged in this session.</li>`
          : actions.map((act) => {
              const isClick = act.type === 'click';
              const label = isClick ? `🎯 Clicked: "${act.action || 'Interactive Widget'}"` : `👁️ Viewed page path: "${act.path}"`;
              const time = act.timestamp ? act.timestamp.split(',')[1]?.trim() || act.timestamp : '';
              return `
                <li class="timeline-log-item ${act.type}">
                  <div class="log-label">
                    <span class="log-badge ${act.type}">${act.type}</span>
                    <span class="log-text">${label}</span>
                  </div>
                  <span class="log-time">${time}</span>
                </li>
              `;
            }).join('');

        const searchAttr = `${meta.ip} ${locationStr} ${meta.referer} ${browserLabel}`.replace(/"/g, '&quot;');
        
        return `
          <div class="session-card" 
               id="card-${sess.sessionId}"
               data-search="${searchAttr}"
               data-interactive="${isInteractive}"
               data-device="${deviceType}"
               data-country="${country}">
            
            <div class="card-header-main" onclick="toggleSession('${sess.sessionId}')">
              <div class="card-header-left">
                <span class="location-badge">📍 ${locationStr}</span>
                <span class="ip-reveal" title="Hover to reveal IP address">${meta.ip || 'Unknown IP'}</span>
                <span class="ref-badge" title="Referrer: ${meta.referer || 'Direct'}">From: ${meta.referer || 'Direct'}</span>
                <span class="hits-count-badge">${hits} event${hits === 1 ? '' : 's'}</span>
              </div>
              <div class="card-header-right">
                <span class="time-badge">${dateStr}</span>
                <span class="chevron-icon" id="chevron-${sess.sessionId}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </div>
            </div>

            <div class="card-details" id="details-${sess.sessionId}">
              <div class="card-details-inner">
                <div class="metadata-subgrid">
                  <div class="meta-sub-item">
                    <span class="meta-sub-label">Browser & OS</span>
                    <span class="meta-sub-val">${browserLabel}</span>
                  </div>
                  <div class="meta-sub-item">
                    <span class="meta-sub-label">Screen Resolution</span>
                    <span class="meta-sub-val">🖥️ ${meta.screen || 'Unknown'}</span>
                  </div>
                  <div class="meta-sub-item">
                    <span class="meta-sub-label">Preferred Language</span>
                    <span class="meta-sub-val">🌐 ${meta.lang || 'Unknown'}</span>
                  </div>
                  <div class="meta-sub-item">
                    <span class="meta-sub-label">Timezone</span>
                    <span class="meta-sub-val">⏰ ${meta.tz || 'Unknown'}</span>
                  </div>
                  <div class="meta-sub-item" style="grid-column: span 2;">
                    <span class="meta-sub-label">Full User Agent String</span>
                    <span class="meta-sub-val" style="font-size: 0.75rem; word-break: break-all; opacity: 0.8;">${meta.userAgent || 'Unknown'}</span>
                  </div>
                </div>

                <div>
                  <h4 class="timeline-title-sub">Session Activity Timeline</h4>
                  <ul class="timeline-list">
                    ${actionsListHtml}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      const sessionsContentHtml = validSessions.length === 0 ? emptyStateHtml : sessionCardsHtml;

      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Telemetry Control Panel | shaibin-kb.in</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    :root {
      --bg-base: #09090b;
      --bg-surface: #121214;
      --bg-card: #18181b;
      --bg-panel: #202024;
      --border-light: rgba(255, 255, 255, 0.08);
      --border-focus: rgba(244, 63, 94, 0.4);
      --text-main: #f4f4f5;
      --text-muted: #a1a1aa;
      --text-dark: #71717a;
      
      --rose: #f43f5e;
      --rose-glow: rgba(244, 63, 94, 0.15);
      --emerald: #10b981;
      --emerald-glow: rgba(16, 185, 129, 0.15);
      --sky: #0ea5e9;
      --sky-glow: rgba(14, 165, 233, 0.15);
      --amber: #f59e0b;
      --violet: #8b5cf6;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-base);
      color: var(--text-main);
      font-family: 'Outfit', sans-serif;
      padding: 2.5rem 2rem;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: var(--bg-base);
    }
    ::-webkit-scrollbar-thumb {
      background: #27272a;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #3f3f46;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    /* Header */
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border-light);
      position: relative;
    }

    header::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100px;
      height: 1px;
      background: linear-gradient(90deg, var(--rose), transparent);
    }

    .logo-section h1 {
      font-size: 1.8rem;
      font-weight: 700;
      letter-spacing: -0.5px;
      background: linear-gradient(135deg, #ffffff 30%, #a1a1aa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-section p {
      font-size: 0.8rem;
      color: var(--text-muted);
      font-family: 'JetBrains Mono', monospace;
      margin-top: 0.3rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .status-pulse {
      width: 8px;
      height: 8px;
      background-color: var(--emerald);
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 0 8px var(--emerald);
      animation: pulse 1.8s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .btn {
      background: var(--bg-surface);
      border: 1px solid var(--border-light);
      color: var(--text-main);
      padding: 0.6rem 1.2rem;
      border-radius: 10px;
      font-weight: 500;
      font-size: 0.85rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .btn:hover {
      background: var(--bg-panel);
      border-color: var(--text-dark);
      transform: translateY(-1px);
    }

    .btn-primary {
      background: var(--rose-glow);
      border-color: rgba(244, 63, 94, 0.3);
      color: var(--rose);
    }

    .btn-primary:hover {
      background: rgba(244, 63, 94, 0.25);
      border-color: var(--rose);
    }

    /* Grid cards */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
    }

    .metric-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-light);
      padding: 1.5rem;
      border-radius: 16px;
      position: relative;
      overflow: hidden;
      transition: border-color 0.2s ease;
    }

    .metric-card:hover {
      border-color: var(--border-focus);
    }

    .metric-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: var(--card-accent, var(--sky));
    }

    .metric-card.visits { --card-accent: var(--sky); }
    .metric-card.visitors { --card-accent: var(--emerald); }
    .metric-card.sessions { --card-accent: var(--violet); }
    .metric-card.interaction { --card-accent: var(--rose); }

    .metric-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--text-muted);
      font-size: 0.85rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }

    .metric-icon {
      opacity: 0.7;
    }

    .metric-value {
      font-size: 2.2rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1;
      margin-bottom: 0.35rem;
    }

    .metric-sub {
      font-size: 0.75rem;
      color: var(--text-dark);
    }

    /* Layout division */
    .dashboard-body {
      display: grid;
      grid-template-columns: 380px 1fr;
      gap: 2rem;
      align-items: start;
    }

    @media (max-width: 950px) {
      .dashboard-body {
        grid-template-columns: 1fr;
      }
    }

    .panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-light);
      border-radius: 18px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .panel-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #ffffff;
      border-bottom: 1px solid var(--border-light);
      padding-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* Charts and stats lists */
    .chart-container {
      position: relative;
      height: 160px;
      width: 100%;
      margin: 0.5rem 0;
      display: flex;
      justify-content: center;
    }

    .stats-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .stats-item {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .stats-item-header {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
    }

    .stats-item-name {
      color: var(--text-main);
      font-family: 'JetBrains Mono', monospace;
      word-break: break-all;
    }

    .stats-item-val {
      font-weight: 600;
      color: #ffffff;
    }

    .progress-bar-bg {
      height: 6px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 3px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      border-radius: 3px;
      background: linear-gradient(90deg, var(--bar-start, var(--sky)), var(--bar-end, var(--emerald)));
    }

    /* Session feed area */
    .feed-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .toolbar {
      background: var(--bg-surface);
      border: 1px solid var(--border-light);
      border-radius: 16px;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .search-box {
      position: relative;
      flex: 1;
      min-width: 250px;
    }

    .search-box input {
      width: 100%;
      background: var(--bg-base);
      border: 1px solid var(--border-light);
      padding: 0.6rem 1rem 0.6rem 2.5rem;
      border-radius: 10px;
      color: var(--text-main);
      font-family: inherit;
      font-size: 0.85rem;
      outline: none;
      transition: all 0.2s ease;
    }

    .search-box input:focus {
      border-color: var(--rose);
      box-shadow: 0 0 10px rgba(244, 63, 94, 0.15);
    }

    .search-icon {
      position: absolute;
      left: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-dark);
      pointer-events: none;
    }

    .filter-pills {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .filter-pill {
      background: var(--bg-base);
      border: 1px solid var(--border-light);
      color: var(--text-muted);
      padding: 0.4rem 0.9rem;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-pill:hover {
      border-color: var(--text-dark);
      color: var(--text-main);
    }

    .filter-pill.active {
      background: var(--rose);
      border-color: var(--rose);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(244, 63, 94, 0.3);
    }

    /* Session card */
    .session-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-light);
      border-radius: 16px;
      overflow: hidden;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .session-card:hover {
      border-color: rgba(244, 63, 94, 0.35);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }

    .card-header-main {
      padding: 1.25rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
      flex-wrap: wrap;
      gap: 1rem;
      background: linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0) 100%);
    }

    .card-header-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .location-badge {
      font-weight: 600;
      font-size: 0.95rem;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .ip-reveal {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-dark);
      background: rgba(255, 255, 255, 0.03);
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      border: 1px solid var(--border-light);
      cursor: help;
      transition: all 0.2s ease;
      filter: blur(3px);
    }

    .ip-reveal:hover {
      filter: blur(0);
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.06);
    }

    .ref-badge {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-muted);
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: 1px solid var(--border-light);
    }

    .hits-count-badge {
      background: rgba(16, 185, 129, 0.1);
      color: var(--emerald);
      border: 1px solid rgba(16, 185, 129, 0.2);
      font-size: 0.7rem;
      padding: 0.15rem 0.45rem;
      border-radius: 5px;
      font-weight: 600;
    }

    .card-header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-left: auto;
    }

    .time-badge {
      font-size: 0.8rem;
      color: var(--text-dark);
    }

    .chevron-icon {
      color: var(--text-muted);
      transition: transform 0.3s ease;
      display: flex;
      align-items: center;
    }

    .card-details {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-top: 0 solid var(--border-light);
    }

    .card-details.expanded {
      max-height: 1500px;
      border-top-width: 1px;
    }

    .card-details-inner {
      padding: 1.5rem;
      background: rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .metadata-subgrid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      background: rgba(255, 255, 255, 0.01);
      border: 1px solid var(--border-light);
      padding: 1rem;
      border-radius: 12px;
    }

    .meta-sub-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.8rem;
    }

    .meta-sub-label {
      color: var(--text-dark);
      text-transform: uppercase;
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .meta-sub-val {
      color: var(--text-main);
      font-weight: 500;
    }

    /* Timeline */
    .timeline-title-sub {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-dark);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.75rem;
    }

    .timeline-list {
      list-style: none;
      position: relative;
      padding-left: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .timeline-list::before {
      content: '';
      position: absolute;
      left: 3px;
      top: 6px;
      bottom: 6px;
      width: 1px;
      background: var(--border-light);
    }

    .timeline-log-item {
      position: relative;
      font-size: 0.85rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .timeline-log-item::before {
      content: '';
      position: absolute;
      left: -1.25rem;
      top: 6px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--text-dark);
      border: 1px solid var(--bg-surface);
      z-index: 1;
    }

    .timeline-log-item.pageview::before {
      background: var(--emerald);
      box-shadow: 0 0 6px var(--emerald);
    }

    .timeline-log-item.click::before {
      background: var(--rose);
      box-shadow: 0 0 6px var(--rose);
    }

    .log-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .log-badge {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 0.1rem 0.35rem;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
    }

    .log-badge.pageview {
      color: var(--emerald);
      background: rgba(16, 185, 129, 0.08);
    }

    .log-badge.click {
      color: var(--rose);
      background: rgba(244, 63, 94, 0.08);
    }

    .log-text {
      color: var(--text-main);
      font-family: 'JetBrains Mono', monospace;
      word-break: break-all;
    }

    .log-time {
      font-size: 0.75rem;
      color: var(--text-dark);
      white-space: nowrap;
    }

    /* Responsive */
    @media (max-width: 650px) {
      body {
        padding: 1.5rem 1rem;
      }
      header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
      .header-actions {
        width: 100%;
      }
      .header-actions .btn {
        flex: 1;
        justify-content: center;
      }
      .card-header-right {
        margin-left: 0;
        width: 100%;
        justify-content: space-between;
        border-top: 1px solid rgba(255, 255, 255, 0.03);
        padding-top: 0.5rem;
        margin-top: 0.25rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo-section">
        <h1>Telemetry Console</h1>
        <p><span class="status-pulse"></span> shaibin-kb.in // active_session_logger</p>
      </div>
      <div class="header-actions">
        <button class="btn" id="copy-url-btn" onclick="copyDashboardUrl()">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Copy Share Link
        </button>
        <button class="btn btn-primary" onclick="window.location.reload()">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>
          Refresh Feed
        </button>
      </div>
    </header>

    <!-- Stat cards -->
    <div class="metrics-grid">
      <div class="metric-card visits">
        <div class="metric-header">
          <span>Global Hits</span>
          <span class="metric-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </span>
        </div>
        <div class="metric-value">${count}</div>
        <div class="metric-sub">Total page visits tracked</div>
      </div>

      <div class="metric-card visitors">
        <div class="metric-header">
          <span>Unique Visitors</span>
          <span class="metric-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </span>
        </div>
        <div class="metric-value">${uniqueIps}</div>
        <div class="metric-sub">Unique IP addresses logged</div>
      </div>

      <div class="metric-card sessions">
        <div class="metric-header">
          <span>Cached Sessions</span>
          <span class="metric-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
          </span>
        </div>
        <div class="metric-value">${totalSessionsCount}</div>
        <div class="metric-sub">Last 150 stream profiles</div>
      </div>

      <div class="metric-card interaction">
        <div class="metric-header">
          <span>Interaction Rate</span>
          <span class="metric-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </span>
        </div>
        <div class="metric-value">${interactionRate}%</div>
        <div class="metric-sub">Avg ${avgActions} events per visitor</div>
      </div>
    </div>

    <!-- Body columns -->
    <div class="dashboard-body">
      <!-- Left side: Insights -->
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Devices Doughnut -->
        <div class="panel">
          <h3 class="panel-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            Device Distribution
          </h3>
          <div class="chart-container">
            <canvas id="deviceChart"></canvas>
          </div>
          <div style="display: flex; justify-content: space-around; font-size: 0.8rem; font-weight: 500;">
            <span style="color: var(--rose); display: flex; align-items: center; gap: 0.3rem;"><span style="width: 8px; height: 8px; background: var(--rose); border-radius: 50%; display: inline-block;"></span> Desktop (${desktopCount})</span>
            <span style="color: var(--emerald); display: flex; align-items: center; gap: 0.3rem;"><span style="width: 8px; height: 8px; background: var(--emerald); border-radius: 50%; display: inline-block;"></span> Mobile (${mobileCount})</span>
          </div>
        </div>

        <!-- Top Pages -->
        <div class="panel">
          <h3 class="panel-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Top Pages viewed
          </h3>
          <div class="stats-list">
            ${topPagesHtml || '<div style="color: var(--text-dark); font-size: 0.85rem;">No visits tracked yet.</div>'}
          </div>
        </div>

        <!-- Referrers -->
        <div class="panel">
          <h3 class="panel-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            Top Referrers
          </h3>
          <div class="stats-list">
            ${topReferrersHtml || '<div style="color: var(--text-dark); font-size: 0.85rem;">No referrer logs.</div>'}
          </div>
        </div>

        <!-- Top Countries -->
        <div class="panel">
          <h3 class="panel-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            Top Locations
          </h3>
          <div class="stats-list">
            ${topCountriesHtml || '<div style="color: var(--text-dark); font-size: 0.85rem;">No country location stats.</div>'}
          </div>
        </div>
      </div>

      <!-- Right side: Session explorer feed -->
      <div class="feed-container">
        <!-- Toolbar -->
        <div class="toolbar">
          <div class="search-box">
            <span class="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input type="text" placeholder="Search sessions by IP, Country, Referrer..." id="search-input" />
          </div>
          <div class="filter-pills">
            <button class="filter-pill active" data-filter="all">All Sessions</button>
            <button class="filter-pill" data-filter="interactive">Interactive</button>
            <button class="filter-pill" data-filter="outside">Outside India</button>
            <button class="filter-pill" data-filter="desktop">Desktop</button>
            <button class="filter-pill" data-filter="mobile">Mobile</button>
          </div>
        </div>

        <!-- Session lists -->
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${sessionsContentHtml}
        </div>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // 1. Chart.js Device Breakdown Doughnut Chart
      const canvas = document.getElementById('deviceChart');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Desktop', 'Mobile'],
            datasets: [{
              data: [${desktopCount}, ${mobileCount}],
              backgroundColor: ['#f43f5e', '#10b981'],
              borderWidth: 0,
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: '#18181b',
                titleColor: '#ffffff',
                bodyColor: '#f4f4f5',
                borderColor: 'rgba(255,255,255,0.08)',
                borderWidth: 1,
                padding: 10,
                displayColors: false,
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const val = context.raw || 0;
                    const total = ${desktopCount + mobileCount} || 1;
                    const pct = Math.round((val / total) * 100);
                    return label + ': ' + val + ' (' + pct + '%)';
                  }
                }
              }
            },
            cutout: '72%'
          }
        });
      }

      // 2. Client-side Search and Filters
      const searchInput = document.getElementById('search-input');
      const filterPills = document.querySelectorAll('.filter-pill');
      const sessionCards = document.querySelectorAll('.session-card');
      let activeFilter = 'all';

      function filterSessions() {
        const query = searchInput.value.toLowerCase().trim();
        
        sessionCards.forEach(card => {
          const searchData = card.getAttribute('data-search').toLowerCase();
          const isInteractive = card.getAttribute('data-interactive') === 'true';
          const isMobile = card.getAttribute('data-device') === 'mobile';
          const isDesktop = card.getAttribute('data-device') === 'desktop';
          const country = card.getAttribute('data-country').toLowerCase();
          const isOutsideIndia = country !== 'in' && country !== 'india' && country !== 'unknown' && country !== '';

          let matchesSearch = searchData.includes(query);
          let matchesFilter = true;

          if (activeFilter === 'interactive') {
            matchesFilter = isInteractive;
          } else if (activeFilter === 'outside') {
            matchesFilter = isOutsideIndia;
          } else if (activeFilter === 'mobile') {
            matchesFilter = isMobile;
          } else if (activeFilter === 'desktop') {
            matchesFilter = isDesktop;
          }

          if (matchesSearch && matchesFilter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }

      searchInput.addEventListener('input', filterSessions);

      filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
          filterPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          activeFilter = pill.getAttribute('data-filter');
          filterSessions();
        });
      });
    });

    // Toggle session card expansion
    window.toggleSession = function(sessionId) {
      const details = document.getElementById('details-' + sessionId);
      const chevron = document.getElementById('chevron-' + sessionId);
      
      if (details.classList.contains('expanded')) {
        details.classList.remove('expanded');
        chevron.style.transform = 'rotate(0deg)';
      } else {
        details.classList.add('expanded');
        chevron.style.transform = 'rotate(180deg)';
      }
    };

    // Copy URL
    window.copyDashboardUrl = function() {
      navigator.clipboard.writeText(window.location.href);
      const btn = document.getElementById('copy-url-btn');
      const origHtml = btn.innerHTML;
      btn.innerHTML = '⚡ Copied Link!';
      setTimeout(() => {
        btn.innerHTML = origHtml;
      }, 2000);
    };
  </script>
</body>
</html>
      `;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    } catch (err) {
      return NextResponse.json({ error: 'Failed to generate dashboard', details: err.message }, { status: 500 });
    }
  }

  // Backwards compatible response for Footer.jsx visit display
  return NextResponse.json({ count });
}

