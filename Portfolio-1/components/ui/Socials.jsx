'use client'
import  {RiYoutubeFill, RiLinkedinFill,RiGithubFill,RiInstagramFill, RiFacebookFill} from "react-icons/ri";
import Link from "next/link";

const icons=[{

  path:'https://www.linkedin.com/in/shaibin-kb-6a9761251/',
  name:<RiLinkedinFill />,
},
{
  path:'https://github.com/shaibinkb16',
  name:<RiGithubFill />,
},
{
  path:'https://www.instagram.com/shaibin_k_b/profilecard/?igsh=NmxrZDgyajRqdmNx',
  name:<RiInstagramFill />,
},

];

const Socials = ({containerStyles,iconStyles}) => {
  return (
  <div className={`${containerStyles}`}>
    {icons.map((icon,index)=>{
      return (
      <Link  href={icon.path} key={index}>
      <div className={`${iconStyles}`}>{icon.name}</div>
      </Link>
      );
    })}
  </div>
  );
};

export default Socials