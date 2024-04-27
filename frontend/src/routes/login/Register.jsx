import classes from './LoginPage.module.css'
import registerUser from '../../utility/register_user';
import { useRef } from 'react';

const Register = () => {

    const email = useRef();
    const password = useRef();
    const firstName = useRef();
    const lastName = useRef();

    const registerUserHandler = (event) => {
        event.preventDefault()
        const userData = {
            email: email.current.value,
            password: password.current.value,
            firstName: firstName.current.value,
            lastName: lastName.current.value
        }
        registerUser(userData)
    }

  return (
    <div>
      <h1>Register</h1>
      <form action="" onSubmit={registerUserHandler}>
        <fieldset>
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="email" ref={email}/>
        </fieldset>
        <fieldset>
          <label htmlFor="">Password</label>
          <input type="password" name="password" id="password" ref={password}/>
        </fieldset>
        <fieldset>
          <label htmlFor="">First Name</label>
          <input type="first_name" name="first_name" id="first_name" ref={firstName}/>
        </fieldset>
        <fieldset>
          <label htmlFor="">Last Name</label>
          <input type="last_name" name="last_name" id="last_name" ref={lastName}/>
        </fieldset>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Register;
