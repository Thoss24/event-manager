import React from "react";
import { useRef, FormEvent } from "react";
import { Link } from "react-router-dom";
import { RegisterUserData } from "../../types/misc";
import styles from "./RegisterPage.module.css";
import { registerUser } from "../../utility/authentication/auth_actions";

interface RegisterProps {
  onRegister: () => void; // callback to navigate after register
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const accountTypeRef = useRef<HTMLSelectElement | null>(null);

  const generateProfileIconColor = (): string => {
    const rgbCodes = ["FF9999", "FFCC99", "FFFF99", "CCFF99", "99FF99", "99CCFF"];
    const index = Math.floor(Math.random() * rgbCodes.length);
    return rgbCodes[index];
  };

  const registerUserHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRef.current || !passwordRef.current || !firstNameRef.current || !lastNameRef.current || !accountTypeRef.current) {
      return;
    }

    const profileImage =
      firstNameRef.current.value[0].toUpperCase() +
      lastNameRef.current.value[0].toUpperCase();

    const userData: RegisterUserData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      profileImage,
      profileImgColor: generateProfileIconColor(),
      accountType: accountTypeRef.current.value as "admin" | "user",
    };

    // call your register function (does not return anything)
    registerUser(userData);

    // navigate to home after registration
    onRegister();
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={registerUserHandler} className={styles.registerForm}>
        <h1 className={styles.registerTitle}>Register</h1>

        <fieldset className={styles.fieldset}>
          <label htmlFor="email" className={styles.formLabel}>Email</label>
          <input type="email" id="email" ref={emailRef} className={styles.formInput} required />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <label htmlFor="password" className={styles.formLabel}>Password</label>
          <input type="password" id="password" ref={passwordRef} className={styles.formInput} required />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <label htmlFor="first_name" className={styles.formLabel}>First Name</label>
          <input type="text" id="first_name" ref={firstNameRef} className={styles.formInput} required />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <label htmlFor="last_name" className={styles.formLabel}>Last Name</label>
          <input type="text" id="last_name" ref={lastNameRef} className={styles.formInput} required />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <label htmlFor="account_type" className={styles.formLabel}>Account Type</label>
          <select id="account_type" ref={accountTypeRef} className={styles.formSelect} defaultValue="user">
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </fieldset>

        <button type="submit" className={styles.submitButton}>Submit</button>

        <div className={styles.loginLink}>
          <Link to="/login">Go to Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
