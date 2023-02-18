import React, {useEffect, useState} from "react";
import "./CityModalStyle.css";
import {
    collection,
    query,
    orderBy,
    where,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useAuth } from "../contexts/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import Ad from "../components/Ad";

const CityModal = ({ showModal, setShowModal }) => {

    const[ads, setAds] = useState([])

    useEffect(() => {
        const q = query(
            collection(db, "ads"),
            where("city", "==", showModal.data().name),
            orderBy("date", "desc")
        );
        onSnapshot(q, (querySnapshot) => setAds(querySnapshot.docs));
    }, [db]);

    return (
        <div className="city-modal-container">
                <div className="title">Rental Ads from {showModal.data().name}</div>
                {ads.length && (
                    ads.map((ad) => (
                        <Ad 
                        className="ad"
                        key={ad.data().id}
                        text={ad.data().text}
                        userId={ad.data().user}
                        city={showModal.data().name}
                        />
                    ))
                )}
                <button className="button" onClick={() => setShowModal(null)}>Inchide</button>

        </div>
    );
};

export default CityModal;
