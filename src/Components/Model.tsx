// import React, { useState} from "react";
import { IoIosClose } from "react-icons/io";
import logo from "../assets/logo.png";
interface ModelProps {
  handleModel: () => void;
}
function Model({ handleModel }: ModelProps) {
  return (
    <div className="bg-[#141517] rounded-t-[20px] md:m-[0.5rem] md:mt-[3rem] my-4 absolute bottom-0 z-10 top-[0rem] right-0 left-0 h-[100vh]">
      <div className="float-right absolute right-0 p-4">
        <IoIosClose
          onClick={handleModel}
          size={30}
          className="bg-white rounded-full"
        />
      </div>
      <div className="flex justify-center  items-center p-12">
        <div className="flex items-center justify-center gap-1 flex-col">
          <figure>
            <img
              src={logo}
              alt="logo"
              className="w-[4rem] rounded-full h-[4rem] mb-4 border-[10px] border-slate-500"
            />
          </figure>

          <h3 className="text-white text-[20px] font-bold ">MomentumAI</h3>
          <h6 className="text-white text-[13px]">mass x velocity🦾</h6>
        </div>
      </div>
      <div className="px-6">
        <h4 className="mb-4 text-white text-[18px]">model info:</h4>
        <ul className="text-white text-[13px] list-disc ">
          <li>gemini-2,0-flash</li>
          <li>generative model</li>
        </ul>
      </div>
    </div>
  );
}

export default Model;
