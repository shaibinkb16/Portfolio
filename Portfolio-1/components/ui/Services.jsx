import { Brain, Mic, Bot, Database, Cloud, Code } from "lucide-react";
import { Card, CardDescription, CardTitle } from "./card";
import { StaggerContainer, StaggerItem, FadeIn } from "./AnimationWrapper";

const ServicesData = [
  {
    icon: <Brain size={48} strokeWidth={0.8} />,
    title: 'LLM & Generative AI Development',
    description: 'Build production-grade LLM applications using GPT-4, Claude, LLaMA, and Mistral. Expert in prompt engineering, fine-tuning, and RAG pipelines for enterprise use cases.'
  },
  {
    icon: <Bot size={48} strokeWidth={0.8} />,
    title: 'Multi-Agent AI Systems',
    description: 'Architect multi-agent platforms with LangGraph, MCP, and A2A communication. Specialized agents with seamless handoff, tool integration, and ReAct framework orchestration.'
  },
  {
    icon: <Mic size={48} strokeWidth={0.8} />,
    title: 'Voice AI Solutions',
    description: 'Real-time voice AI pipelines using LiveKit, WebRTC, Whisper STT, and OpenAI TTS. Sub-500ms latency with 94%+ transcription accuracy for production deployments.'
  },
  {
    icon: <Database size={48} strokeWidth={0.8} />,
    title: 'RAG & Vector Search',
    description: 'Design and deploy Retrieval-Augmented Generation systems using FAISS, ChromaDB, Pinecone, and Amazon Bedrock Embeddings for intelligent enterprise knowledge retrieval.'
  },
  {
    icon: <Cloud size={48} strokeWidth={0.8} />,
    title: 'Cloud AI Deployment',
    description: 'Deploy and scale AI systems on AWS (S3, EC2, Lambda, Bedrock) and Azure AI Foundry. Containerized with Docker, monitored with LangWatch for production reliability.'
  },
  {
    icon: <Code size={48} strokeWidth={0.8} />,
    title: 'AI-Powered Backend APIs',
    description: 'Build robust FastAPI backends integrating AI capabilities with PostgreSQL, MongoDB, and Redis. RESTful APIs powering intelligent applications at scale.'
  },
];

const Services = () => {
  return (
    <section className="mb-12 xl:mb-24">
      <div className="container mx-auto">
        <FadeIn>
          <h2 className="section-title mb-10 xl:mb-16 text-center mx-auto">Services</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {ServicesData.map((item, index) => (
            <StaggerItem key={index}>
              <Card className="flex flex-col p-6 gap-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default h-full">
                <div className="text-primary">{item.icon}</div>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription className="text-sm">{item.description}</CardDescription>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Services;
