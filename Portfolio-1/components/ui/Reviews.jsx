'use client';

import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles

import { Pagination, Autoplay } from "swiper/modules"; // Import the Autoplay module

const skillsData = [
  {
    title: "Data Structures",
    description:
      "Understanding and implementation of various data structures like arrays, linked lists, stacks, queues, trees, and graphs for efficient problem-solving.",
    image: "https://img.icons8.com/?size=80&id=C9z9kXeqGi1B&format=png",
  },
  {
    title: "Algorithms",
    description:
      "Proficiency in algorithm design and analysis, including sorting, searching, dynamic programming, and greedy algorithms.",
    image: "https://img.freepik.com/free-vector/hand-coding-concept-illustration_114360-8193.jpg?t=st=1732386616~exp=1732390216~hmac=4bb168fb417efc66c27728a58af0b7d5f174082e9234dc3459d6b3c8963878f6&w=740",
  },
  {
    title: "Cloud Computing",
    description:
      "Experience with cloud platforms and tools, including AWS, Azure, and GCP for building and scaling applications.",
    image: "https://img.freepik.com/free-vector/big-data-center-server-room-rack-engineering-process-teamwork-computer-technology-cloud-storage_39422-1032.jpg?t=st=1732386758~exp=1732390358~hmac=24c4aa974a8d4b701bd0800a8ecac121cabf999aedbc5fdef26f11654c6e4932&w=826",
  },
  {
    title: "Machine Learning",
    description:
      "Knowledge of machine learning models, supervised and unsupervised learning",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg",
  },
  {
    title: "Data Science",
    description:
      "Expertise in data analysis, visualization, and statistical modeling using tools like Python, Pandas, Matplotlib",
    image: "https://img.icons8.com/?size=100&id=83IWFlQhyRNZ&format=png&color=000000",
  },
  {
    title: "Shell Scripting",
    description:
      "Automation of tasks and system administration using Bash and other scripting tools.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bash_Logo_Colored.svg",
  },
  {
    title: "MongoDB",
    description:
      "Experience in NoSQL database management and querying with MongoDB.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
  },
  {
    title: "MySQL",
    description:
      "Proficiency in relational database management using MySQL for optimized querying and data storage.",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg",
  },
  {
    title: "JavaScript",
    description:
      "Building modern web applications using JavaScript for both frontend and backend.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  },
  {
    title: "Java",
    description:
      "Strong understanding of core Java concepts and object-oriented programming for building scalable applications.",
    image: "https://img.icons8.com/?size=48&id=13679&format=png",
  },
  {
    title: "IoT",
    description:
      "Knowledge of IoT systems, including sensor integration and cloud communication.",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
  },
  {
    title: "Artificial Intelligence",
    description:
      "Introduction to AI concepts, natural language processing, and neural networks.",
    image: "https://img.freepik.com/free-vector/artificial-intelligence-vector-symbol-illustration-isolated-white-background_8130-2311.jpg?uid=R111016538&ga=GA1.1.1594752884.1718905950&semt=ais_hybrid",
  },
  {
    title: "Android Studio",
    description:
      "Proficiency in Android app development using Android Studio, including Java/Kotlin programming, UI/UX design, and app debugging.",
    image: "https://img.freepik.com/free-vector/modern-android-icon_1035-9121.jpg?uid=R111016538&ga=GA1.1.1594752884.1718905950&semt=ais_hybrid",
  },
];

const AcademicSkills = () => {
  return (
    <section className="mb-12 xl:mb-32">
      <div className="container mx-auto">
        <h2 className="section-title mb-12 text-center mx-auto">Academic Skills</h2>
        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1400: { slidesPerView: 3 },
          }}
          spaceBetween={30}
          modules={[Pagination, Autoplay]} // Add the Autoplay module
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000, // Reduced delay for faster transitions (2 seconds)
            disableOnInteraction: false, // Continue autoplay even after interaction
          }}
          loop={true} // Enable looping for smooth transition between slides
          speed={600} // Speed of slide transition in ms (set to 600ms for smooth transition)
          className="h-[350px]"
        >
          {skillsData.map((skill, index) => (
            <SwiperSlide key={index}>
              <Card className="bg-tertiary dark:bg-secondary/40 p-8 min-h-[300px]">
                <CardHeader p-0 mb-10>
                  <div className="flex items-center gap-x-4">
                    <Image
                      src={skill.image}
                      width={70}
                      height={70}
                      alt={skill.title}
                      className="object-contain"
                    />
                    <div className="flex flex-col">
                      <CardTitle>{skill.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardDescription className="text-lg text-muted-foreground">
                  {skill.description}
                </CardDescription>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AcademicSkills;
