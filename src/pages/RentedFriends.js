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
import RentedFriend from "../components/RentedFriend";

const RentedFriends = () => {
    const { currentUser } = useAuth();
    const [rentedFriends, setRentedFriends] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "rented-friends"), where("sender", "==", currentUser.uid), orderBy("date", "desc"));
        onSnapshot(q, (querySnapshot) => setRentedFriends(querySnapshot.docs));
    }, [db]);

    return (
        <div>
            {rentedFriends.length > 0 && (
                <div>
                    {rentedFriends.map((friend) => (
                        <RentedFriend 
                        key={friend.data().id}
                        userId={friend.data().receiver}
                        date={friend.data().date}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RentedFriends