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
          {/* Action Links */}
          <div className="flex gap-x-2">
            {project.link && project.link !== '/' && (
              <Link href={project.link} data-track={`demo_${project.name}`} className="bg-background hover:bg-muted border border-border w-[30px] h-[30px] rounded-lg flex justify-center items-center transition-colors duration-200">
                <Link2Icon size={13} className="text-muted-foreground group-hover:text-foreground" />
              </Link>
            )}
            {project.github && (
              <Link href={project.github} data-track={`github_${project.name}`} className="bg-background hover:bg-muted border border-border w-[30px] h-[30px] rounded-lg flex justify-center items-center transition-colors duration-200">
                <Github size={13} className="text-muted-foreground group-hover:text-foreground" />
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
