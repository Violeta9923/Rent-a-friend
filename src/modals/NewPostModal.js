import React, { useState, useEffect } from "react";
import "./NewPostModalStyle.css";
import { useAuth } from "../contexts/AuthContext";
import moment from "moment";
import { serverTimestamp } from "firebase/firestore";

const NewPostModal = ({ setShowModal }) => {
    const { currentUser, sendPost } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({
        user: currentUser.uid,
        text: "",
        photo: "",
        date: serverTimestamp()
    });
    const [photo, setPhoto] = useState(
      "https://icon-library.com/images/upload-photo-icon/upload-photo-icon-23.jpg"
  );

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            setError("");
            setLoading(true);
            sendPost(post);
        } catch (error) {
            setError("Failed to send the post");
        }
        setLoading(false);
        setShowModal(false);
    };

    const handleChange = (event) => {
        let value = "";
        if (event.target.type === "file") {
          const reader = new FileReader();
          reader.onload = () => {
              if (reader.readyState === 2) {
                  setPhoto(reader.result);
              }
          };
          reader.readAsDataURL(event.target.files[0]);
          value = event.target.files[0];
      } else {
          value = event.target.value;
      }
        const name = event.target.name;
        setError("");
        setPost((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="row new-post-modal-container">
            <div className="col col-lg-5 new-post-modal-left-side"></div>

            <div className="col col-lg-7">
                <div className="new-post-modal-right-side">
                    <h3>Post</h3>
                    <hr className="line" />
                    {error && <div>error</div>}
                    <form onSubmit={handleClick} className="form-horizontal">
                        <div className="form-group">
                            <label>Text</label>
                            <input
                                required={true}
                                type="text"
                                name="text"
                                className="form-control"
                                value={post.text}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="post-photo-container">
                        {/* <label htmlFor="photo">Photo</label> */}
                            <img className="post-photo" src={photo} />
                            
                                <input name="photo" type="file" onChange={handleChange} />
                            </div>

                        <div className="buttons">
                            <button
                                disabled={loading}
                                className="cancel-btn"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                disabled={loading}
                                className="btn"
                                onClick={handleClick}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewPostModal;
