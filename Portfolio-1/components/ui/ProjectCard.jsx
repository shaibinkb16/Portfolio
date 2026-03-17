import Link from "next/link"
import { Card } from "./card"
import { Github, Link2Icon, Bot, BookOpen, CreditCard, Eye, Building2, MessageSquare } from 'lucide-react'
import { Badge } from "./badge"

const projectIcons = {
  'Multi-Agent AI Voice Platform': <Bot size={64} strokeWidth={0.8} className="text-primary" />,
  'Chargeback Processing System': <CreditCard size={64} strokeWidth={0.8} className="text-primary" />,
  'Person Re-Identification System': <Eye size={64} strokeWidth={0.8} className="text-primary" />,
  'Enterprise AI Learning Management System': <BookOpen size={64} strokeWidth={0.8} className="text-primary" />,
  'Medro — Hospital Document Management': <Building2 size={64} strokeWidth={0.8} className="text-primary" />,
  'AI Chatbot Suite': <MessageSquare size={64} strokeWidth={0.8} className="text-primary" />,
};

import { FadeIn, StaggerContainer, StaggerItem } from "./AnimationWrapper";

const ProjectCard = ({ project }) => {
  return (
    <StaggerItem>
      <Card className='group overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300'>
      <div className="w-full h-[150px] flex flex-col items-center justify-center bg-tertiary dark:bg-secondary/40 gap-y-3 rounded-t-[30px]">
          {projectIcons[project.name] ?? <Bot size={64} strokeWidth={0.8} className="text-primary" />}
          <div className="flex gap-x-3">
            {project.link && project.link !== '/' && (
              <Link href={project.link} className="bg-secondary w-[34px] h-[34px] rounded-full flex justify-center items-center hover:opacity-80 transition-all">
                <Link2Icon size={15} className="text-white" />
              </Link>
            )}
            {project.github && (
              <Link href={project.github} className="bg-secondary w-[34px] h-[34px] rounded-full flex justify-center items-center hover:opacity-80 transition-all">
                <Github size={15} className="text-white" />
              </Link>
            )}
          </div>
      </div>
      <div className="px-5 py-4 flex flex-col gap-y-2">
        <Badge className='uppercase text-xs font-medium w-fit'>{project.category}</Badge>
        <h4 className="h4">{project.name}</h4>
        <p className="text-muted-foreground text-sm">{project.description}</p>
      </div>
    </Card>
    </StaggerItem>
  )
}

export default ProjectCard
