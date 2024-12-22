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
    image: '/work/3.png',
    category: 'MERN + Electron',
    name: 'AI Powered IDE',
    description: 'AI Powered IDE is an intelligent development environment that integrates code editing, debugging, and real-time collaboration features, enhanced with AI tools for code suggestions, error detection, and a real-time chat interface to improve developer productivity and teamwork.',
  /*   link: 'https://nexawebsite.com',
    github: 'https://github.com/shaibinkb/nexawebsite', */
  },
  {
    image: '/work/iphone.png',
    category: 'React',
    name: 'Apple Website Clone',
    description: "The Apple Clone Website is a visually stunning site that replicates the sleek design and functionality of Apple's official site, enhanced with 3D animations using Three.js. It offers an interactive, immersive experience with smooth transitions and dynamic visuals to showcase products and features..",
  /*   link: 'https://solsticwebsite.com',
    github: 'https://github.com/shaibinkb/solsticwebsite', */
  },
];

const Work = () => {
  return (
    <section className="relative mb-12 xl:mb-48">
      <div className="container mx-auto">
        {/* Header section */}
        <div className="max-w-[400px] mx-auto xl:mx-0 text-center xl:text-left mb-12 xl:h-[400px] flex flex-col justify-center items-center xl:items-start">
          <h2 className="section-title mb-4">My Latest Projects</h2>
          <p className="subtitle mb-8">
            Explore some of my most recent projects leveraging modern web technologies like React, Node.js, and more. Each project demonstrates a focus on scalability, performance, and user experience.
          </p>
          <Link href="/projects">
            <Button>All Projects</Button>
          </Link>
        </div>

        {/* Projects carousel */}
        <div className="xl:max-w-[800px] xl:absolute right-72 top-0 gap-1">
          <Swiper
            className="h-[480px]"
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={30}
            modules={[Pagination]}
            pagination={{ clickable: true }}
          >
            {projectData.map((project, index) => (
              <SwiperSlide key={index}>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Work;
