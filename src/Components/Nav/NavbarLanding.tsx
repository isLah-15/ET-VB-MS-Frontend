import { Link } from "react-router-dom";


export default function NavbarLanding() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to="/about">About Us</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      
      <li>
        <details>
          <summary>Sign Up</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
    );
}