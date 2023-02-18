import React, { useState, useEffect } from "react";
import RequestFriendModal from "../modals/RequestFriendModal";
import { useAuth } from "../contexts/AuthContext";
import "./SearchedUserPageStyle.css";
import {collection, orderBy, Query, query, where} from 'firebase/firestore'
import {db} from '../firebase-config'
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import Post from "../components/Post";


const SearchedUserPage = () => {
    const { setSearchedUser, searchedUser, currentUser } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const itemsArray = []
      const q = query(collection(db, 'posts'), where("user", "==", searchedUser.id), orderBy("date", "desc"))
      onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach(doc => {
              itemsArray.push(doc.data())
          })
          setPosts(itemsArray)
          setLoading(false)
      })
  }, [searchedUser, db])

    return (
        <div>
            <div className="user-page-header">
                <div className="user-page-photo">
                    <img src={searchedUser.photo} alt="Profile Photo" />
                    {searchedUser.id !== currentUser.uid &&  <div className="user-page-header-button">
                        <button
                            className="user-page-request-button"
                            onClick={() => setShowModal(true)}
                        >
                            Send a friend request
                        </button>
                    </div>}
                </div>
                <div className="user-page-info">
                    <div className="user-page-name">
                        Name <p>{searchedUser.name}</p>
                    </div>
                    <div className={"user-page-name age"}>
                        Age <p>{searchedUser.age}</p>
                    </div>
                    <div className={"user-page-name birthday"}>
                        Birthday <p>{searchedUser.birthday}</p>
                    </div>
                    <div className={"user-page-name gender"}>
                        Gender <p>{searchedUser.gender}</p>
                    </div>
                    <div className={"user-page-name city"}>
                        City <p>{searchedUser.city}</p>
                    </div>
                    <div className={"user-page-name about"}>
                        About <p>{searchedUser.about}</p>
                    </div>
                </div>
            </div>

            <div className="user-page-container">
            <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    user={post.user}
                    img={post.photo}
                    captation={post.text}
                />
            ))}
        </div>
            </div>

            {showModal && (
                <RequestFriendModal
                    setShowModal={setShowModal}
                    receiver={searchedUser.id}
                />
            )}
        </div>
    );
};

export default SearchedUserPage;
