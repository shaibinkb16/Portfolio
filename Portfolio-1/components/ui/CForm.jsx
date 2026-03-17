'use client';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { User, MailIcon, ArrowRightIcon, Loader2 } from 'lucide-react';

const SERVICE_ID = 'service_hsw3ufm';
const TEMPLATE_ID = 'template_uge58en';
const PUBLIC_KEY = '7BJU6XZt7VqAxd8Ye';

const CForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-y-3">
      <div className="relative flex items-center">
        <Input type="text" name="name" placeholder="Name" required />
        <User className="absolute right-4 text-muted-foreground" size={18} />
      </div>
      <div className="relative flex items-center">
        <Input type="email" name="email" placeholder="Email" required />
        <MailIcon className="absolute right-4 text-muted-foreground" size={18} />
      </div>
      <Textarea name="message" placeholder="Type your message here..." rows={4} required />
      <Button type="submit" disabled={status === 'loading'} className="flex items-center max-w-[166px] gap-x-2">
        {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Let's Talk <ArrowRightIcon size={16} /></>}
      </Button>
      {status === 'success' && <p className="text-green-500 text-sm mt-1">Message sent successfully!</p>}
      {status === 'error' && <p className="text-red-500 text-sm mt-1">Failed to send. Please try again.</p>}
    </form>
  );
};

export default CForm;
