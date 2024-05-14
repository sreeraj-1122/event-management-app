import React, { useEffect } from "react";
import EventItem from "../../components/Eventitem/EventItem";
import { useState } from "react";
import axios from "axios";
import { url } from "../../baseUrl/baseUrl";

const Event = () => {
  // const { events } = useContext(StoreContext);
  const [category, setCategory] = useState("All");
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const response = await axios.get(`${url}/api/event/list`);
    setEvents(response.data.data);
  };
  useEffect(() => {
      fetchEvents();
  }, []);

  return (
    <div className="p-5" id="events">
      <h2 className="text-4xl font-medium my-5 text-center text-gray-800">
        Upcoming <span className="text-yellow-400">Events</span>
      </h2>
      <div className="flex my-10 mx-auto justify-center gap-6 items-center  capitalize">
        <div
          className="bg-yellow-400 text-white px-5 py-2 rounded-3xl border border-yellow-400 hover:text-yellow-400 cursor-pointer transition-all hover:bg-white "
          onClick={() => setCategory("All")}
        >
          All
        </div>
        <div
          className="bg-yellow-400 text-white px-5 py-2 rounded-3xl border border-yellow-400 hover:text-yellow-400 cursor-pointer transition-all hover:bg-white "
          onClick={() => setCategory("Art")}
        >
          Art
        </div>
        <div
          className="bg-yellow-400 text-white px-5 py-2 rounded-3xl border border-yellow-400 hover:text-yellow-400 cursor-pointer transition-all hover:bg-white"
          onClick={() => setCategory("Business")}
        >
          Business
        </div>
        <div
          className="bg-yellow-400 text-white px-5 py-2 rounded-3xl border border-yellow-400 hover:text-yellow-400 cursor-pointer transition-all hover:bg-white"
          onClick={() => setCategory("Education")}
        >
          Education
        </div>
        <div
          className="bg-yellow-400 text-white px-5 py-2 rounded-3xl border border-yellow-400 hover:text-yellow-400 cursor-pointer transition-all hover:bg-white"
          onClick={() => setCategory("Festival")}
        >
          Festival
        </div>
        <div
          className="bg-yellow-400 text-white px-5 py-2 rounded-3xl border border-yellow-400 hover:text-yellow-400 cursor-pointer transition-all hover:bg-white"
          onClick={() => setCategory("Food")}
        >
          Food
        </div>
        <div
          className="bg-yellow-400 text-white px-5 py-2 rounded-3xl border border-yellow-400 hover:text-yellow-400 cursor-pointer transition-all hover:bg-white"
          onClick={() => setCategory("sports")}
        >
          sports
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 gap-y-10">
        {events.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <EventItem
                id={item._id}
                key={index}
                image={item.image}
                price={item.price}
                name={item.name}
                category={item.category}
                endDate={item.endDate}
                country={item.country}
                description={item.description}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Event;
