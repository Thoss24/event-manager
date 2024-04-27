import classes from "./LoginPage.module.css";

const LoginPage = () => {

    return (
        <form>
            <h1>Login</h1>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" name='email' />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="password" name='password'/>
            </div>
            <button type="submit">Login</button>
        </form>
    )
};

export default LoginPage