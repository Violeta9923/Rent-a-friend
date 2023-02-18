import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    orderBy,
} from "firebase/firestore";
import { db } from "../firebase-config";
import "./RequestsPageStyle.css";
import Request from "../components/Request";

const RequestsPage = () => {
    const { currentUser, setLocation } = useAuth();
    const [requests, setRequests] = useState([]);
    const [sentRequests, setSentRequest] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);
    const [user, setUser] = useState();

    useEffect(() => {
        setLocation(window.location.pathname);
    });

    useEffect(() => {
        const q1 = query(
            collection(db, "friend-requests"),
            where("sender", "==", currentUser.uid),
            orderBy("timestamp", "desc")
        );
        onSnapshot(q1, (querySnapshot1) => {
            setSentRequest(querySnapshot1.docs);
        });
        const q2 = query(
            collection(db, "friend-requests"),
            where("receiver", "==", currentUser.uid),
            orderBy("timestamp", "desc")
        );
        onSnapshot(q2, (querySnapshot2) => {
            setRequests(querySnapshot2.docs);
        });
    }, [db, selectedTab]);

    return (
        <div>
            <div className="requests-container">
                <div className="requests-logo"></div>
                <div className="requests-after-logo">
                <div className="requests-tab-container">
                    <div
                        className={
                            selectedTab === 0 ? "tab-item selected" : "tab-item"
                        }
                        onClick={() => setSelectedTab(0)}
                    >
                        Received
                    </div>
                    <div
                        className={
                            selectedTab === 1 ? "tab-item selected" : "tab-item"
                        }
                        onClick={() => setSelectedTab(1)}
                    >
                        Sent
                    </div>
                </div>
                {requests.length &&
                    selectedTab === 0 &&
                    requests.map((element) => (
                        <Request
                            key={element.data().id}
                            id={element.data().id}
                            selectedTab={selectedTab}
                            sender={element.data().sender}
                            receiver={element.data().receiver}
                            date={element.data().date}
                            location={element.data().location}
                            message={element.data().message}
                            accepted={element.data().accepted}
                        />
                    ))}
                {sentRequests.length ? 
                    selectedTab === 1 &&
                    sentRequests.map((element) => (
                        <Request
                        key={element.data().id}
                        id={element.data().id}
                        selectedTab={selectedTab}
                        sender={element.data().sender}
                        receiver={element.data().receiver}
                        date={element.data().date}
                        location={element.data().location}
                        message={element.data().message}
                        accepted={element.data().accepted}
                        />
                    )) : <div></div>}
                {!requests.length && <div>No request</div>}
                </div>
            </div>
        </div>
    );
};

export default RequestsPage;
