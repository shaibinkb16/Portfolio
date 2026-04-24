'use client';
import Link from "next/link";
import { Button } from "./button";
import { Download, Send } from "lucide-react";
import { RiArrowDownSLine } from 'react-icons/ri';
import Socials from "./Socials";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

const notifyCVDownload = () => {
  emailjs.send(
    'service_hsw3ufm',
    'template_uge58en',
    {
      name: 'Portfolio Visitor',
      email: 'shaibinkb16@gmail.com',
      message: `Someone downloaded your CV at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
    },
    '7BJU6XZt7VqAxd8Ye'
  ).catch(() => {});
};

const Hero = () => {
  return (
    <section className="py-12 xl:py-24 xl:pt-28">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row justify-between gap-x-8 gap-y-8">
          {/* Mobile photo */}
          <motion.div
            className="flex xl:hidden justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="w-full h-[250px] bg-cover bg-center rounded-2xl" style={{ backgroundImage: "url('/hero/dev2.png')" }}></div>
          </motion.div>

          <div className="flex w-full flex-col justify-center mx-auto xl:mx-0 text-center xl:text-left">
            <motion.div
              className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              AI Engineer — Machine Learning — GenAI — Voice AI
            </motion.div>

            <motion.h1
              className="h1 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hello, My name is Shaibin K B
            </motion.h1>

            <motion.p
              className="subtitle max-w-[490px] mx-auto xl:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              AI Engineer specializing in LLMs, Generative AI, and Voice AI with 10 months production experience. Building multi-agent platforms, RAG systems, and real-time voice AI solutions.
            </motion.p>

            <motion.div
              className="flex flex-col gap-y-3 md:flex-row gap-x-3 mx-auto xl:mx-0 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href='/contact'>
                <Button className="gap-x-2">Contact Me<Send size={18} /></Button>
              </Link>
              <a
                href="https://drive.google.com/file/d/1_9w2ErptjnCMnaK7dUCvEHasjD-D-fhM/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                onClick={notifyCVDownload}
              >
                <Button variant='secondary' className="gap-x-2">
                  Download CV<Download size={18} />
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <Socials containerStyles='flex gap-x-6 mx-auto xl:mx-0' iconStyles='text-foreground text-[22px] hover:text-primary transition-all' />
            </motion.div>
          </div>

          {/* Desktop image */}
          <motion.div
            className="hidden xl:flex relative w-full h-[500px] overflow-hidden"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center z-0 rounded-2xl"
              style={{ backgroundImage: "url('/hero/dev2.png')" }}
            ></div>
          </motion.div>

          <div className="hidden md:flex absolute left-2/4 bottom-44 xl:bottom-12 animate-bounce">
            <RiArrowDownSLine className='text-3xl text-primary' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
