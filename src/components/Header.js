import { useReducer } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./ui/Button";

import { useResults } from "../contexts/ResultsContext";

const ACTIONS = {
  LOGOUT: "logout",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGOUT:
      action.payload.logout();

      return state;
  }
}

const defaultState = {};

const Header = () => {
  const [headerState, dispatchHeader] = useReducer(reducer, defaultState);
  const { currentUser, logout } = useAuth();

  const { results } = useResults();

  function getClassName(navData) {
    return `${navData.isActive ? "text-white" : ""} mr-2`;
  }

  function calculateAverageAccuracy(results) {
    return (
      results
        .map((result) => +result.accuracy)
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0) / results.length
    ).toFixed(2);
  }

  function calculateAverageSpeed(results) {
    return (
      results
        .map((result) => +result.speed)
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0) / results.length
    ).toFixed(2);
  }

  function getBestSpeed(results) {
    return Math.max(...results.map((result) => result.speed));
  }

  return (
    <header className="bg-blue-800 flex justify-between items-center px-4 py-2 ">
      <div className="font-extrabold italic text-2xl text-white">
        Speed Type
      </div>

      {currentUser && (
        <nav>
          <ul className="flex font-bold text-lime-100">
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
          <span className="text-white">{currentUser.email}</span>
          <Button
            textContent="Logout"
            onClick={() =>
              dispatchHeader({
                type: ACTIONS.LOGOUT,
                payload: { logout },
              })
            }
          />
        </div>
      )}

      {currentUser && (
        <ul className="text-white">
          <li>Average Accuracy: {calculateAverageAccuracy(results)}</li>
          <li>Average Speed: {calculateAverageSpeed(results)}</li>
          <li>Best Speed: {getBestSpeed(results)}</li>
        </ul>
      )}
    </header>
  );
};

export default Header;
