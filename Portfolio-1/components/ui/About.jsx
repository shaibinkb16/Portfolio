'use client';
import { useState } from "react";
import { User2, Mail as MailIcon, Home as HomeIcon, PhoneCall, GraduationCap, Briefcase } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import DevImg from "./DevImg";
import { FadeIn } from "./AnimationWrapper";

const infoData = [
  { icon: <User2 size={20} />, text: "Shaibin K B" },
  { icon: <PhoneCall size={20} />, text: "+91-8075885690" },
  { icon: <MailIcon size={20} />, text: "shaibinkb16@gmail.com" },
  { icon: <GraduationCap size={20} />, text: "Master of Computer Applications" },
  { icon: <HomeIcon size={20} />, text: "Kochi, Kerala, India" },
];

const qualificationData = [
  {
    title: "education",
    data: [
      { university: "St. Joseph's College of Engineering and Technology, Palai", qualification: "Master of Computer Applications (MCA)", years: "2023 - 2025 | CGPA: 8.78/10" },
      { university: "Sahyajyothi Arts and Science College, Kumily", qualification: "Bachelor of Science in Computer Science", years: "2020 - 2023 | CGPA: 7.48/10" },
    ],
  },
  {
    title: "experience",
    data: [
      { company: "Alignminds Technology", role: "Junior Software Engineer", years: "Feb 2026 - Present" },
      { company: "Art Technology and Software", role: "Junior AI Engineer", years: "May 2025 - Feb 2026" },
    ],
  },
];

const skillData = [
  { category: "AI & ML", skills: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Neural Networks", "Supervised Learning", "Unsupervised Learning", "Transfer Learning", "Model Training", "Model Deployment"] },
  { category: "LLMs & GenAI", skills: ["Large Language Models", "Generative AI", "GPT-4", "GPT-4o", "Claude", "LLaMA", "Mistral", "LLM Fine-tuning", "Prompt Engineering", "Few-Shot Learning", "Zero-Shot Learning"] },
  { category: "AI Frameworks", skills: ["Python", "PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Hugging Face Transformers", "LangChain", "LangGraph", "LlamaIndex", "OpenAI API"] },
  { category: "NLP", skills: ["Natural Language Processing", "Text Classification", "Sentiment Analysis", "Text Generation", "Semantic Search"] },
  { category: "AI Agents", skills: ["Multi-Agent Systems", "Agent-to-Agent Communication (A2A)", "Model Context Protocol (MCP)", "ReAct Framework", "Agent Handoff", "Tool Integration"] },
  { category: "RAG & Vector DBs", skills: ["Retrieval-Augmented Generation", "Vector Embeddings", "ChromaDB", "FAISS", "Pinecone", "Amazon Bedrock Embeddings", "Hybrid Search"] },
  { category: "Voice AI", skills: ["LiveKit", "WebRTC", "Speech-to-Text (STT)", "Text-to-Speech (TTS)", "Whisper", "OpenAI TTS", "ElevenLabs", "Real-time Audio Streaming"] },
  { category: "Backend & Cloud", skills: ["FastAPI", "REST API", "AWS S3", "AWS EC2", "AWS Lambda", "Amazon Bedrock", "Azure AI Foundry", "Docker", "Git", "GitHub", "Linux", "Nginx", "PM2"] },
  { category: "Databases", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Neo4j", "SQL", "NoSQL", "Graph Databases"] },
  { category: "Observability", skills: ["LangWatch", "LLM Tracing", "AI Pipeline Monitoring", "Performance Evaluation"] },
  { category: "Frontend", skills: ["React", "Node.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Streamlit"] },
];

const getData = (arr, title) => arr.find((item) => item.title === title);

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } },
};

const About = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <section className="pb-12 xl:py-24">
      <div className="container mx-auto">
        <FadeIn>
          <h2 className="section-title mb-8 xl:mb-16 text-center mx-auto">About Me</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-col xl:flex-row gap-x-8">
            <div className="hidden xl:flex flex-1 relative">
              <DevImg
                containerStyles="bg-about_shape_light dark:bg-about_shape_dark w-[505px] h-[500px] bg-no-repeat relative"
                imgSrc="/hero/about.png"
              />
            </div>
            <div className="flex-1 w-full">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3 mb-6">
                  <TabsTrigger value="personal" className="text-xs sm:text-sm">Personal Info</TabsTrigger>
                  <TabsTrigger value="qualification" className="text-xs sm:text-sm">Qualifications</TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs sm:text-sm">Skills</TabsTrigger>
                </TabsList>
                <div className="mt-6 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {activeTab === 'personal' && (
                      <motion.div key="personal" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                        <div className="text-center xl:text-left">
                          <h3 className="h3 mb-3">AI Engineer with 10 Months Production Experience</h3>
                          <p className="subtitle max-w-xl mx-auto xl:mx-0">
                            Specializing in LLMs, Generative AI, and Voice AI. Delivered 5+ production AI projects achieving 95%+ accuracy, including multi-agent platforms and real-time voice AI systems.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {infoData.map((item, index) => (
                              <div className="flex items-center gap-x-3 mx-auto xl:mx-0" key={index}>
                                <div className="text-primary">{item.icon}</div>
                                <div className="text-sm">{item.text}</div>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-col gap-y-2">
                            <div className="text-primary text-sm font-medium">Language Skills</div>
                            <div className="border-b border-border"></div>
                            <div className="text-sm">English, Malayalam</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'qualification' && (
                      <motion.div key="qualification" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                        <h3 className="h3 mb-6 text-center xl:text-left">My Awesome Journey</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="flex flex-col gap-y-4">
                            <div className="flex gap-x-3 items-center text-primary">
                              <Briefcase size={20} />
                              <h4 className="capitalize font-medium text-base">experience</h4>
                            </div>
                            <div className="flex flex-col gap-y-6">
                              {getData(qualificationData, "experience").data.map((item, index) => (
                                <div className="flex gap-x-4 group" key={index}>
                                  <div className="h-[80px] w-[1px] bg-border relative ml-2">
                                    <div className="w-[10px] h-[10px] rounded-full bg-primary absolute -left-[4px] group-hover:translate-y-[80px] transition-all duration-500"></div>
                                  </div>
                                  <div>
                                    <div className="font-semibold text-base leading-none mb-1">{item.company}</div>
                                    <div className="text-sm leading-none text-muted-foreground mb-2">{item.role}</div>
                                    <div className="text-xs font-medium">{item.years}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-y-4">
                            <div className="flex gap-x-3 items-center text-primary">
                              <GraduationCap size={20} />
                              <h4 className="capitalize font-medium text-base">education</h4>
                            </div>
                            <div className="flex flex-col gap-y-6">
                              {getData(qualificationData, "education").data.map((item, index) => (
                                <div className="flex gap-x-4 group" key={index}>
                                  <div className="h-[80px] w-[1px] bg-border relative ml-2">
                                    <div className="w-[10px] h-[10px] rounded-full bg-primary absolute -left-[4px] group-hover:translate-y-[80px] transition-all duration-500"></div>
                                  </div>
                                  <div>
                                    <div className="font-semibold text-base leading-none mb-1">{item.university}</div>
                                    <div className="text-sm leading-none text-muted-foreground mb-2">{item.qualification}</div>
                                    <div className="text-xs font-medium">{item.years}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'skills' && (
                      <motion.div key="skills" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                        <h3 className="text-xl font-bold mb-4">What I Use Everyday</h3>
                        <div className="flex flex-col gap-y-4 max-h-[420px] overflow-y-auto pr-1">
                          {skillData.map((group, gi) => (
                            <div key={gi}>
                              <h4 className="text-sm font-semibold text-primary mb-1">{group.category}</h4>
                              <div className="border-b border-border mb-2"></div>
                              <div className="flex flex-wrap gap-1.5">
                                {group.skills.map((skill, si) => (
                                  <span key={si} className="bg-primary/10 text-foreground text-xs font-medium px-2.5 py-1 rounded-full border border-primary/20">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Tabs>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default About;
