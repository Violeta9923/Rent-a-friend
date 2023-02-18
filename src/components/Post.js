import React, { useEffect, useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import "./PostStyle.css";
import { collection, query, orderBy, where, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-config";
import { useAuth } from "../contexts/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import Moment from "react-moment";

const Post = ({ id, user, img, captation }) => {
    const {currentUser, sendComment} = useAuth()
    const [username, setUsername] = useState("");
    const [userImg, setUserImg] = useState("");
    const [usernameComment, setUsernameComment] = useState("");
    const [userImgComment, setUserImgComment] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        onSnapshot(doc(db, "users", user), (doc) => {
            setUsername(doc.data().name);
            setUserImg(doc.data().photo);
        });
    }, [db]);

    useEffect(() => {
        onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            setUsernameComment(doc.data().name);
            setUserImgComment(doc.data().photo);
        });
    }, [db]);

    useEffect(() =>{
        const q = query(collection(db, "comments"), where("postId", "==", id), orderBy("timestamp", "desc"));
        onSnapshot(q, (querySnapshot) => 
            setComments(querySnapshot.docs)
        );
    }, [db])

    const send = async(event) => {
        event.preventDefault()
        const commentToSend = comment
        setComment("")
        await sendComment({
            comment: commentToSend,
            userId: currentUser.uid,
            timestamp: serverTimestamp(),
            postId: id,
            username: usernameComment,
            userImg: userImgComment
        })
    }

    return (
        <div className="post-container">
            <div className="container-header">
                <div className="left-header">
                    <img src={userImg} className="image" alt="" />
                    <p className="userName">{username}</p>
                </div>

                <MoreHorizOutlinedIcon
                    sx={{ fontSize: 20, margin: 1, cursor: "pointer" }}
                />
            </div>

            <div>
                <img className="image-post" src={img} alt="" />
            </div>

            {/* <div className="buttons">
                <FavoriteBorderOutlinedIcon
                    className="button-icon"
                    sx={{ cursor: "pointer", marginRight: 1.5 }}
                />
                <AddCommentOutlinedIcon
                    className="button-icon"
                    sx={{ cursor: "pointer" }}
                />
            </div> */}

            <div className="description">
                <div className="user">{username}</div>
                <div className="captation">{captation}</div>
            </div>

            {comments.length > 0 && (
                <div className="comment-section">
                    {comments.map((comment) => (
                        <div className="comment-display" key={comment.data().id}>
                        <div className="comment-container" >
                            <img className="image" src={comment.data().userImg} alt="user-profile-photo" />
                            <div>
                                <span className="user-comment-name">{comment.data().username}</span> {comment.data().comment}
                            </div>
                        </div>
                        <div>
                            <Moment className="comment-date" fromNow>
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                        </div>
                    ))}
                </div>
            )}

            <form className="post-form">
                <div className="left-form">
                    <SentimentSatisfiedAltRoundedIcon
                        sx={{ cursor: "pointer", marginLeft: 0.8 }}
                    />
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="input-comm"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!comment}
                    onClick={send}
                    className="post-button"
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default Post;
