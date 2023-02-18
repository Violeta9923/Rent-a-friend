import React, {useEffect, useState} from 'react'
import { useAuth } from "../contexts/AuthContext"
import {useNavigate} from 'react-router-dom'
import Feed from "../components/Feed"
import NewPost from "../components/NewPost"



const Profile = () => {
    
    const {setLocation} = useAuth()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setLocation(window.location.pathname)
    }, [])

    return(
        <div>
            <div className="profile">
                <Feed showModal={showModal} setShowModal={setShowModal}/>
            </div>
        </div>
    )
}

export default Profile;