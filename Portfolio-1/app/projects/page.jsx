'use client';
import React,{useState} from 'react';
import { Tabs,TabsList,TabsContent,TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/ui/ProjectCard";


const projectData=[
  {
    image:'/work/image2.png',
    category:'react js',
    category:'electron',
    name:'AI-Powered IDE',
    description:'AI Powered IDE is an intelligent development environment that integrates code editing, debugging, and real-time collaboration features, enhanced with AI tools for code suggestions, error detection, and a real-time chat interface to improve developer productivity and teamwork.',
    link:'/',
    github:'/',
  },
  {
    image:'/work/image.png',
    category:'react js',
    name:'AI Image Generation App',
    description:'An AI Image Generation App uses machine learning to create unique images from text prompts or inputs. It allows users to generate customized artwork, offering creative flexibility and high-quality results.',
    link:'/',
    github:'/',
  },
  {
    image:'/work/movies.png',
    category:'HTML & CSS',
    name:'Fox Movies App',
    description:'Fox Movies is an app that allows users to explore a vast collection of movies, with detailed information including ratings, descriptions, and trailers. It provides an intuitive interface for easy movie discovery and browsing.',
    link:'/',
    github:'/',
  },
  {
    image:'/work/iphone.png',
    category:'react js',
    name:'Apple Clone Website',
    description:"The Apple Clone Website is a visually stunning site that replicates the sleek design and functionality of Apple's official site, enhanced with 3D animations using Three.js. It offers an interactive, immersive experience with smooth transitions and dynamic visuals to showcase products and features..",
    link:'/',
    github:'/',
  },
  
];
const uniqueCategories = ['all projects', ...new Set(projectData.map(items => items.category))];

const Projects = () => {
  const [categories, setCategories] = useState(uniqueCategories);
  const [category, setCategory] = useState('all projects');

  const filteredProjects=projectData.filter(project=>{

    return category==='all projects' ?project:project.category===category;
  });

  return (
    <section className='min-h-screen pt-12'>
      <div className="container mx-auto">
        <h2 className='section-title mb-8 xl:mb-16 text-center mx-auto'>My Projects</h2>
        <Tabs defaultValue={category} className='mb-24 xl:mb-48'>
          <TabsList className='w-full grid h-full md:grid-cols-4 lg:max-w-[640px] mb-12 mx-auto md:border dark:border-none'>
            {categories.map((category, index) => (
              <TabsTrigger onClick={()=>setCategory(category)} key={index} value={category} className='capitalize w-[162px] md:w-auto'>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
              <div className='text-lg xl:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {filteredProjects.map((project,index)=>
                {
                  return(
                    <TabsContent value={category} key={index} className="w-full h-full">
                      <ProjectCard project={project} />
                    </TabsContent>
                  )
                })}
              </div>
        </Tabs>
      </div>
    </section>
  );
};

export default Projects;