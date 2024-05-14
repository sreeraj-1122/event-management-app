import React from "react";
import home1 from "../../assets/event.webp";
const Header = () => {
  return (
    <div className="w-full relative">
      <img className="w-full h-[95vh] " src={home1} alt="" />
      <div className="">
        <h1 className="absolute top-[170px]  left-[350px] text-white font-bold text-5xl">
          Make Your Dream Come True
        </h1>
      </div>
    </div>
  );
};

export default Header;
