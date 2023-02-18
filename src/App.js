import { useState } from "react";
import Home from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Authentication from "./pages/AuthenticationPage";
import Register from "./pages/Register";
import PrivateRoute from "./pages/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateProfile from "./pages/UpdateProfile";
import Header from "./components/Header";
import { useAuth } from "./contexts/AuthContext";
import Menu from "./components/Menu";
import Feed from "./components/Feed";
import SearchedUserPage from "./pages/SearchedUserPage";
import RequestsPage from "./pages/RequestsPage";
import "./App.css";
import { About } from "./pages/About";
import RentalAdsPage from "./pages/RentalAdsPage";
import RentedFriends from "./pages/RentedFriends";
import FriendsMap from "./pages/FriendsMap";

const App = () => {
    const { currentUser, searchedUser } = useAuth();

    return (
        <BrowserRouter className="container">
            <div className={currentUser && "row"}>
                <Header />
                {currentUser && (
                    <div className="col col-lg-3">
                        <Menu />
                    </div>
                )}
                <div className={currentUser && "col col-lg-9"}>
                    <Routes>
                        <Route path={"/"} element={<Feed />} />
                        <Route
                            path={"/profile"}
                            element={
                                <PrivateRoute>
                                    <ProfilePage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path={"/profile/update-profile"}
                            element={
                                <PrivateRoute>
                                    <UpdateProfile />
                                </PrivateRoute>
                            }
                        />
                        <Route path={"/login"} element={<Authentication />} />
                        <Route path={"/register"} element={<Register />} />
                        <Route
                            path={"/reset-password"}
                            element={<ForgotPassword />}
                        />
                        <Route path={"/requests"} element={<RequestsPage />} />
                        <Route path={"/rental-ads"} element={<RentalAdsPage />} />
                        <Route path={"/profile/" + searchedUser.name} element={<SearchedUserPage />} />
                        <Route path={"rented-friends"} element={<RentedFriends />} />
                        <Route path={"/about-us"} element={<About />} />
                        <Route path={"/security"} element={<Home />} />
                        <Route path={"/contact"} element={<Home />} />
                        <Route path={"/friends-map"} element={<FriendsMap/>} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
