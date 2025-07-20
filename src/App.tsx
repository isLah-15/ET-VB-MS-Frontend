// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/eventspage" element={<EventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyUser />} />
        <Route path="/eventdetails" element={<EventDetails />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/checkout/:eventId" element={<CheckoutPage />} />
        <Route path="/confirmation/:bookingId" element={<BookingConfirmation />} />



        <Route path= '*' element={<Error />} />
      </Routes>
    </Router>
  );
}