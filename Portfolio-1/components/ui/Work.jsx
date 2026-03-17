'use client';
import Link from "next/link"; // Next.js link for navigation
import { Button } from "./button"; // Custom button component

// Swiper for carousel functionality
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper base styles
import 'swiper/css/pagination'; // Swiper pagination styles
import { Pagination } from 'swiper/modules'; // Swiper module for pagination

import ProjectCard from '@/components/ui/ProjectCard'; // Custom project card component

const projectData = [
  {
    category: 'Multi-Agent',
    name: 'Multi-Agent AI Voice Platform',
    description: 'Real-time voice AI system using LiveKit, WebRTC, and MCP handling 1000+ daily conversations. 4 specialized agents with seamless handoff. RAG using Amazon Bedrock, FAISS, and LangGraph across 10,000+ docs.',
    github: 'https://github.com/shaibinkb16',
  },
  {
    category: 'Multi-Agent',
    name: 'Chargeback Processing System',
    description: 'Agentic chargeback automation with 4 AI agents handling credit card disputes, card distribution, PACI reconciliation, account bills, and expense tracking.',
    github: 'https://github.com/shaibinkb16',
  },
  {
    category: 'Computer Vision',
    name: 'Person Re-Identification System',
    description: 'CNN-based person search using YOLO, CLIP, and BLIP. Identifies individuals by hair color, dress color, and time of appearance across camera feeds.',
    github: 'https://github.com/shaibinkb16',
  },
  {
    category: 'Full-Stack AI',
    name: 'Enterprise AI Learning Management System',
    description: 'AI-powered LMS for 500+ users with RAG chatbot (92% accuracy), automated quiz generation using GPT-4, FastAPI, React, and PostgreSQL.',
    github: 'https://github.com/shaibinkb16',
  },
  {
    category: 'Full-Stack AI',
    name: 'Medro — Hospital Document Management',
    description: 'AI-powered medical records platform for hospitals with smart search across patient history, prescriptions, reports, and AI health recommendations.',
    github: 'https://github.com/shaibinkb16',
  },
  {
    category: 'AI Chatbots',
    name: 'AI Chatbot Suite',
    description: 'Production-grade AI chatbots including finance, customer care, and domain-specific assistants built with LangChain, RAG, and GPT-4.',
    github: 'https://github.com/shaibinkb16',
  },
];

const Work = () => {
  return (
    <section className="mb-12 xl:mb-24">
      <div className="container mx-auto">
        <div className="text-center xl:text-left mb-10">
          <h2 className="section-title mb-4 mx-auto xl:mx-0">My Latest Projects</h2>
          <p className="subtitle mb-6 max-w-[500px] mx-auto xl:mx-0">
            Production AI projects leveraging LLMs, multi-agent systems, and voice AI.
          </p>
          <Link href="/projects">
            <Button>All Projects</Button>
          </Link>
        </div>

        <Swiper
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 } }}
          spaceBetween={24}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="pb-10"
        >
          {projectData.map((project, index) => (
            <SwiperSlide key={index} className="h-auto">
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Work;
