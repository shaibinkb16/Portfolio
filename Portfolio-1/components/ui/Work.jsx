'use client';
import Link from "next/link";
import { Button } from "./button";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import ProjectCard from '@/components/ui/ProjectCard';
import { FadeIn, StaggerContainer } from '@/components/ui/AnimationWrapper';

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
        <FadeIn>
          <div className="text-center xl:text-left mb-8">
            <h2 className="section-title mb-3 mx-auto xl:mx-0">My Latest Projects</h2>
            <p className="subtitle mb-4 max-w-[500px] mx-auto xl:mx-0">
              Production AI projects leveraging LLMs, multi-agent systems, and voice AI.
            </p>
            <Link href="/projects">
              <Button>All Projects</Button>
            </Link>
          </div>
        </FadeIn>
        <StaggerContainer>
          <Swiper
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 } }}
            spaceBetween={20}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            className="pb-10"
          >
            {projectData.map((project, index) => (
              <SwiperSlide key={index} style={{ height: 'auto' }}>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Work;
