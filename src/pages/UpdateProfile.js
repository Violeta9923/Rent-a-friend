import "./UpdateProfileStyle.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {Link, useNavigate} from 'react-router-dom'
import { db } from "../firebase-config";
import {
    doc,
    onSnapshot,
} from "firebase/firestore";

const UpdateProfile = () => {

    const { currentUser, updateUser, setLocation } = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const [photoURL, setPhotoURL] = useState();
    // const [userData, setUserData] = useState({});
    useEffect(() => {
        setLocation(window.location.pathname)
    })


    const [dataUser, setDataUser] = useState({
        // email: userData.email,
        // name: userData.name,
        // birthday: userData.birthday,
        // age: userData.age,
        // gender: userData.gender,
        // city: userData.city,
        // about: userData.about,
        email: "",
        name: "",
        birthday: "",
        age: "",
        gender: "",
        city: "",
        about: "",
    });
    const [photo, setPhoto] = useState(
        dataUser.photo
    );

    const update = async(event) => {
        event.preventDefault()
        
        try {
            setError("");
            setLoading(true);
            updateUser(dataUser, photoURL);
        } catch (error) {
            setError("Failed to update the account");
            console.log(error.message)
        }
        setLoading(false);
    };

    useEffect(() => {
        const dataGet = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            // setUserData(doc.data());
            // console.log(userData)
            // setez poza si genul separat ca altfel nu se sincronizeaza
            setPhoto(doc.data().photo)
            setDataUser((prevState) => ({
                ...prevState,
                "email": doc.data().email,
                "name": doc.data().name,
                "birthday": doc.data().birthday,
                "age": doc.data().age,
                "gender": doc.data().gender,
                "city": doc.data().city,
                "about": doc.data().about
            }));
            console.log(dataUser)
        });
    }, [db]);


    const handleChange = (event) => {
        let value = "";
        if (event.target.type === "checkbox") {
            value = event.target.checked;
        } else if (event.target.type === "file") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPhoto(reader.result);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
            setPhotoURL(event.target.files[0]);
        } else {
            value = event.target.value;
        }
        const name = event.target.name;
        setError("");
        setDataUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {}, [photo]);

    return(
        <div className="update-container">
            <div className="update-logo"></div>
            <h2>UPDATE PROFILE</h2>

            <form onSubmit={(event) => update(event)}>
                <section className="first-section">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder={dataUser.name}
                        value={dataUser.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder={dataUser.email}
                        value={dataUser.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="birthDay">Birthday</label>
                    <input
                        id="birthday"
                        type="text" 
                        name="birthday"
                        placeholder={dataUser.birthday}
                        value={dataUser.birthday}
                        onChange={handleChange}
                    />
                    <label htmlFor="Age">Age</label>
                    <input
                        id="age"
                        type="number"
                        name="age"
                        placeholder={dataUser.age}
                        value={dataUser.age}
                        onChange={handleChange}
                    />
                    <label>Gender</label>
                    <div className="multiple-input">
                        <input
                            id="man-gender"
                            type="radio"
                            name="gender"
                            value="man"
                            onChange={handleChange}
                            checked={dataUser.gender === "man"}
                        />
                        <label htmlFor="man-gender">Man</label>
                        <input
                            id="woman-gender"
                            type="radio"
                            name="gender"
                            value="woman"
                            onChange={handleChange}
                            checked={dataUser.gender === "woman"}
                        />
                        <label htmlFor="woman-gender">Woman</label>
                        <input
                            id="other-gender"
                            type="radio"
                            name="gender"
                            value="other"
                            onChange={handleChange}
                            checked={dataUser.gender === "other"}
                        />
                        <label htmlFor="other-gender">Prefer not to say</label>
                    </div>

                    <label htmlFor="City">City</label>
                    <input
                        id="city"
                        type="text"
                        name="city"
                        placeholder={dataUser.city}
                        value={dataUser.city}
                        onChange={handleChange}
                    />
                    <label htmlFor="aboutYou">About You</label>
                    <input
                        id="aboutYou"
                        type="text"
                        name="about"
                        placeholder={dataUser.about}
                        required={false}
                        value={dataUser.about}
                        onChange={handleChange}
                        aria-rowcount={4}
                    />
                </section>

                <section className="second-section">
                    <label htmlFor="photo">Profile Photo</label>
                    <img className="update-photo" src={photo} />
                    <div>
                        <input type="file" onChange={handleChange} />
                    </div>
                    

                    <input type="submit" disabled={loading} />
                    <div className="update-error">{error}</div>
                </section>
            </form>
        </div>
    )
}

export default UpdateProfile;