import React from "react";
import NewPost from "./NewPost";
import Posts from "./Posts";
import Suggestions from "./Suggestions";
import "./FeedStyle.css"

const Feed = ({showModal, setShowModal}) => {
    return (
        <div className={showModal ? "disabled-container container" : "container"}>
            <div className="row">
                <div className="col col-lg-8">
                    <NewPost showModal={showModal} setShowModal={setShowModal}/>
                    <Posts />
                </div>
                <div className="col col-lg-4 suggestions-container">
                    <Suggestions showModal={showModal}/>
                </div>
            </div>
        </div>
    );
};

export default Feed;
