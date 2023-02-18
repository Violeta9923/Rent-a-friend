import React, { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useAuth } from "../contexts/AuthContext";
import "./RentedFriendStyle.css";
import { useNavigate } from "react-router-dom";

const RentedFriend = ({ userId, date }) => {
    const [user, setUser] = useState({});
    const { setSearchedUser } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        onSnapshot(doc(db, "users", userId), (doc) => {
            setUser(doc.data());
        });
    }, [db]);

    const handleClick = () => {
        setSearchedUser(user);
        navigate("/profile/" + user.name);
    };

    return (
        <div>
            <div className="rented-friends-logo"></div>
            <div className="rent-ad-container" onClick={handleClick}>
                <div>
                    <img
                        className="rent-ad-profile-photo"
                        src={user.photo}
                        alt="profile-photo"
                    />
                </div>
                <div className="rent-ad-profile-info">
                    <div className="rent-ad-profile-item">
                        Name <p>{user.name}</p>
                    </div>
                    <div className="rent-ad-profile-item">
                        City <p>{user.city}</p>
                    </div>
                    <div className="rent-ad-profile-item">
                        Date <p>{date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentedFriend;
