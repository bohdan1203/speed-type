import React from "react";

import AuthForm from "../../components/AuthForm";
import Input from "../../components/ui/Input";

const ForgotPassword = () => {
  return (
    <AuthForm
      title="Reset Password"
      submitText="Reset Password"
      alternative="Remember password?"
      linkHref="/login"
      linkText="Log in."
    >
      <Input id="forgot-password" label="Email" />
    </AuthForm>
  );
};

export default ForgotPassword;
