import React, { useState, useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useAuth } from '../contexts/AuthContext';
import "./AdStyle.css"
import { useNavigate } from 'react-router-dom';

const Ad = ({id, text, userId, city}) => {

    const {deleteRentAd, currentUser} = useAuth()
    const [user, setUser] = useState({})
    const { setSearchedUser } = useAuth();
    let navigate = useNavigate()

    useEffect(() => {
        onSnapshot(doc(db, "users", userId), (doc) => {
            setUser(doc.data());
        });
    }, [db]);

    const handleClick = () => {
        setSearchedUser(user)
        navigate("/profile/" + user.name)
    }

    const handleDeleteClick = async() => {
        await deleteRentAd(id)
    }


  return (
    <div className='rent-ad-container' >
        <div className='rent-ad-left-side' onClick={handleClick}>
        <div>
            <img className='rent-ad-profile-photo' src={user.photo} alt="profile-photo" />
        </div>
        <div className='rent-ad-profile-info'>
            <div className='rent-ad-profile-item first'>Name <p>{user.name}</p></div>
            <div className='rent-ad-profile-item second'>City <p>{city}</p></div>
            <div className='rent-ad-profile-item last'>Message <p>{text}</p></div>
        </div>
        
        </div>
        {currentUser.uid === userId && <div className='delete-rent-ad-button' onClick={handleDeleteClick}>Delete</div>}
    </div>
  )
}

export default Ad