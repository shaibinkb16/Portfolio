import Link from "next/link";
import { Button } from "./button";
import { Download, Send } from "lucide-react";
import { RiArrowDownSLine } from 'react-icons/ri';
import Socials from "./Socials";

const Hero = () => {
  return (
    <section className="py-12 xl:py-24  xl:pt-28">
      <div className="container mx-auto -mt-16">
        <div className="flex justify-between gap-x-8">
          <div className="flex max-w-[600px] flex-col justify-center mx-auto xl:mx-0 text-center xl:text-left">
            <div className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">Software Developer</div>
            <h1 className="h1 mb-4">Hello, My name is Shaibin K B</h1>
            <p className="subtitle max-w-[490px] mx-auto xl:mx-0">Brief description with insights into myself, my vocational journey, and what I engage in professionally.</p>
            <div className="flex flex-col gap-y-3 md:flex-row gap-x-3 mx-auto xl:mx-0 mb-12">
              <Link href='/contact'>
                <Button className="gap-x-2">Contact Me<Send size={18} /></Button>
              </Link>
              <a
                href="https://drive.google.com/file/d/1KXzUq1BpT7IEPHwuKPeY6YcEiIL66MmZ/view?usp=drive_link"  // Replace with the actual path to your CV file
                download
              >
                <Button variant='secondary' className="gap-x-2">
                  Download CV<Download size={18} />
                </Button>
              </a>
            </div>
            <Socials containerStyles='flex gap-x-6 mx-auto xl:mx-0' iconStyles='text-foreground text-[22px] hover:text-primary transition-all' />
          </div>
          <div className="hidden xl:flex relative w-full h-[600px] overflow-hidden">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ backgroundImage: "url('/hero/dev2.png')" }} 
            ></div>
  
            {/* Floating Circles */}
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <div className="absolute bg-blue-500 rounded-full w-20 h-20 animate-ping left-[20%] top-[30%]"></div>
              <div className="absolute bg-red-500 rounded-full w-24 h-24 animate-bounce right-[40%] bottom-[10%]"></div>
              <div className="absolute bg-yellow-500 rounded-full w-16 h-16 animate-pulse left-[60%] top-[50%]"></div>
            </div>
  
            {/* Content Over Floating Circles */}
            <div className="relative z-20 flex items-center justify-center text-white">
              
            </div>
          </div>
  
          {/* Arrow Down Icon */}
          <div className="hidden md:flex absolute left-2/4 bottom-44 xl:bottom-12 animate-bounce">
            <RiArrowDownSLine className='text-3xl text-primary' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
