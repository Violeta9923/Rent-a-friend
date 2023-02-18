import React, { useMemo, useState, useEffect } from "react";
import {
    GoogleMap,
    InfoBox,
    InfoWindow,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api";
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
import "./FriendsMapStyle.css";
import CityModal from "../modals/CityModal";

const FriendsMap = () => {

    const { isLoaded } = useJsApiLoader({
        id: "google-map",
        googleMapsApiKey: "AIzaSyDHs1CIAFarhGmbmf6bRmZNXxsTu7NTN_w",
    });
    const [cities, setCities] = useState([]);
    const [showModal, setShowModal] = useState(null)

    useEffect(() => {
        const q = query(collection(db, "cities"), where("count", ">", 0));
        onSnapshot(q, (querySnapshot) => setCities(querySnapshot.docs));
    }, [db]);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <GoogleMap
                zoom={7}
                center={{ lat: 46, lng: 25.59 }}
                mapContainerClassName="map-container"
            >
                {cities.length &&
                    cities.map((city) => (
                        <Marker position={{ lat: city.data().latitude, lng: city.data().longitude }}
                        key={city.data().id}
                        onClick={() => setShowModal(city)}
                        >
                        </Marker>
                    ))}
            </GoogleMap>
            {showModal && <CityModal setShowModal={setShowModal} showModal={showModal} />}
        </div>
    );
};

export default FriendsMap;
