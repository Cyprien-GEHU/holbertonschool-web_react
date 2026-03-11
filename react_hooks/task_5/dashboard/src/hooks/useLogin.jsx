import { useState, useCallback } from "react";

export default function useLogin(onLogin) {
  //all user data get by input
  const [formData, setFormData] = useState({ email: "", password: "" });

  // controle submit control part
  const [enableSubmit, setEnableSubmit] = useState(false);

  const validateForm = useCallback((email, password) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const enableSubmit = regexEmail.test(email) && password.length >= 8;
    setEnableSubmit(enableSubmit);
  }, []);

  const handleChangeEmail = useCallback(
    (event) => {
      const email = event.target.value;

      setFormData((prev) => {
        const update = { ...prev, email };
        validateForm(update.email, update.password);
        return update;
      });
    },
    [validateForm],
  );

  const handleChangePassword = useCallback(
    (event) => {
      const password = event.target.value;

      setFormData((prev) => {
        const update = { ...prev, password };
        validateForm(update.email, update.password);
        return update;
      });
    },
    [validateForm],
  );

  const handleLogInSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onLogin(formData.email, formData.password);
    },
    [formData, onLogin],
  );

  return {
    email: formData.email,
    password: formData.password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLogInSubmit,
  };
}
