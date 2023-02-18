import React, { Component, useState, useEffect } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from '@mui/icons-material/Group';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { getAuth } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { auth, db, storage } from "../firebase-config";
import { useAuth } from "../contexts/AuthContext";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import {
    setDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot,
    getDocFromServer,
    getDoc,
} from "firebase/firestore";
import "./MenuStyle.css";
import { async } from "@firebase/util";
import { Navigation } from "@mui/icons-material";

const Menu = () => {
    const { currentUser, logout, selected, setSelected, location } = useAuth();
    const [userData, setUserData] = useState({});

    const handleLogOutClick = async () => {
        await logout();
    };

    useEffect(() => {
        if(currentUser.uid) {
            const dataGet = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
                if(doc.exists()) {
                    setUserData(doc.data());
                }
            });
        }
    }, []);

    return (
        <div className="menu">
            <div className="profile">
                <img
                    src={currentUser.photoURL}
                    className="img-responsive"
                    alt="Profile Picture"
                />
                {userData?.name && <div className="profile-name">{userData.name}</div>}
            </div>
            <div className="menu-items">
                <div>
                    <Link
                        to="/profile"
                        sx={{ fontSize: 20, margin: 1, cursor: "pointer" }}
                    >
                        <div
                            onClick={() => setSelected(0)}
                            className={location === "/profile" ? "selected" : "item"}
                        >
                            <AccountCircleOutlinedIcon />
                            <div>Profile</div>
                        </div>
                    </Link>

                    <Link
                        to="/profile/update-profile"
                        sx={{ fontSize: 20, margin: 1, cursor: "pointer" }}
                    >
                        <div
                            onClick={() => setSelected(1)}
                            className={location === "/profile/update-profile" ? "selected" : "item"}
                        >
                            <SettingsOutlinedIcon />
                            <div>Upate Profile</div>
                        </div>
                    </Link>

                    <Link
                        to="/reset-password"
                        sx={{ fontSize: 20, margin: 1, cursor: "pointer" }}
                    >
                        <div
                            onClick={() => setSelected(2)}
                            className={location === "/reset-password" ? "selected" : "item"}
                        >
                            <LockResetOutlinedIcon />
                            <div>Reset Password</div>
                        </div>
                    </Link>
                    <Link
                        to="/requests"
                        sx={{ fontSize: 20, margin: 1, cursor: "pointer" }}
                    >
                        <div
                            onClick={() => setSelected(2)}
                            className={location === "/requests" ? "selected" : "item"}
                        >
                            <NotificationsOutlinedIcon />
                            <div>Requests</div>
                        </div>
                    </Link>
                    <Link
                        to="/rental-ads"
                        sx={{ fontSize: 20, margin: 1, cursor: "pointer" }}
                    >
                        <div
                            onClick={() => setSelected(2)}
                            className={location === "/rental-ads" ? "selected" : "item"}
                        >
                            <AnnouncementOutlinedIcon />
                            <div>Rental Ads</div>
                        </div>
                    </Link>
                    <Link
                        to="/rented-friends"
                        sx={{ fontSize: 20, margin: 1, cursor: "pointer" }}
                    >
                        <div
                            onClick={() => setSelected(2)}
                            className={location === "/rented-friends" ? "selected" : "item"}
                        >
                            <GroupIcon />
                            <div>Rented Friends</div>
                        </div>
                    </Link>
                    <Link
                        to="/friends-map"
                        sx={{ fontSize: 20, margin: 1, cursor: "pointer" }}
                    >
                        <div
                            onClick={() => setSelected(2)}
                            className={location === "/friends-map" ? "selected" : "item"}
                        >
                            <MapOutlinedIcon />
                            <div>Map</div>
                        </div>
                    </Link>
                    <br />
                    <br />

                    <Link
                        to="/about-us"
                        sx={{ fontSize: 20, margin: 1, cursor: "pointer" }}
                    >
                        <div
                            onClick={() => setSelected(3)}
                            className={location === "/about-us" ? "selected" : "item"}
                        >
                            <InfoOutlinedIcon />
                            <div>About us</div>
                        </div>
                    </Link>
                    <Link
                        to="/login"
                        sx={{ fontSize: 20, margin: 1, cursor: "pointer" }}
                    >
                        <div onClick={handleLogOutClick} className="item">
                            <LogoutIcon />
                            <div>Logout</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Menu;
