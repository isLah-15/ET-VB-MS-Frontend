
export default function NavbarLanding() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl"></a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      
      <li>
        <details>
          <summary>Sign Up</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li><a>Register</a></li>
            <li><a>Login</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
    );
}