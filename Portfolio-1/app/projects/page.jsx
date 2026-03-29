'use client';
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/ui/ProjectCard";
import { StaggerContainer } from "@/components/ui/AnimationWrapper";

const projectData = [
  {
    category: 'multi-agent',
    name: 'Multi-Agent AI Voice Platform',
    description: 'Real-time voice AI system using LiveKit, WebRTC, and MCP handling 1000+ daily conversations. 4 specialized agents with seamless handoff. RAG using Amazon Bedrock, FAISS, and LangGraph across 10,000+ docs. Sub-500ms latency, 98% uptime.',
    github: 'https://github.com/shaibinkb16',
  },
  {
    category: 'multi-agent',
    name: 'Chargeback Processing System',
    description: 'Agentic chargeback automation platform with 4 specialized AI agents handling credit card dispute resolution, card distribution workflows, and PACI reconciliation. Automates account bills, expense tracking, and financial reconciliation across banking backends.',
    github: 'https://github.com/shaibinkb16',
  },
  {
    category: 'computer vision',
    name: 'Person Re-Identification System',
    description: 'CNN-based person search system using YOLO for detection, CLIP for semantic understanding, and BLIP for image captioning. Identifies individuals based on characteristics like hair color, dress color, and time of appearance across camera feeds.',
    github: 'https://github.com/shaibinkb16',
  },
  {
    category: 'full-stack ai',
    name: 'Enterprise AI Learning Management System',
    description: 'Full-stack AI-powered LMS for 500+ users. RAG chatbot with LangChain and ChromaDB achieving 92% accuracy. Automated quiz generation using GPT-4. Built with FastAPI, React, PostgreSQL, deployed on AWS EC2 with PM2 and Nginx.',
    github: 'https://github.com/shaibinkb16',
  },
  {
    category: 'full-stack ai',
    name: 'Medro — Hospital Document Management',
    description: 'AI-powered medical records platform for hospitals enabling easy search of patient history, medical reports, prescriptions, and documents. Features AI recommendations, smart document retrieval, and a unified health record dashboard.',
    github: 'https://github.com/shaibinkb16',
  },
  {
    category: 'ai chatbots',
    name: 'AI Chatbot Suite',
    description: 'Collection of production-grade AI chatbots including a finance chatbot for expense and investment queries, a customer care chatbot for automated support, and domain-specific assistants — all built with LangChain, RAG, and GPT-4.',
    github: 'https://github.com/shaibinkb16',
  },
];

const uniqueCategories = ['all projects', ...new Set(projectData.map(p => p.category))];

const Projects = () => {
  const [category, setCategory] = useState('all projects');

  const filteredProjects = projectData.filter(p =>
    category === 'all projects' ? true : p.category === category
  );

  return (
    <section className='min-h-screen pt-12'>
      <div className="container mx-auto">
        <h2 className='section-title mb-8 xl:mb-12 text-center mx-auto'>My Projects</h2>
        <Tabs value={category} onValueChange={setCategory} className='mb-16'>
          <TabsList className='w-full flex flex-wrap h-full gap-2 justify-center mb-10 bg-transparent'>
            {uniqueCategories.map((cat, index) => (
              <TabsTrigger
                key={index}
                value={cat}
                className='capitalize border dark:border-border rounded-full px-4 py-1 text-sm'
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProjects.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Projects;
