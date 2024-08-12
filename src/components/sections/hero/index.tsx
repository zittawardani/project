import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import bussinessAnimation from '../../../../public/animations/business-team.json'

const Hero = () => {
  return (
    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-10">
      <div className="w-full flex justify-start items-center order-2">
        <div className="flex flex-col gap-8">
          <h1 className="lg:text-6xl text-2xl font-semibold lg:text-left text-center">
            Software E-Shop DBIX
          </h1>
          <p className="lg:text-left text-center leading-normal text-gray-500 ">
            PT. Digital Blockchain Indonesia focuses on developing state-of-the-art mobile applications for iOS and Android that utilize blockchain technology. Working together with the knowledgeable staff at Mudapedia, we are excited to develop a potent web-based e-commerce platform. Our creative method creates safe, effective, and scalable solutions that spur development and digital transformation by fusing blockchain technology with user-centric design.
          </p>
          <div className="flex justify-center gap-3 lg:justify-normal ">
            <Link href={"/#products"}>
              <Button size={"default"}>Products</Button>
            </Link>
            <Link href={"/aboutus"}>
              <Button size={"default"}>About Us</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex lg:justify-end justify-center items-center order-1">
        <img src="/bghero.png" alt="" className="lg:w-5/6 w-2/3 h-full" />
      </div>
    </div>
  );
};

export default Hero;
