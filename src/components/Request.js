import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase-config";
import "./RequestStyle.css";

const Request = ({
    id,
    selectedTab,
    sender,
    receiver,
    date,
    location,
    message,
    accepted,
}) => {
    const [user, setUser] = useState({});
    const { currentUser, setSearchedUser, changeRequestState, deleteRequest, addRentedFriend } = useAuth();
    const navigate = useNavigate();
    const [requestState, setRequestState] = useState(accepted)
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        let idUser = "";
        if (selectedTab === 0) {
            idUser = sender;
        } else {
            idUser = receiver;
        }
        onSnapshot(doc(db, "users", idUser), (doc) => {
            setUser(doc.data());
        });
    }, [db, selectedTab]);


    const goToUserPage = () => {
        setSearchedUser(user);
        navigate("/profile/" + user.name);
    };

    const handleClick = async(event, state) => {
        event.preventDefault();
        if(state === "accept") {
            setRequestState(1)
            await addRentedFriend(sender, receiver, date)
        } else if(state === "deny") {
            setRequestState(2)
        }
        try {
            await changeRequestState(id, state)
        } catch {
        }
    };

    const handleDeleteRequest = async(event) => {
        event.preventDefault();
        setDeleted(true)
        await deleteRequest(id)
    }

    return (
        <div
            className={
                deleted === true ? "no-display" : 
                requestState === 0
                    ? "request-container-element"
                    : requestState === 1
                    ? "request-container-element accepted"
                    : "request-container-element rejected"
            }
        >
            <div className="request-info">
                <div className="request-info-element">
                    <div className="label">Date</div>
                    <div className="user-data">{date}</div>
                </div>
                <div className="request-info-element">
                    <div className="label">Location</div> <div className="user-data">{location}</div>
                </div>
                <div className="request-info-element">
                    <div className="label">Message</div> <div className="user-data">{message}</div>
                </div>
                {selectedTab === 0 && (
                    <div className="request-info-element">
                        <div className="label">From</div>{" "}
                        <div className="link user-data" onClick={goToUserPage}>
                            {" "}
                            {user.name}
                        </div>
                    </div>
                )}
                {selectedTab === 1 && (
                    <div className="request-info-element">
                        <div className="label">To</div>{" "}
                        <div className="link user-data" onClick={goToUserPage}>
                            {user.name}
                        </div>
                    </div>
                )}
            </div>
            {selectedTab === 0 && requestState === 0 && (
                <div className="buttons-container">
                    <div
                        className="request-button check"
                        onClick={goToUserPage}
                    >
                        Check user page
                    </div>
                    <div
                        className="request-button accept"
                        onClick={(event) => handleClick(event, "accept")}
                    >
                        Accept
                    </div>
                    <div
                        className="request-button deny"
                        onClick={(event) => handleClick(event, "deny")}
                    >
                        Deny
                    </div>
                </div>
            )}
            {selectedTab === 1 && requestState === 0 && (
                <div
                    className="request-button accept"
                    onClick={handleDeleteRequest}
                >
                    Cancel
                </div>
            )}
            {requestState === 1 && (
                <div className="request-state color-green">Accepted</div>
            )}
            {requestState === 2 && (
                <div className="request-state color-red">Rejected</div>
            )}
        </div>
    );
};

export default Request;
