import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
        <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Attendance Management System</div>
          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            <NavLink to={'/'} exact><li className='active'>Home</li></NavLink>
            <NavLink to={'/Add'}><li>Add Volunteer</li></NavLink>
            <NavLink to={'/remove'}><li>Remove Volunteer</li></NavLink>
            <NavLink to={'/students'}><li>Student List</li></NavLink>
          </ul>
          <div className="hamburger" onClick={toggleMenu}>
            &#9776;
          </div>
        </div>
      </nav>
<hr />      
</>
    );
};

export default Navbar;

