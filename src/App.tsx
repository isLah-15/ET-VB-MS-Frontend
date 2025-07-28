import { Routes, Route, Navigate } from "react-router-dom";
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
import TicketSummary from "./Components/Event/TicketSummary";

import AdminDashboard from "./Layout/DashboardLayout/Admin/AdminDashboard";
import Users from "./Layout/DashboardLayout/Admin/ManageUsers/Users";
import Profile from "./Layout/DashboardLayout/Admin/Profile";
import { useSelector } from "react-redux";
import type { RootState } from "./App/Store";
import Events from "./Layout/DashboardLayout/Admin/Events/Event";
import Payments from "./Layout/DashboardLayout/Admin/Payments/Payment";
import UserDashboard from "./Layout/DashboardLayout/User/UserDashboard";
import UserProfile from "./Layout/DashboardLayout/User/UserProfile";
import EventHistory from "./Layout/DashboardLayout/User/EventHistory";
import Analytics from "./Layout/DashboardLayout/Analytics";


// Example: Replace this with your actual user authentication logic

export default function App() {

  const user = useSelector((state: RootState) => state.user);

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
        <Route path="/my-tickets" element={<TicketSummary />} />
        //Admin Routes
        <Route
        path="/admin/dashboard"
        element={
          user.user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />
        }
      >
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
        <Route path="events" element={<Events />} />
        <Route path="payments" element={<Payments />} />
      </Route>

      //User Routes
      <Route
        path="/user/dashboard"
        element={
          user.user?.role === 'user' ? <UserDashboard /> : <Navigate to="/login" />
        }
      >
        <Route path="useranalytics" element={<h1>Analytics</h1>} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="userevents" element={<EventHistory />} />
      </Route>
        
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
