import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Button.module.css';

interface ButtonProps {
    disable?: boolean;
    onSubmit?: () => void;
    onClick?: () => void;
    link?: string;
    text: string;
}

const Button = ({ disable, onSubmit, onClick, link, text }: ButtonProps) => {
    return (
        
            <button className={classes.button} disabled={disable} onClick={onClick} onSubmit={onSubmit}>
                <Link to={link || '#'}>{text}</Link>
            </button>
       
    );
};

export default Button;