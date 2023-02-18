import "./ForgotPasswordStyle.css";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {Link} from 'react-router-dom';

const ForgotPassword = () => {

    const emailRef = useRef();
    const {resetPassword, setLocation} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleClick = async (event) => {
        event.preventDefault()
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check yor email')
        } catch(error) {
            setError('Failed to reset password')
        }
        setLoading(false)
    };

    useEffect(() => {
        setLocation(window.location.pathname)
    })


    return(
        <div className="row login-form-container reset">
            <div className="col col-lg-5 login-left-side"></div>

            <div className="col col-lg-7">
                <div className="login-right-side">
                    <h3>Reset Password</h3>
                    <hr className="line" />
                    {error  && <div>{error}</div>}
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label>Username / Email</label>
                            <input
                                type="email"
                                className="form-control"
                                ref={emailRef}
                            />
                        </div>
                        <button
                            disabled={loading}
                            className="btn signin"
                            onClick={handleClick}
                        >
                            Reset
                        </button>
                    </form>
                    <span className="signup-link">
                        Don't have an account? Sign up{" "}
                        <Link to="/register" style={{color: "4A3667"}}>here</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;