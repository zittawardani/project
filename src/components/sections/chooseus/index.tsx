import CodeIcon from "@/components/ui/icons/code";
import MedalIcon from "@/components/ui/icons/medal";
import TrophyIcon from "@/components/ui/icons/trophy";
import Lottie from "lottie-react";
import React from "react";
import bussinessAnimation from '../../../../public/animations/business-sales-profit.json'
const ChooseUs = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start lg:p-8">
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img src="/bghero.png" alt="" className="lg:w-5/6 w-full h-full" />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-semibold mb-4 lg:text-5xl">
          Why Choose Us
        </h1>
        <p className="text-lg mb-5 text-gray-600">
          Get to Know Our Company Better
        </p>
        <p className="mb-4 text-gray-600 text-sm lg:text-base">
          There are numbers of reasons why our clients are always happy with the
          services we provide to them and a hundred more, why we keep engaging
          even more customers by exploring new fields of services and still
          believing in our root quality elements.
        </p>
        <div className="space-y-8">
          <div className="flex items-start">
            <div className="mr-4">
              <TrophyIcon />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Professional</h2>
              <p className="text-gray-600 text-sm">
                There are numbers of reasons why our clients are always happy
                with the services we provide to them and a hundred more, why we
                keep engaging even more customers by exploring new fields of
                services and still believing in our root quality elements.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-4">
              <CodeIcon />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Menggunakan Teknologi Terkini
              </h2>
              <p className="text-gray-600 text-sm">
                There are numbers of reasons why our clients are always happy
                with the services we provide to them and a hundred more, why we
                keep engaging even more customers by exploring new fields of
                services and still believing in our root quality elements.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-4">
              <MedalIcon />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Best Service</h2>
              <p className="text-gray-600 text-sm">
                There are numbers of reasons why our clients are always happy
                with the services we provide to them and a hundred more, why we
                keep engaging even more customers by exploring new fields of
                services and still believing in our root quality elements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
