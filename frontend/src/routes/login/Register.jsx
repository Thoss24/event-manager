import classes from './LoginPage.module.css'
import registerUser from '../../utility/authentication/register_user';
import { useRef } from 'react';
import { Link } from "react-router-dom";
import styles from './RegisterPage.module.css';

const Register = () => {

    const email = useRef();
    const password = useRef();
    const firstName = useRef();
    const lastName = useRef();

    const generateProfileIconColor = () => {
      const rbgCodes = ['FF9999', 'FFCC99', 'FFFF99', 'CCFF99', '99FF99', '99CCFF'];

      const index = Math.floor(Math.random() * 6);

      return rbgCodes[index]
    }

    const registerUserHandler = (event) => {
        event.preventDefault()

        const profileImage = firstName.current.value[0].toUpperCase() + lastName.current.value[0].toUpperCase();

        const userData = {
            email: email.current.value,
            password: password.current.value,
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            profileImage,
            profileImgColor: generateProfileIconColor()
        }
        registerUser(userData)
    }

  return (
    <div className={styles.registerContainer}>
    <form onSubmit={registerUserHandler} className={styles.registerForm}>
      <h1 className={styles.registerTitle}>Register</h1>
      <fieldset className={styles.fieldset}>
        <label htmlFor="email" className={styles.formLabel}>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          ref={email}
          className={styles.formInput}
          required
        />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <label htmlFor="password" className={styles.formLabel}>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          ref={password}
          className={styles.formInput}
          required
        />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <label htmlFor="first_name" className={styles.formLabel}>First Name</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          ref={firstName}
          className={styles.formInput}
          required
        />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <label htmlFor="last_name" className={styles.formLabel}>Last Name</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          ref={lastName}
          className={styles.formInput}
          required
        />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <label htmlFor="account_type" className={styles.formLabel}>Account Type</label>
        <select name="account_type" id="account_type" className={styles.formSelect}>
          <option value="admin">Admin</option>
          <option value="user" selected>User</option>
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
