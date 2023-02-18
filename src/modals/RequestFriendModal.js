import { serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./RequestFriendModalStyle.css";

const RequestFriendModal = ({ setShowModal, receiver }) => {
    const { currentUser, sendFriendRequest } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [request, setRequest] = useState({
        sender: currentUser.uid,
        receiver: receiver,
        date: "",
        message: "",
        accepted: 0,
        location: "",
        timestamp: serverTimestamp(),
    });

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            setError("");
            setLoading(true);
            sendFriendRequest(request);
        } catch (error) {
            setError("Failed to send the request");
        }
        setLoading(false);
        setShowModal(false);
    };

    const handleChange = (event) => {
        let value = event.target.value;
        const name = event.target.name;
        setError("");
        setRequest((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="row request-container">
            <div className="col col-lg-5 request-left-side"></div>

            <div className="col col-lg-7">
                <div className="request-right-side">
                    <h3>Send a request</h3>
                    <hr className="line" />
                    {error && <div>error</div>}
                    <form onSubmit={handleClick} className="form-horizontal">
                        <div className="form-group">
                            <label>Message</label>
                            <input
                                required={true}
                                type="text"
                                name="message"
                                className="form-control"
                                value={request.message}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                required={true}
                                type="date"
                                name="date"
                                className="form-control"
                                value={request.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                required={true}
                                type="text"
                                name="location"
                                className="form-control"
                                value={request.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="buttons">
                            <button
                                disabled={loading}
                                className="cancel-btn"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                disabled={loading}
                                className="btn"
                                onClick={handleClick}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RequestFriendModal;
