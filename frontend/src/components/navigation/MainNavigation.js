import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';

const MainNavigation = () => {

    const isActive = ({isActive}) => {return isActive ? classes.active : classes['list-item']};

    return (
        <nav className={classes['main-nav']}>
            <ul>
                <li className={classes['list-item']}><NavLink className={isActive} to={'/'}>Home</NavLink></li>
                <li className={classes['list-item']}><NavLink className={isActive} to={'events'}>Events</NavLink></li>
                <li className={classes['list-item']}><NavLink className={isActive} to={'booked-events'}>Booked Events</NavLink></li>
            </ul>
        </nav>
    )
};

export default MainNavigation