import { useReducer } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AuthForm from "../../components/AuthForm";
import Input from "../../components/ui/Input";

const ACTIONS = {
  EMAIL_CHANGE: "email-change",
  PASSWORD_CHANGE: "password-change",
  FORM_SUBMIT: "form-submit",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.EMAIL_CHANGE:
      return { ...state, email: action.payload };

    case ACTIONS.PASSWORD_CHANGE:
      return { ...state, password: action.payload };

    case ACTIONS.FORM_SUBMIT:
      action.payload.event.preventDefault();
      action.payload.login(state.email, state.password);

      return state;
  }
}

const defaultFormState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formState, dispatchForm] = useReducer(reducer, defaultFormState);
  const { login } = useAuth();

  return (
    <AuthForm
      title="Log In"
      submitText="Log In"
      alternative="Need an account?"
      linkHref="/signup"
      linkText="Sign up."
      onSubmit={(event) =>
        dispatchForm({
          type: ACTIONS.FORM_SUBMIT,
          payload: { event, login },
        })
      }
    >
      <Input
        id="email"
        label="Email"
        type="email"
        onChange={(event) =>
          dispatchForm({
            type: ACTIONS.EMAIL_CHANGE,
            payload: event.target.value,
          })
        }
      />
      <Input
        id="password"
        label="Password"
        type="password"
        onChange={(event) =>
          dispatchForm({
            type: ACTIONS.PASSWORD_CHANGE,
            payload: event.target.value,
          })
        }
      />
      <Link
        className="block text-center mb-3 text-blue-600"
        to="/forgot-password"
      >
        Forgot Password?
      </Link>
    </AuthForm>

    ///////////////////////////////// FORGOT PASSWORD - IMPLEMENT LATER /////////////////////////////////
  );
};

export default Login;
