import React from "react";
import { Link } from "react-router-dom";
import { useRef, FormEvent } from "react";
import styles from "./LoginPage.module.css";
import { LoginCredentials } from "../../types/misc";
import { loginUser } from "../../utility/authentication/auth_actions";

interface LoginPageProps {
  onLogin: () => void; // callback for navigation
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const loginHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    const user: LoginCredentials = {
      username: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // call your login function (does not return anything)
    loginUser(user);

    // navigate to home page after login
    onLogin();
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={loginHandler} className={styles.loginForm}>
        <h1 className={styles.loginTitle}>Login</h1>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
            className={styles.formInput}
          />
        </div>

        <button type="submit" className={styles.loginButton}>
          Login
        </button>

        <div className={styles.registerLink}>
          <Link to="/register">Or register an account here</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
