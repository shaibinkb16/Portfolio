import { NextResponse } from 'next/server';

export async function POST(request) {
  const { visitorInfo } = await request.json();

  const payload = {
    service_id: 'service_fxyqpia',
    template_id: 'template_uge58en',
    user_id: '7BJU6XZt7VqAxd8Ye',
    template_params: {
      name: 'Portfolio Visitor',
      email: 'shaibinkb16@gmail.com',
      message: `Someone downloaded your CV!\n\n${visitorInfo}`,
    },
  };

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error('EmailJS error:', text);
      return NextResponse.json({ error: text }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('CV download email error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
