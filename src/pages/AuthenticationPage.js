import "./AuthenticationStyle.css";
import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Authentication = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/profile");
        } catch (error) {
            console.log(error.message);
            setError("Failed to sign in");
        }
        setLoading(false);
    };

    return (
        <div className="row login-form-container" id="login-page">
            <div className="col col-lg-5 login-left-side"></div>

            <div className="col col-lg-7">
                <div className="login-right-side">
                    <h3>Login</h3>
                    <hr className="line" />
                    {error  && <div>error</div>}
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label>Username / Email</label>
                            <input
                                type="email"
                                className="form-control"
                                ref={emailRef}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                ref={passwordRef}
                            />
                        </div>
                        <button
                            disabled={loading}
                            className="btn signin"
                            onClick={handleClick}
                        >
                            Login
                        </button>
                        <div className="options">
                        <div className="remember-me">
                            <input type="checkbox" className="checkbox" />
                            <span className="check-label">Remember Me</span>
                        </div>
                        <Link to="/forgot-password" style={{color: "gray", fontSize: 14}} className="forgot">
                            Forgot Password
                        </Link>
                        </div>
                    </form>
                    <span className="signup-link">
                        Don't have an account? Sign up{" "}
                        <Link to="/register" style={{color: "4A3667"}}>here</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
