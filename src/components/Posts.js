import React, { useEffect, useState } from "react";
import Post from "./Post";
import {collection, orderBy, Query, query, where} from 'firebase/firestore'
import {db} from '../firebase-config'
import { useAuth } from "../contexts/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";

const Posts = () => {
    const {currentUser} = useAuth()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const itemsArray = []
        const q = query(collection(db, 'posts'), orderBy("date", "desc"))
        const getPosts = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach(doc => {
                itemsArray.push(doc.data())
            })
            setPosts(itemsArray)
            setLoading(false)
        })
    }, [])


    return (
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
    );
};

export default Posts;
