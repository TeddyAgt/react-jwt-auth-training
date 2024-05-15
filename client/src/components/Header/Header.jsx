import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center bg-sky-500 shadow-lg text-white py-4 px-8">
      <NavLink className="text-2xl font-bold">JWT</NavLink>

      <nav className="flex items-center gap-4">
        <NavLink to="signup">Signup</NavLink>
        <NavLink to="signin">Signin</NavLink>
      </nav>
    </header>
  );
}

export default Header;
