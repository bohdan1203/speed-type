import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./ui/Button";

const Header = () => {
  const { currentUser, logout } = useAuth();

  function getClassName(navData) {
    return `${navData.isActive ? "text-white" : "text-blue-300"} mr-2`;
  }

  return (
    <header className="bg-blue-800 flex justify-between items-center px-4 py-2 ">
      <div className="font-extrabold italic text-2xl text-white">
        <Link to="/">Speed Type</Link>
      </div>

      {currentUser && (
        <nav>
          <ul className="flex font-bold">
            <li>
              <NavLink to="/" className={getClassName}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/texts" className={getClassName}>
                Texts
              </NavLink>
            </li>
            <li>
              <NavLink to="/stats" className={getClassName}>
                Stats
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {currentUser && (
        <div>
          <span className="text-white mr-2">{currentUser.email}</span>
          <Button
            additionalClasses="button-logout"
            textContent="Logout"
            onClick={() => logout()}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
