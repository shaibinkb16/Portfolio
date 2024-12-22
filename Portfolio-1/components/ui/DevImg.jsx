import Image from "next/image";

const DevImg = ({ containerStyles, imgSrc }) => {
  return (
    <div className={`${containerStyles}`} >
      <img src={imgSrc} layout="fill" objectfit="cover" priority="true" alt="" />
    </div>
  );
};

export default DevImg;