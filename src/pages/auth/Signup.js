import { useReducer, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";
import AuthForm from "../../components/AuthForm";
import Input from "../../components/ui/Input";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /^(?=.*\d).{8,24}$/;

const ACTIONS = {
  EMAIL_CHANGE: "email-change",
  PASSWORD_CHANGE: "password-change",
  CONFIRM_PASSWORD_CHANGE: "confirm-password-change",
  CHECK_VALIDITY: "check-validity",
  EMAIL_BLUR: "email-blur",
  PASSWORD_BLUR: "password-blur",
  CONFIRM_PASSWORD_BLUR: "confirm-password-blur",
  FORM_SUBMIT: "form-submit",
};

function reducer(state, action) {
  const emailIsValid = EMAIL_REGEX.test(state.email);
  const passwordIsValid = PASSWORD_REGEX.test(state.password);
  const passwordsMatch = state.password === state.confirmPassword;

  switch (action.type) {
    case ACTIONS.EMAIL_CHANGE:
      return { ...state, email: action.payload };

    case ACTIONS.PASSWORD_CHANGE:
      return { ...state, password: action.payload };

    case ACTIONS.CONFIRM_PASSWORD_CHANGE:
      return { ...state, confirmPassword: action.payload };

    case ACTIONS.EMAIL_BLUR:
      return {
        ...state,
        message: emailIsValid ? "" : "Please, enter a valid email address",
      };

    case ACTIONS.PASSWORD_BLUR:
      return {
        ...state,
        message: passwordIsValid
          ? ""
          : "Password must be at least 8 characters long and contain at least 1 numeric digit",
      };

    case ACTIONS.CONFIRM_PASSWORD_BLUR:
      return {
        ...state,
        message: passwordsMatch ? "" : "Passwords do not match",
      };

    case ACTIONS.CHECK_VALIDITY:
      const formIsValid = emailIsValid && passwordIsValid && passwordsMatch;
      return { ...state, message: "", formIsValid };

    case ACTIONS.FORM_SUBMIT:
      action.payload.event.preventDefault();
      action.payload.signup(state.email, state.password);

      return state;
  }
}

const defaultFormState = {
  email: "",
  password: "",
  confirmPassword: "",
  formIsValid: false,
  message: "",
};

const Signup = () => {
  const [formState, dispatchForm] = useReducer(reducer, defaultFormState);
  const { signup } = useAuth();

  useEffect(() => {
    dispatchForm({ type: ACTIONS.CHECK_VALIDITY });
  }, [formState.email, formState.password, formState.confirmPassword]);

  return (
    <AuthForm
      title="Sign Up"
      message={formState.message}
      submitDisabled={!formState.formIsValid}
      submitText="Sign Up"
      alternative="Have an account?"
      linkHref="/login"
      linkText="Log in."
      onSubmit={(event) =>
        dispatchForm({
          type: ACTIONS.FORM_SUBMIT,
          payload: { event, signup },
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
        onBlur={() => dispatchForm({ type: ACTIONS.EMAIL_BLUR })}
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
        onBlur={() => dispatchForm({ type: ACTIONS.PASSWORD_BLUR })}
      />
      <Input
        id="password-confirm"
        label="Confirm Password"
        type="password"
        onChange={(event) =>
          dispatchForm({
            type: ACTIONS.CONFIRM_PASSWORD_CHANGE,
            payload: event.target.value,
          })
        }
        onBlur={() => dispatchForm({ type: ACTIONS.CONFIRM_PASSWORD_BLUR })}
      />
    </AuthForm>
  );
};

export default Signup;
