import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify } from 'lucide-react';
import Nav from './Nav';
import Logo from './Logo';
import Socials from './Socials';

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className="cursor-pointer text-orange-600 hover:text-orange-800 transition duration-300" />
      </SheetTrigger>
      <SheetContent
        className="bg-gradient-to-br from-orange-200 via-orange-300 to-orange-500 text-white shadow-lg rounded-lg"
      >
        <div className="flex flex-col items-center justify-between h-full py-8">
          {/* Top Section */}
          <div className="flex flex-col items-center gap-y-16">
            {/* Logo */}
            <Logo />
            {/* Navigation */}
            <Nav
              containerStyles="flex flex-col items-center gap-y-6"
              linkStyles="text-2xl font-semibold text-white hover:text-orange-800 transition duration-300"
            />
            {/* Bouncing Balls */}
            <div className="relative flex items-center justify-center h-32">
              <div className="absolute w-6 h-6 bg-orange-600 rounded-full animate-bounce1" />
              <div className="absolute w-8 h-8 bg-orange-400 rounded-full animate-bounce2" />
              <div className="absolute w-10 h-10 bg-orange-200 rounded-full animate-bounce3" />
            </div>
            {/* Image */}
            <img
              src="/hero/dev2.png"
              alt="Developer Illustration"
            />
          </div>
           {/* Floating Circles */}
           <div className="absolute top-0 left-0 w-full h-full z-10">
              <div className="absolute bg-blue-500 rounded-full w-20 h-20 animate-ping left-[20%] top-[30%]"></div>
              <div className="absolute bg-red-500 rounded-full w-24 h-24 animate-bounce right-[40%] bottom-[10%]"></div>
              <div className="absolute bg-yellow-500 rounded-full w-16 h-16 animate-pulse left-[60%] top-[50%]"></div>
            </div>

          {/* Bottom Section */}
          <Socials
            containerStyles="flex gap-x-4"
            iconStyles="text-2xl text-white hover:text-orange-800 transition duration-300"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
