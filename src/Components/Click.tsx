// import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { FaInfoCircle } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
interface ModelProps {
  handleModel: () => void;
  handleclear?: () => void;
}
function Click({ handleModel, handleclear }: ModelProps) {
  return (
    <div className="bg-[#181D22] right-0 absolute mt-[-1rem] float-right rounded-lg mx-8 w-[140px] p-2 drop-shadow-lg">
      <ul className="text-white flex flex-col gap-8 p-2">
        <li onClick={handleModel} className="flex items-center gap-2">
          <FaInfoCircle /> <span className="text-[13px]"> Model</span>
        </li>
        <li className="flex items-center gap-2">
          <LuUserCircle2 />
          <span className="text-[13px]"> Developer</span>
        </li>
        <li onClick={handleclear} className="flex items-center gap-2">
          <MdDeleteSweep />
          <span className="text-[13px]"> New chat </span>
        </li>
      </ul>
    </div>
  );
}

export default Click;
