import "./RegisterStyle.css";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const { register } = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
    );
    const [photoURL, setPhotoURL] = useState();
    const navigate = useNavigate();

    const [dataUser, setDataUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        birthday: "",
        age: "",
        gender: "",
        city: "",
        about: "",
    });

    const signup = async (event) => {
        event.preventDefault();
        if (dataUser.password !== dataUser.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await register(dataUser, photoURL);
            navigate("/profile");
        } catch (error) {
            setError("Failed to create an account");
        }
        setLoading(false);
    };

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

    return (
        <div className="register-container">
            <h2>CREATE ACCOUNT</h2>

            <form onSubmit={signup}>
                <section className="first-section">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        required={true}
                        value={dataUser.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required={true}
                        value={dataUser.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        className="hidden"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required={true}
                        value={dataUser.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className="hidden"
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your Password"
                        required={true}
                        value={dataUser.confirmPassword}
                        onChange={handleChange}
                    />
                    <label htmlFor="birthDay">Birthday</label>
                    <input
                        id="birthday"
                        type="date"
                        name="birthday"
                        placeholder="Birthday"
                        required={true}
                        value={dataUser.birthday}
                        onChange={handleChange}
                    />
                    <label htmlFor="Age">Age</label>
                    <input
                        id="age"
                        type="number"
                        name="age"
                        placeholder="Age"
                        required={true}
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
                        placeholder="City"
                        required={true}
                        value={dataUser.city}
                        onChange={handleChange}
                    />
                </section>

                <section className="second-section">
                    <label htmlFor="photo">Profile Photo</label>
                    <img className="register-photo" src={photo} />
                    <div>
                        <input type="file" onChange={handleChange} />
                    </div>
                    <label htmlFor="aboutYou">About You</label>
                    <input
                        id="aboutYou"
                        type="text"
                        name="about"
                        placeholder="Hobbys, interests, etc..."
                        required={false}
                        value={dataUser.about}
                        onChange={handleChange}
                        aria-rowcount={4}
                    />
                    <span className="login-link">
                        Already have an account? Log in{" "}
                        <Link to="/login">here</Link>
                    </span>
                    <input type="submit" disabled={loading} />
                    <div className="register-error">{error}</div>
                </section>
            </form>
        </div>
    );
};

export default Register;
