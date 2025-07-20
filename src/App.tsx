import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Home from "./Pages/Home";
import EventsPage from "./Pages/EventsSectionPage";
import AboutPage from "./Pages/AboutPage";
import LandingPage from "./Pages/LandingPage";
import RegisterPage from "./Pages/AuthPage/RegisterPage";
import LoginPage from "./Pages/AuthPage/LoginPage";
import VerifyUser from "./Pages/AuthPage/VerifyPage";
import Error from "./Pages/ErrorPage";
import EventDetails from "./Pages/EventDetails";
import CheckoutPage from "./Pages/CheckoutPage";
import BookingConfirmation from "./Pages/BookingConfirmation";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/eventspage" element={<EventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyUser />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/checkout/:eventId" element={<CheckoutPage />} />
        <Route path="/confirmation/:bookingId" element={<BookingConfirmation />} />
        <Route path="*" element={<Error />} />
      </Routes>

      {/* Global ToastContainer */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
