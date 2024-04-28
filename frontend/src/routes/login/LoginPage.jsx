import classes from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import loginUser from "../../utility/authentication/login_user";

const LoginPage = () => {

    const email = useRef();
    const password = useRef();

    const loginHandler = (event) => {
        event.preventDefault()

        const loginDetails = {
            email: email.current.value,
            password: password.current.value
        }

        loginUser(loginDetails)
    }

  return (
    <form onSubmit={loginHandler}>
      <h1>Login</h1>
      <div>
        <label htmlFor="">Email</label>
        <input type="email" name="email" ref={email}/>
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="password" name="password" ref={password}/>
      </div>
      <button type="submit">Login</button>
      <div>
        <Link to={"/register"}>Or register an account here</Link>
      </div>
    </form>
  );
};

export default LoginPage;
