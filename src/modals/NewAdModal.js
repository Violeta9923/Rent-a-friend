import React, { useState, useEffect } from "react";
import "./NewAdModalStyle.css";
import { useAuth } from "../contexts/AuthContext";
import moment from "moment";
import { serverTimestamp } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { onSnapshot } from "firebase/firestore";

const NewAdModal = ({ setShowModal }) => {
    const { currentUser, sendRentAd, updateCityCount } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [ad, setAd] = useState({
        user: currentUser.uid,
        text: "",
        date: serverTimestamp(),
        city: "",
    });
    const [photo, setPhoto] = useState(
        "https://icon-library.com/images/upload-photo-icon/upload-photo-icon-23.jpg"
    );

    const [cities, setCities] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [typed, setTyped] = useState("");
    const [chosenCity, setChosenCity] = useState("")

    useEffect(() => {
        const itemsArray = [];
        const getUsers = onSnapshot(
            collection(db, "cities"),
            (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    itemsArray.push(doc.data());
                });
                setCities(itemsArray);
                setLoading(false);
            }
        );
    }, [db]);

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            setError("");
            setLoading(true);
            await sendRentAd(ad);
            await updateCityCount(chosenCity)
        } catch (error) {
            setError("Failed to send the ad");
        }
        setLoading(false);
        setShowModal(false);
    };

    const handleCity = (element) => {
        setAd((prevState) => ({
            ...prevState,
            city: element.name,
        }));
        setFilteredData([])
        setTyped(element.name)
        setChosenCity(element)
    }

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setError("");
        setAd((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFilter = (event) => {
        const word = event.target.value;
        setTyped(word);
        const newFilter = cities.filter((element) => {
            return element.name.toLowerCase().includes(word.toLowerCase());
        });

        if (word === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    return (
        <div className="row new-post-modal-container">
            <div className="col col-lg-5 new-post-modal-left-side"></div>

            <div className="col col-lg-7">
                <div className="new-post-modal-right-side">
                    <h3>Rental Ad</h3>
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
                                value={ad.text}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                required={true}
                                type="text"
                                name="city"
                                className="form-control"
                                value={typed}
                                onChange={handleFilter}
                            />
                        </div>
                        {filteredData.length != 0 && (
                            <div className="data-table">
                                {filteredData
                                    .slice(0, 10)
                                    .map((element, key) => {
                                        return (
                                            <div
                                                className="link-item"
                                                key={key}
                                                onClick={() =>
                                                    handleCity(element)
                                                }
                                            >
                                                <p>{element.name}</p>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}

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

export default NewAdModal;
