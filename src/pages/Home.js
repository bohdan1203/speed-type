import { useReducer, useEffect, useRef, useCallback } from "react";

import { useAuth } from "../contexts/AuthContext";
import Button from "../components/ui/Button";

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

const Home = () => {
  const [headerState, dispatchHeader] = useReducer(reducer, defaultState);

  const { currentUser, logout } = useAuth();

  return (
    <div className="">
      {currentUser?.email}
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
    </div>
  );
};

export default Home;
