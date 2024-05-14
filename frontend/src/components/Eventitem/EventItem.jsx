import React, { useContext } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { url } from "../../baseUrl/baseUrl";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${monthNames[monthIndex]} ${day}, ${year}`;
};
function trimParagraph(paragraph, maxLength) {
  if (paragraph.length <= maxLength) {
      return paragraph; // No need to trim, return the original paragraph
  } else {
      return paragraph.slice(0, maxLength) + "...";
  }
}
const EventItem = ({id,name,image,description,price,category,country,endDate,index}) => {
  return (
    <div
      className="w-full h-full m-auto rounded-xl shadow shadow-gray-300 fade-in"
      key={index}
    >
      <div className="relative cursor-pointer">
        <Link to={`/eventdetails/${id}`}>
          <img
            className="w-full rounded-t-md h-60 object-cover"
            src={`${url}/images/${image}`}
            alt=""
          />
        </Link>
        <div className="absolute bottom-4 left-0  flex items-center justify-between w-full   rounded-full px-5 ">
          <div className="bg-white rounded-full px-5 py-1 text-yellow-500 font-semibold">
            Showing
          </div>
          <div className="bg-yellow-400 rounded-full px-5 py-1 text-white font-semibold">
            ${price}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold">{name}</h1>
        <div className="flex items-center gap-7 py-2  ">
          <div className="bg-yellow-400 px-5 py-2  text-sm text-white  rounded-full">
            {category}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 text-bold">
            <MdOutlineDateRange className=" text-yellow-500 text-xl " />
            <span>{formatDate(endDate)}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 text-bold">
            <IoLocationOutline className=" text-yellow-500 text-lg " />
            <span>{country}</span>
          </div>
        </div>
        <p className=" text-gray-500 text-sm mt-2">{trimParagraph(description,500)}</p>
      </div>
    </div> 
  );
};

export default EventItem;
