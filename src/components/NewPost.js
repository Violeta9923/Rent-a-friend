import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import "./NewPostStyle.css"
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { db } from "../firebase-config";
import {
    doc,
    onSnapshot,
} from "firebase/firestore";
import NewPostModal from '../modals/NewPostModal';
import NewAdModal from '../modals/NewAdModal';

const NewPost = ({showModal, setShowModal}) => {

    const {currentUser} = useAuth()
    const [modalType, setModelType] = useState("")

    const handlePostClick = () => {
        setShowModal(true)
        setModelType("post")
    }

    const handleAdClick = () => {
        setShowModal(true)
        setModelType("ad")
    }

  return (
    <div className={showModal ? 'modal-mode new-post-container' : 'new-post-container'}>
        <div className='new-post-left'>
            {currentUser?.photoURL && <img className='user-photo' src={currentUser.photoURL} alt="user-profile-phooto" />}
            <div className='post-text'>Share with your friends...</div>
        </div>
        <div className='right-container'>
        <div className='new-post-right' onClick={handlePostClick}>
            <PostAddIcon />
            <div className='post-button'>Post</div>
        </div>
        <div className='new-post-right' onClick={handleAdClick}>
            <AddBoxOutlinedIcon />
            <div className='post-button'>Ad</div>
        </div>
        </div>
        {showModal && modalType === "post" && <NewPostModal setShowModal={setShowModal}/>}
        {showModal && modalType === "ad" && <NewAdModal setShowModal={setShowModal}/>}
    </div>
  )
}

export default NewPost 