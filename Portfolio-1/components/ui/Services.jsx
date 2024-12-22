import { Code, Database, Cloud, Server, GitBranch, Monitor } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Caesar_Dressing } from "next/font/google";

const ServicesData = [
  {
    icon: <Code size={72} strokeWidth={0.8} />,
    title: 'Custom Software Development',
    description: 'Build tailored software solutions that meet your unique business needs. From concept to deployment, we turn ideas into functional applications.'
  },
  {
    icon: <Database size={72} strokeWidth={0.8} />,
    title: 'Database Management',
    description: 'Design, implement, and manage robust databases to ensure the reliability and scalability of your data systems.'
  },
  {
    icon: <Cloud size={72} strokeWidth={0.8} />,
    title: 'Cloud Solutions',
    description: 'Leverage the power of cloud computing to scale your business. We provide cloud infrastructure, migration, and management services.'
  },
  {
    icon: <Server size={72} strokeWidth={0.8} />,
    title: 'Backend Development',
    description: 'Develop secure and scalable server-side solutions. Our backend services ensure high performance and smooth user experiences.'
  },
  {
    icon: <GitBranch size={72} strokeWidth={0.8} />,
    title: 'Version Control & Git Services',
    description: 'Collaborate on software projects with version control tools like Git. We help manage your codebase, track changes, and ensure seamless teamwork.'
  },
  {
    icon: <Monitor size={72} strokeWidth={0.8} />,
    title: 'UI/UX Development',
    description: 'Creating intuitive and engaging user interfaces. We combine design expertise with coding skills to enhance your users’ experience.'
  },
];

const Services = () => {
  return (
    <section className="mb-12 xl:mb-36">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Responsive Heading */}
        <h2 className="section-title mb-12 xl:mb-24 text-center mx-auto text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
          Services
        </h2>
        <div className="grid xl:grid-cols-3 justify-center gap-y-12 xl:gap-y-24 xl:gap-x-8">
          {ServicesData.map((item, index) => {
            return (
              <Card
                className="w-full max-w-[424px] h-[350px] flex flex-col pt-16 pb-10 justify-center items-center relative"
                key={index}
              >
                <CardHeader className="text-primary absolute -top-[60px]">
                  <div className="w-[140px] h-[80px] bg-white dark:bg-background flex justify-center items-center">
                    {item.icon}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle className="mb-4">{item.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
