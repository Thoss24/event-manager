import classes from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import loginUser from "../../utility/authentication/login_user";
import styles from './LoginPage.module.css'

const LoginPage = () => {

    const email = useRef();
    const password = useRef();

    const loginHandler = (event) => {
        event.preventDefault()

        const user = {
            username: email.current.value,
            password: password.current.value
        }

        loginUser(user)
    }

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={loginHandler} className={styles.loginForm}>
        <h1 className={styles.loginTitle}>Login</h1>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>Email</label>
          <input
            type="email"
            name="email"
            ref={email}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>Password</label>
          <input
            type="password"
            name="password"
            ref={password}
            required
            className={styles.formInput}
          />
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
        <div className={styles.registerLink}>
          <Link to="/register">Or register an account here</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
