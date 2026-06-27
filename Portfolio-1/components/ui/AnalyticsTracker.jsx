'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Generate or retrieve a temporary session ID for this browser tab session
    let sessionId = sessionStorage.getItem('portfolio_session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('portfolio_session_id', sessionId);
    }

    const trackEvent = async (type, details = {}) => {
      try {
        const payload = {
          sessionId,
          type,
          path: pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''),
          source: searchParams.get('source') || null,
          screen: `${window.screen.width}x${window.screen.height}`,
          lang: navigator.language || 'Unknown',
          tz: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
          ...details,
        };

        await fetch('/api/visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Analytics tracking failed:', err);
      }
    };

    // 1. Track page view on route change
    trackEvent('pageview');

    // 2. Track clicks on key interactive elements globally
    const handleGlobalClick = (e) => {
      const target = e.target.closest('[data-track]');
      if (target) {
        const actionLabel = target.getAttribute('data-track');
        trackEvent('click', { action: actionLabel });
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);

  }, [pathname, searchParams]);

  return null;
}
