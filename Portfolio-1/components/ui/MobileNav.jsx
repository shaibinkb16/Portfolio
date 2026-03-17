import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify } from 'lucide-react';
import Nav from './Nav';
import Logo from './Logo';
import Socials from './Socials';

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between py-8">
        <div className="flex flex-col items-center gap-y-8">
          <Logo />
          <img
            src="/hero/shaibin.jpg"
            alt="Shaibin K B"
            className="w-24 h-24 rounded-full object-cover border-4 border-primary"
          />
          <Nav
            containerStyles="flex flex-col items-center gap-y-6"
            linkStyles="text-xl font-semibold hover:text-primary transition-all"
          />
        </div>
        <Socials
          containerStyles="flex gap-x-6 justify-center"
          iconStyles="text-2xl hover:text-primary transition-all"
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
