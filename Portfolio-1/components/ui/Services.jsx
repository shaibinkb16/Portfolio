import { Brain, Mic, Bot, Database, Cloud, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

const ServicesData = [
  {
    icon: <Brain size={72} strokeWidth={0.8} />,
    title: 'LLM & Generative AI Development',
    description: 'Build production-grade LLM applications using GPT-4, Claude, LLaMA, and Mistral. Expert in prompt engineering, fine-tuning, and RAG pipelines for enterprise use cases.'
  },
  {
    icon: <Bot size={72} strokeWidth={0.8} />,
    title: 'Multi-Agent AI Systems',
    description: 'Architect multi-agent platforms with LangGraph, MCP, and A2A communication. Specialized agents with seamless handoff, tool integration, and ReAct framework orchestration.'
  },
  {
    icon: <Mic size={72} strokeWidth={0.8} />,
    title: 'Voice AI Solutions',
    description: 'Real-time voice AI pipelines using LiveKit, WebRTC, Whisper STT, and OpenAI TTS. Sub-500ms latency with 94%+ transcription accuracy for production deployments.'
  },
  {
    icon: <Database size={72} strokeWidth={0.8} />,
    title: 'RAG & Vector Search',
    description: 'Design and deploy Retrieval-Augmented Generation systems using FAISS, ChromaDB, Pinecone, and Amazon Bedrock Embeddings for intelligent enterprise knowledge retrieval.'
  },
  {
    icon: <Cloud size={72} strokeWidth={0.8} />,
    title: 'Cloud AI Deployment',
    description: 'Deploy and scale AI systems on AWS (S3, EC2, Lambda, Bedrock) and Azure AI Foundry. Containerized with Docker, monitored with LangWatch for production reliability.'
  },
  {
    icon: <Code size={72} strokeWidth={0.8} />,
    title: 'AI-Powered Backend APIs',
    description: 'Build robust FastAPI backends integrating AI capabilities with PostgreSQL, MongoDB, and Redis. RESTful APIs powering intelligent applications at scale.'
  },
];

const Services = () => {
  return (
    <section className="mb-12 xl:mb-36">
      <div className="container mx-auto px-4 lg:px-8">
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
