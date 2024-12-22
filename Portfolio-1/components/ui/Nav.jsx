import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const links = [
  { path: '/', name: 'home' },
  { path: '/projects', name: 'my projects' },
  { path: '/contact', name: 'contact' },
];

const Nav = ({ containerStyles, linkStyles, underlineStyles }) => {
  const path = usePathname();
  
  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        return (
          <motion.div
            key={index}
            className="relative"
            whileHover={{ scale: 1.1 }} // Hover scale effect
            transition={{ type: 'spring', stiffness: 300 }} // Smooth transition
          >
            <Link href={link.path} className={`capitalize ${linkStyles} text-xl font-semibold`}>
              {link.path === path && (
                <motion.span
                  initial={{ y: '-100%' }}
                  animate={{ y: 0 }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  layoutId="underline"
                  className={`${underlineStyles} absolute bottom-0 left-0 w-full h-1 bg-white`}
                />
              )}
              {link.name}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
};

export default Nav;
