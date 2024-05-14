import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "./../../context/StoreContext";
import { toast } from "react-toastify";
import { url } from "../../baseUrl/baseUrl";

const ListEvents = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(StoreContext);

  useEffect(() => {
    getData();
    console.log(data);
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get(
        `${url}/api/event/list`,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
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
  const remove = async (id) => {
    try {
      const response = await axios.post(`${url}/api/event/remove`, { id });
      if (response.data.success) {
        toast.success("Event removed");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch event details");
    }
    getData();
  };
  return (
    <div className="w-3/4 mx-auto">
      <h2 className="text-4xl font-medium py-5 text-center text-gray-800">
        My <span className="text-yellow-400">Events</span>
      </h2>{" "}
      <div>
        <div className="grid grid-cols-5 gap-8 sm:gap-2 p-3 border border-gray-400 text-[15px] place-items-center mt-6">
          <b>Image</b>
          <b>Event Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => (
          <>
            <div
              key={index}
              className="grid grid-cols-5 gap-7 sm:gap-2 p-3 border border-gray-500 text-[15px] place-items-center text-center "
            >
              <img
                className="w-10 sm:w-2/3"
                src={`${url}/images/${item.image}`}
                alt=""
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p
                className="text-lg font-medium cursor-pointer hover:text-[tomato]"
                onClick={() => remove(item._id)}
              >
                X
              </p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ListEvents;
