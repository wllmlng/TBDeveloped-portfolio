import React from 'react';
import styles from './Navbar.module.scss'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <img src="/postman-logo-orange.svg" alt="Postman Logo" className="logo" /> 
            <div className={styles.links}>
                <a href="https://github.com/wllmlng" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/william-leung-60589a73/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;