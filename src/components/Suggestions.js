import React, { useEffect, useState } from "react";
import "./SuggestionsStyle.css";
import { collection, query, orderBy, where, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-config";
import { useAuth } from "../contexts/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Suggestions = ({showModal}) => {
    const {currentUser, searchedUser, setSearchedUser} = useAuth()
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate()

    useEffect(() =>{
        const q = query(collection(db, "users"), orderBy("timestamp", "desc"));
        onSnapshot(q, (querySnapshot) => 
            setSuggestions(querySnapshot.docs)
        );
    }, [db])

    const handleClick = (user) => {
        setSearchedUser(user)
        navigate("/profile/" + user.name)
    }

    return (
        <div className={showModal ? "cover" : "suggestions-container"}>
            <div className="suggestions-title">Suggestions for you</div>

                {suggestions.slice(0, 5).map((user) => (
                    <div onClick={() => handleClick(user.data())} key={user.data().id} className="suggestions-user">
                        <img className="suggestions-avatar" src={user.data().photo} alt=""/>
                        <div className="suggestions-info">
                            <div>{user.data().name}</div>
                            <div>{user.data().city}</div>
                        </div>
                    </div>

                ))}
            
        </div>
    );
};

export default Suggestions;
