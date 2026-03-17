import CForm from "@/components/ui/CForm";
import { MailIcon, HomeIcon, PhoneCall } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimationWrapper";

const Contact = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-x-4 text-primary text-sm mb-3">
              <span className="w-[24px] h-[2px] bg-primary"></span>
              Say Hello 👋
            </div>
            <h1 className="h1 mb-4">Let's Build Something Great</h1>
            <p className="subtitle max-w-[400px]">
              AI Engineer specializing in LLMs, Generative AI, and Voice AI. Looking to collaborate on impactful AI projects — multi-agent systems, RAG pipelines, voice AI, or full-stack AI applications.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-16">
          <StaggerContainer className="flex flex-col gap-y-5 text-sm">
            <StaggerItem>
              <div className="flex items-center gap-x-4">
                <MailIcon size={16} className="text-primary shrink-0" />
                <div>shaibinkb16@gmail.com</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-center gap-x-4">
                <HomeIcon size={16} className="text-primary shrink-0" />
                <div>Kochi, Kerala, India</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-center gap-x-4">
                <PhoneCall size={16} className="text-primary shrink-0" />
                <div>+91 8075885690</div>
              </div>
            </StaggerItem>
          </StaggerContainer>
          <CForm />
        </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Contact;
