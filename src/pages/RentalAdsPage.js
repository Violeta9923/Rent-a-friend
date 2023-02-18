import React, { useEffect, useState } from "react";
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
import "./RentalAdsPageStyle.css"

const RentalAdsPage = () => {
    const { currentUser } = useAuth();
    const [ads, setAds] = useState([]);
    const [myAds, setMyAds] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        const q = query(collection(db, "ads"), orderBy("date", "desc"));
        onSnapshot(q, (querySnapshot) => setAds(querySnapshot.docs));
        const q2 = query(collection(db, "ads"), where("user", "==", currentUser.uid), orderBy("date", "desc"));
        onSnapshot(q2, (querySnapshot2) => setMyAds(querySnapshot2.docs));
    }, [db]);

    return (
        <div>
            <div className="rental-ads-stickey-header">
            <div className="rental-ads-logo"></div>
            <div className="ads-tab-container">
                    <div
                        className={
                            selectedTab === 0 ? "tab-item selected" : "tab-item"
                        }
                        onClick={() => setSelectedTab(0)}
                    >
                        All
                    </div>
                    <div
                        className={
                            selectedTab === 1 ? "tab-item selected" : "tab-item"
                        }
                        onClick={() => setSelectedTab(1)}
                    >
                        Mine
                    </div>
            </div>
            </div>
            <div className="after-stickey-header">
            {selectedTab === 0 && ads && ads.length > 0 && (
                <div>
                    {ads.map((ad) => (
                        <Ad 
                        key={ad.data().id}
                        id={ad.data().id}
                        text={ad.data().text}
                        userId={ad.data().user}
                        city={ad.data().city}
                        />
                    ))}
                </div>
                
            )}
            {selectedTab === 1 && myAds && myAds.length > 0 && (
                <div>
                    {myAds.map((ad) => (
                        <Ad 
                        key={ad.data().id}
                        id={ad.data().id}
                        text={ad.data().text}
                        userId={ad.data().user}
                        city={ad.data().city}
                        />
                    ))}
                </div>
                
            )}
            </div>
        </div>
    );
};

export default RentalAdsPage;
