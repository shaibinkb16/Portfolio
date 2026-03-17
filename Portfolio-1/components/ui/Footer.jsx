'use client';
import { useEffect, useState } from 'react';
import Socials from "./Socials";
import { Eye } from 'lucide-react';

const Footer = () => {
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    fetch('/api/visit', { method: 'POST' })
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(data => setVisits(data.count))
      .catch(() => {
        // fallback: try GET
        fetch('/api/visit')
          .then(res => res.json())
          .then(data => setVisits(data.count))
          .catch(() => setVisits(null));
      });
  }, []);

  return (
    <footer className="bg-secondary py-10">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-y-4">
          <Socials
            containerStyles='flex gap-x-6'
            iconStyles='text-primary dark:text-white/70 text-[20px] hover:text-white dark:hover:text-primary transition-all'
          />
          <div className="flex items-center gap-x-2 text-white/60 text-sm">
            <Eye size={14} />
            <span>
              {visits === null ? '' : `${typeof visits === 'number' ? visits.toLocaleString() : visits} profile ${visits === 1 ? 'visit' : 'visits'}`}
            </span>
          </div>
          <div className="text-white/50 text-sm">
            Copyright &copy; Shaibin K B. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
