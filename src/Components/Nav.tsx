import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
interface NavProps {
  handleclick: () => void;
}
function Nav({ handleclick }: NavProps) {
  return (
    <nav className="flex items-center justify-between mx-4 py-2">
      <div className="flex items-center gap-2">
        {/* <div className="bg-slate-500 rounded-full p-2">
              <img
                src={logo}
                alt="logo"
                className="w-[2.5rem] rounded-full h-[2.5rem]"
              />
            </div> */}
        <p className="text-white  font-bold text-lg">Momentum</p>
      </div>
      <div onClick={handleclick} className="rounded-full p-4 h-[4rem]">
        <HiOutlineDotsVertical size={30} className="text-white" />
      </div>
    </nav>
  );
}

export default Nav;
