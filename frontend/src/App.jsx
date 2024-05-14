import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import EventDetails from "./components/Eventdetails/EventDetails";
import AddEvents from "./pages/Addevents/AddEvents";
import ListEvents from "./components/ListMyEvents/ListEvents";
import Cart from "./pages/cart/Cart";
import LoginPopup from "./components/Signin/LoginPopup";
import BookTicket from "./pages/bookticket/BookTicket";
function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />

      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

    <div>
    <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/eventdetails/:id" element={<EventDetails/>}/>
        <Route path="/addevents" element={<AddEvents/>}/>
        <Route path="/listevents" element={<ListEvents/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/book" element={<BookTicket/>}/>
      </Routes>
      <Footer/>
    </div>
    </>
  );
}

export default App;
