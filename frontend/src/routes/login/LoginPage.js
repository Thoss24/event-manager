import fetchLoginData from "../../utility/fetch-login-data";
import { useEffect, useState, useRef } from "react";
import classes from "./LoginPage.module.css";
import { Form } from "react-router-dom";

const LoginPage = () => {

    const [loginData, setLoginData] = useState([]);

    const email = useRef();

    const password = useRef();

    useEffect(() => {
        const getLoginData = async () => {
            const data = await fetchLoginData();
            setLoginData(data)
        }
        getLoginData()
    }, []);

    const validateLogin = () => {
       for (const details in loginData) {
        if (email.current.value === loginData[details].username && password.current.value === loginData[details].password) {
            console.log("Login")
            return
        } else {
            console.log("Login does not exist")
            return
        }
       }
    };

    return (
        <Form>
            <div className={classes.content}>
                <label htmlFor="">Email</label>
                <input type="email" name='email' ref={email}/>
            </div>
            <div className={classes.content}>
                <label htmlFor="">Password</label>
                <input type="password" name='password' ref={password}/>
            </div>
            <button onClick={validateLogin} type="submit">Login</button>
        </Form>
    )
};

export default LoginPage