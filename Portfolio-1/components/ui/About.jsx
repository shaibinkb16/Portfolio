import React from "react";
import Image from "next/image"; // Import the Image component from Next.js
import {
  User2,
  Mail as MailIcon,
  Home as HomeIcon,
  PhoneCall,
  GraduationCap,
  Calendar,
  Briefcase,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DevImg from "./DevImg";

const infoData = [
  {
    icon: <User2 size={20} />,
    text: "Shaibin K B",
  },
  {
    icon: <PhoneCall size={20} />,
    text: "+91-8075885690",
  },
  {
    icon: <MailIcon size={20} />,
    text: "shaibinkb16@gmail.com",
  },
  {
    icon: <GraduationCap size={20} />,
    text: "Master of Computer Applications",
  },
  {
    icon: <HomeIcon size={20} />,
    text: "Kochi, Kerala, India",
  },
];

const qualificationData = [
  {
    title: "education",
    data: [
      {
        university: "St. Joseph's College of Engineering and Technology, Palai",
        qualification: "Master of Computer Applications (MCA)",
        years: "2023 - 2025 | CGPA: 8.78/10",
      },
      {
        university: "Sahyajyothi Arts and Science College, Kumily",
        qualification: "Bachelor of Science in Computer Science",
        years: "2020 - 2023 | CGPA: 7.48/10",
      },
    ],
  },
  {
    title: "experience",
    data: [
      {
        company: "Alignminds Technology",
        role: "Junior Software Engineer",
        years: "Feb 2026 - Present",
      },
      {
        company: "Art Technology and Software",
        role: "Junior AI Engineer",
        years: "May 2025 - Feb 2026",
      },
    ],
  },
];

const skillData = [
  {
    category: "AI & ML",
    skills: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Neural Networks", "Supervised Learning", "Unsupervised Learning", "Transfer Learning", "Model Training", "Model Deployment"],
  },
  {
    category: "LLMs & GenAI",
    skills: ["Large Language Models", "Generative AI", "GPT-4", "GPT-4o", "Claude", "LLaMA", "Mistral", "LLM Fine-tuning", "Prompt Engineering", "Few-Shot Learning", "Zero-Shot Learning"],
  },
  {
    category: "AI Frameworks",
    skills: ["Python", "PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Hugging Face Transformers", "LangChain", "LangGraph", "LlamaIndex", "OpenAI API"],
  },
  {
    category: "NLP",
    skills: ["Natural Language Processing", "Text Classification", "Sentiment Analysis", "Text Generation", "Semantic Search"],
  },
  {
    category: "AI Agents",
    skills: ["Multi-Agent Systems", "Agent-to-Agent Communication (A2A)", "Model Context Protocol (MCP)", "ReAct Framework", "Agent Handoff", "Tool Integration"],
  },
  {
    category: "RAG & Vector DBs",
    skills: ["Retrieval-Augmented Generation", "Vector Embeddings", "ChromaDB", "FAISS", "Pinecone", "Amazon Bedrock Embeddings", "Hybrid Search"],
  },
  {
    category: "Voice AI",
    skills: ["LiveKit", "WebRTC", "Speech-to-Text (STT)", "Text-to-Speech (TTS)", "Whisper", "OpenAI TTS", "ElevenLabs", "Real-time Audio Streaming"],
  },
  {
    category: "Backend & Cloud",
    skills: ["FastAPI", "REST API", "AWS S3", "AWS EC2", "AWS Lambda", "Amazon Bedrock", "Azure AI Foundry", "Docker", "Git", "GitHub", "Linux", "Nginx", "PM2"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Neo4j", "SQL", "NoSQL", "Graph Databases"],
  },
  {
    category: "Observability",
    skills: ["LangWatch", "LLM Tracing", "AI Pipeline Monitoring", "Performance Evaluation"],
  },
  {
    category: "Frontend",
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Streamlit"],
  },
];

const About = () => {
  const getData = (arr, title) => {
    return arr.find((item) => item.title === title);
  };

  return (
    <section className="xl:h-[860px] pb-12 xl:py-24">
      <div className="container mx-auto">
        <h2 className="section-title mb-8 xl:mb-16 text-center mx-auto">
          About Me
        </h2>
        <div className="flex flex-col xl:flex-row">
          <div className="hidden xl:flex flex-1 relative">
            <DevImg
              containerStyles="bg-about_shape_light dark:bg-about_shape_dark w-[505px] h-[500px] bg-no-repeat relative"
              imgSrc="/hero/about.png"
            />
          </div>
          <div className="flex-1">
            <Tabs defaultValue="personal">
              <TabsList className="w-full grid xl:grid-cols-3 xl:max-w-[520px] xl:border dark:border-none">
                <TabsTrigger className="w-[162px] xl:w-auto" value="personal">
                  Personal Info
                </TabsTrigger>
                <TabsTrigger
                  className="w-[162px] xl:w-auto"
                  value="qualification"
                >
                  Qualifications
                </TabsTrigger>
                <TabsTrigger className="w-[162px] xl:w-auto" value="skills">
                  Skills
                </TabsTrigger>
              </TabsList>
              <div className="text-lg mt-12 xl:mt-8">
                <TabsContent value="personal">
                  <div className="text-center xl:text-left">
                    <h3 className="h3 mb-4">
                      AI Engineer with 8+ Months Production Experience
                    </h3>
                    <p className="subtitle max-w-xl max-auto xl:mx-0">
                      Specializing in LLMs, Generative AI, and Voice AI. Delivered 5+ production AI projects achieving 95%+ accuracy, including multi-agent platforms and real-time voice AI systems.
                    </p>
                    <div className="grid xl:grid-cols-2 gap-4 mb-12">
                      {infoData.map((item, index) => (
                        <div
                          className="flex items-center gap-x-4 mx-auto xl:mx-0"
                          key={index}
                        >
                          <div className="text-primary">{item.icon}</div>
                          <div>{item.text}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <div className="text-primary">Language Skills</div>
                      <div className="border-b border-border"></div>
                      <div>English, Malayalam</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="qualification">
                  <div>
                    <h3 className="h3 mb-8 text-center xl:text-left">
                      My Awesome Journey
                    </h3>
                    <div className="grid md:grid-cols-2 gap-y-8">
                      <div className="flex  flex-col gap-y-6">
                        <div className="flex gap-x-4 items-center text-[22px] text-primary">
                          <Briefcase />
                          <h4 className="capitalize font-medium">
                            {getData(qualificationData, "experience").title}
                          </h4>
                        </div>
                        <div className="flex flex-col gap-y-8">
                          {getData(qualificationData, "experience").data.map(
                            (item, index) => {
                              const { company, role, years } = item;
                              return (
                                <div className="flex gap-x-8 group" key={index}>
                                  <div className="h-[84px] w-[1px] bg-border relative ml-2">
                                    <div className="w-[11px] h-[11px] rounded-full bg-primary absolute -left-[5px] group-hover:translate-y-[84px] transition-all duration-500"></div>
                                  </div>
                                  <div>
                                    <div className="font-semibold text-xl leading-none mb-2">
                                      {company}
                                    </div>
                                    <div className="text-lg leading-none text-muted-foreground mb-4">
                                      {role}
                                    </div>
                                    <div className="text-base font-medium">
                                      {years}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                      <div className="flex  flex-col gap-y-6">
                        <div className="flex gap-x-4 items-center text-[22px] text-primary">
                          <GraduationCap size={28} />
                          <h4 className="capitalize font-medium">
                            {getData(qualificationData, "education").title}
                          </h4>
                        </div>
                        <div className="flex flex-col gap-y-8">
                          {getData(qualificationData, "education").data.map(
                            (item, index) => {
                              const { university, qualification, years } = item;
                              return (
                                <div className="flex gap-x-8 group" key={index}>
                                  <div className="h-[84px] w-[1px] bg-border relative ml-2">
                                    <div className="w-[11px] h-[11px] rounded-full bg-primary absolute -left-[5px] group-hover:translate-y-[84px] transition-all duration-500"></div>
                                  </div>
                                  <div>
                                    <div className="font-semibold text-xl leading-none mb-2">
                                      {university}
                                    </div>
                                    <div className="text-lg leading-none text-muted-foreground mb-4">
                                      {qualification}
                                    </div>
                                    <div className="text-base font-medium">
                                      {years}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="skills">
                  <div className="text-center xl:text-left">
                    <h3 className="text-3xl font-bold mb-6">What I Use Everyday</h3>
                    <div className="flex flex-col gap-y-6 max-h-[520px] overflow-y-auto pr-2">
                      {skillData.map((group, gi) => (
                        <div key={gi}>
                          <h4 className="text-base font-semibold text-primary mb-2">{group.category}</h4>
                          <div className="border-b border-border mb-3"></div>
                          <div className="flex flex-wrap gap-2">
                            {group.skills.map((skill, si) => (
                              <span key={si} className="bg-primary/10 text-foreground text-sm font-medium px-3 py-1 rounded-full border border-primary/20">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
