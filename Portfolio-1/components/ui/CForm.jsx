'use client';
import { useState } from 'react';
import { init, send } from 'emailjs-com';
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { User, MailIcon, ArrowRightIcon } from 'lucide-react';


// Initialize EmailJS (Make sure to use your PUBLIC KEY, not user ID)
init('7BJU6XZt7VqAxd8Ye'); // Replace with your actual EmailJS public key

const CForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    setError(null);

    try {
      await send(
        'service_hsw3ufm', // Replace with your EmailJS Service ID
        'template_uge58en', // Replace with your EmailJS Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      );

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('EmailJS Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
      <div className="relative flex items-center mt-5 xl:mt-0">
        <Input
          type="text"
          id="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <User className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center mt-5 xl:mt-0">
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <MailIcon className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center mt-5 xl:mt-0">
        <Textarea
          id="message"
          placeholder="Type your message here..."
          rows={4}
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className="flex items-center max-w-[166px] gap-x-1">
        Let's Talk
        <ArrowRightIcon size={20} />
      </Button>
      {isSubmitted && <p className="text-green-500 mt-3">Message sent successfully!</p>}
      {error && <p className="text-red-500 mt-3">Error: {error}</p>}
    </form>
  );
};

export default CForm;
