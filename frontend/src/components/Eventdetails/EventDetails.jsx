import React, { useContext, useEffect, useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { BsCalendar2DateFill } from "react-icons/bs";
import { GiDoorHandle } from "react-icons/gi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import { IoPricetagSharp } from "react-icons/io5";
import { GoFileSubmodule } from "react-icons/go";
import { FaRegFlag } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../baseUrl/baseUrl";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
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
function getAmOrPm(timeString) {
  const hour = timeString.split(":")[0];
  return hour >= 12 ? "pm" : "am";
}
const EventDetails = () => {
  const {addToCart}=useContext(StoreContext)

  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${url}/api/event/singleevent`, {
          id,
        });
        if (response.data.success) {
          setData(response.data.data);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch event details");
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <div className="text-4xl font-medium py-5 text-center text-gray-800">Loading...</div>; 
  }
  return (
    <div className="w-full px-12 bg-gray-50">
      <h2 className="text-4xl font-medium py-5 text-center text-gray-800">
        Event <span className="text-yellow-400">Details</span>
      </h2>
      <div className="flex gap-5 ">
        <div className=" w-3/4 bg-white p-5 shadow shadow-gray-300 flex flex-col gap-6">
          <img
            className="w-full "
            src={`${url}/images/${data[0].image}`}
            alt=""
          />
          <h1 className="text-xl font-bold">{data[0].name}</h1>

          <p className=" text-gray-500 text-sm">{data[0].description}</p>
          <button className="bg-yellow-400 py-2 text-white font-semibold rounded-md"
            onClick={() => addToCart(data[0]._id)}
          
          >
            BOOK TICKET
          </button>
        </div>
        <div className="shadow shadow-gray-300 w-[30%] flex flex-col gap-5 ps-7">
          <h1 className="mt-5 text-lg font-semibold text-gray-600">
            Event Details
          </h1>
          <hr />
          <div className="flex items-start gap-7">
            <span className="">
              <BsCalendarDate className="text-2xl text-yellow-400" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-gray-800">
                START DATE
              </p>
              <p className="text-[14px] font-medium text-gray-400">
                {formatDate(data[0].startDate)}
              </p>
            </div>
          </div>
          <hr />
          <div className="flex items-start gap-7">
            <span className="">
              <BsCalendar2DateFill className="text-2xl text-yellow-400" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-gray-800">
                END DATE
              </p>
              <p className="text-[14px] font-medium text-gray-400">
                {formatDate(data[0].endDate)}
              </p>
            </div>
          </div>
          <hr />
          <div className="flex items-start gap-7">
            <span className="">
              <GiDoorHandle className="text-2xl text-yellow-400" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-gray-800">
                DOOR TIME
              </p>
              <p className="text-[14px] font-medium text-gray-400">
                {" "}
                {data[0].time} {getAmOrPm(data[0].time)}
              </p>
            </div>
          </div>
          <hr />
          <div className="flex items-start gap-7">
            <span className="">
              <AiOutlineCheckCircle className="text-2xl text-yellow-400" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-gray-800">STATUS</p>
              <p className="text-[14px] font-medium text-gray-400">SHOWING</p>
            </div>
          </div>
          <hr />
          <div className="flex items-start gap-7">
            <span className="">
              <IoLocationOutline className="text-2xl text-yellow-400" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-gray-800">
                LOCATION
              </p>
              <p className="text-[14px] font-medium text-gray-400">{data[0].location}</p>
            </div>
          </div>

          <hr />
          <div className="flex items-start gap-7">
            <span className="">
              <IoPricetagSharp className="text-2xl text-yellow-400" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-gray-800">PRICE</p>
              <p className="text-[14px] font-medium text-gray-400"> {data[0].price}</p>
            </div>
          </div>
          <hr />
          <div className="flex items-start gap-7">
            <span className="">
              <GoFileSubmodule className="text-2xl text-yellow-400" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-gray-800">
                CATEGORY
              </p>
              <p className="text-[14px] font-medium text-gray-400">{data[0].category}</p>
            </div>
          </div>
          <hr />
          <div className="flex items-start gap-7">
            <span className="">
              <FaRegFlag className="text-2xl text-yellow-400" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-gray-800">ADDRESS</p>
              <p className="text-[14px] font-medium text-gray-400">{data[0].street}, {data[0].city}, {data[0].state}, {data[0].pincode}, {data[0].country}</p>
            </div>
          </div>
          <hr />
          <div className="flex items-start gap-7">
            <span className="">
              <FaPhoneAlt className="text-2xl text-yellow-400" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-gray-800">PHONE</p>
              <p className="text-[14px] font-medium text-gray-400"> {data[0].phone}</p>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
