import React, { useEffect, useState } from "react";
import { url } from "./../../baseUrl/baseUrl";
import { toast } from "react-toastify";
import axios from "axios";

const AddEvents = () => {
  const [image, setImage] = useState("");
  const [data, setData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    time: "",
    location: "",
    price: "",
    category: "Art",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    description: "",
  });
  const onChangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onImageChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };
useEffect(()=>{

},[data])
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("time", data.time);
    formData.append("location", data.location);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("street", data.street);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("zipcode", data.zipcode);
    formData.append("country", data.country);
    formData.append("phone", data.phone);
    formData.append("description", data.description);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/event/add`, formData);
      console.log(response.data);
      if (response.data.success) {
        setData({
          name: "",
          startDate: "",
          endDate: "",
          time: "",
          location: "",
          price: "",
          category: "Art",
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          phone: "",
          description: "",
        });
        setImage("");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the event.");
    }
  };

  return (
    <div className="px-14 w-full ">
      <h2 className="text-4xl font-medium py-5 text-center text-gray-800">
        Add <span className="text-yellow-400">Events</span>
      </h2>
      <form
        className=" flex-col flex items-center justify-center gap-4 mt-10  "
        onSubmit={onSubmitHandler}
      >
        <div className="text-sm ">
          <input
            required
            name="name"
            className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
            type="text"
            placeholder="Event Name"
            value={data.name}
            onChange={onChangehandler}
          />
          <input
            required
            name="location"
            className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
            type="text"
            placeholder="Location"
            value={data.location}
            onChange={onChangehandler}
          />
          <div className="flex gap-64 text-sm ps-1">
            <label className="mb-1">Start Date</label>
            <label className="mb-1">End Date</label>
          </div>
          <div className="flex gap-2 text-sm">
            <input
              required
              name="startDate"
              className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
              type="date"
              value={data.startDate}
              onChange={onChangehandler}
            />
            <input
              required
              name="endDate"
              className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
              type="date"
              value={data.endDate}
              onChange={onChangehandler}
            />
          </div>
          <input
            required
            name="time"
            className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
            type="time"
            placeholder="Time"
            value={data.time}
            onChange={onChangehandler}
          />
          <div className="flex gap-72 text-sm ps-1">
            <label className="mb-1">Price</label>
            <label className="mb-1 ">Category</label>
          </div>
          <div className="flex gap-2 ">
            <input
              required
              name="price"
              className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
              type="number"
              placeholder="Price"
              value={data.price}
              onChange={onChangehandler}
            />
            <select
              name="category"
              className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
              value={data.category}
              onChange={onChangehandler}
            >
              <option value="Art">Art</option>
              <option value="Business">Business</option>
              <option value="Deserts">Deserts</option>
              <option value="Education">Education</option>
              <option value="Festival">Festival</option>
              <option value="Food">Food</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <input
            required
            name="street"
            className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
            type="text"
            placeholder="Street"
            value={data.street}
            onChange={onChangehandler}
          />
          <div className="flex gap-2 ">
            <input
              required
              name="city"
              className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
              type="text"
              placeholder="City"
              value={data.city}
              onChange={onChangehandler}
            />
            <input
              required
              name="state"
              className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
              type="text"
              placeholder="State"
              value={data.state}
              onChange={onChangehandler}
            />
          </div>
          <div className="flex gap-2 ">
            <input
              required
              name="zipcode"
              className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
              type="text"
              placeholder="Pincode"
              value={data.zipcode}
              onChange={onChangehandler}
            />
            <input
              required
              className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
              type="text"
              placeholder="Country"
              name="country"
              value={data.country}
              onChange={onChangehandler}
            />
          </div>
          <input
            required
            className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
            type="text"
            id=""
            placeholder="Phone"
            name="phone"
            value={data.phone}
            onChange={onChangehandler}
          />
          <input
            required
            className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
            type="file"
            id="image"
            name="image"
            onChange={onImageChangeHandler}
            accept="image/*"
          />
          <textarea
            required
            className="mb-3 w-full p-2 border border-gray-500 rounded outline-[tomato]"
            type="text"
            id=""
            placeholder="description"
            name="description"
            value={data.description}
            onChange={onChangehandler}
          ></textarea>
        </div>
        <button
          className="bg-gray-900  w-[58%] py-2 mb-4 text-white font-medium border-none outline-none rounded text-sm"
          type="submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddEvents;
