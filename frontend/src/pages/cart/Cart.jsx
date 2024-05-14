import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { url } from "../../baseUrl/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const [events, setEvents] = useState([]);
  const navigate=useNavigate()
  const fetchEvents = async () => {
    const response = await axios.get(`${url}/api/event/list`);
    setEvents(response.data.data);
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="mt-16 sm:mt-20 w-3/4 m-auto">
      <div>
        <div className="grid items-center  grid-cols-6  text-slate-700 text-center text-sm sm:text-lg font-semibold">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p className="">Remove</p>
        </div>
        <br />
        <hr className="h-[1px] border-none w-full sm:w-[95%]  bg-slate-400" />
        {events.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="grid items-center grid-cols-6 text-slate-700 text-center text-sm sm:text-base font-medium my-3">
                  <img
                    className="w-12 sm:w-16 m-auto"
                    src={`${url}/images/` + item.image}
                    alt=""
                  />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{cartItems[item._id]}</p>

                  <p>₹ {item.price * cartItems[item._id]}</p>
                  <p
                    className="text-xl cursor-pointer w-max m-auto hover:text-[tomato] duration-300 "
                    onClick={() => removeFromCart(item._id)}
                  >
                    X
                  </p>
                </div>
                <hr className="h-[1px] border-none w-full sm:w-[95%]  bg-slate-400" />
              </div>
            );
          }
        })}
      </div>
      <div className="flex-col-reverse sm:flex-row mt-20 flex justify-between gap-[12vw]">
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-xl text-slate-800 sm:text-2xl font-semibold">
            Cart Totals
          </h2>
          <div>
            <hr className="my-2 h-[1px] border-none  bg-slate-400" />
            <div className="flex justify-between text-[#555]">
              <b>Total</b>
              <b>₹ {getTotalCartAmount()}</b>
            </div>
          </div>
          <button className="border-none bg-[tomato] text-white py-2 mt-3  font-medium rounded-sm " onClick={()=>navigate('/book')}>
            PROCEED TO PAYMENT
          </button>
        </div>
        <div className="flex-1">
          <div className=" flex flex-col gap-5">
            <p className="text-slate-700 font-medium ">
              If you have a promocode,Enter it here
            </p>
            <div className=" flex justify-between mt-2 bg-gray-200  items-center rounded">
              <input
                className="border-none outline-none bg-transparent p-2"
                type="text"
                placeholder="Promo code"
              />
              <button className="py-2 w-1/3 bg-zinc-950 text-white rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
