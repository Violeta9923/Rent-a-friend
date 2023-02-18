import React, { Component } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./HeaderStyle.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { async } from "@firebase/util";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate()

    const handleLogOutClick = async () => {
        await logout();
        navigate("/login")

    };

    const handleLogInClick = async () => {
        navigate("/login")
    }

    return (
        <div className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    <Link to="/profile">Rent a friend</Link>
                </div>
                <div className="right-header">
                    {currentUser && <SearchBar />}
                    
                </div>
                {currentUser ? <div onClick={handleLogOutClick} className="logout-button">Log out</div> : 
                <div onClick={handleLogInClick} className="logout-button">Log in</div>}
            </div>
        </div>
    );
};

export default Header;
