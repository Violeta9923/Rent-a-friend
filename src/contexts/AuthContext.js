import React, {useState, useContext, useEffect} from 'react';
import {auth, db, storage} from '../firebase-config'
import {createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth"
import {setDoc, deleteDoc, updateDoc, doc, onSnapshot, getDocFromServer, getDoc, addDoc, FieldValue, Timestamp, serverTimestamp} from 'firebase/firestore'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {collection} from 'firebase/firestore'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider =  ({children}) => {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(() => {
        const getSelected = window.localStorage.getItem('selected-menu-item')
        return getSelected ? JSON.parse(getSelected) : 0
    });
    const [searchedUser, setSearchedUser] =useState(() => {
        const getSearchedUser = window.localStorage.getItem('searched-user')
        return getSearchedUser ? JSON.parse(getSearchedUser) : {}
    })

    const [location, setLocation] = useState(window.location.pathname)

    const register = async(user, photo) => {
        await createUserWithEmailAndPassword(auth, user.email, user.password)
        const id = auth.currentUser.uid
        let photoURL = ""
        if(photo) {
            const fileRef = ref(storage, 'images/' + id + '.png')
            setLoading(true)
            await uploadBytes(fileRef, photo)
            photoURL = await getDownloadURL(fileRef)
            await updateProfile(auth.currentUser, {photoURL: photoURL})
            setLoading(false)
        }
        await setDoc(doc(db, 'users', id), {
            id: id,
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            age: user.age,
            gender: user.gender,
            city: user.city,
            about: user.about,
            photo: photoURL,
            timestamp : serverTimestamp()
        })
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const updateUser = async ( user, photo) => {
        const id = auth.currentUser.uid
        const currentUserDocRef = doc(db, 'users', id)
        let photoURL = currentUser.photoURL

        if(photo) {
            const fileRef = ref(storage, 'images/' + id + '.png')
            setLoading(true)
            await uploadBytes(fileRef, photo)
            photoURL = await getDownloadURL(fileRef)
            await updateProfile(auth.currentUser, {photoURL: photoURL})
            setLoading(false)
        }
        await updateDoc(currentUserDocRef, {
            id: id,
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            age: user.age,
            gender: user.gender,
            city: user.city,
            about: user.about,
            photo: photoURL
        })
    }

    const sendFriendRequest = async (request) => {
        const docRef = await doc(collection(db, "friend-requests"))
        await setDoc(docRef, {
            ...request,
            id: docRef.id
        })
    }

    const changeRequestState = async (request, newState) => {
        let newAccepted = 0
        if(newState === "accept") {
            newAccepted = 1
        } else if(newState === "deny") {
            newAccepted = 2
        }

        const requestRef = doc(db, "friend-requests", request);

        await updateDoc(requestRef, {
            accepted: newAccepted
          });
    }

    const addRentedFriend = async (sender, receiver, date) => {
        const docRef = await doc(collection(db, "rented-friends"))
        await setDoc(docRef, {
            sender: sender,
            receiver: receiver,
            date: date,
            id: docRef.id
        })
    }

    const deleteRequest = async (request) => {
        const requestRef = doc(db, "friend-requests", request);
        await deleteDoc(requestRef, request)
    }

    const sendPost = async (post) => {
        const docRef = await doc(collection(db, "posts"))
        let photoURL = ""
        if(post.photo) {
            const fileRef = ref(storage, 'posts-images/' + docRef.id + '.png')
            setLoading(true)
            await uploadBytes(fileRef, post.photo)
            photoURL = await getDownloadURL(fileRef)
            setLoading(false)
        }
        await setDoc(docRef, {
            ...post,
            photo: photoURL,
            id: docRef.id
        })
    }

    const sendRentAd = async (ad) => {
        const docRef = await doc(collection(db, "ads"))
        await setDoc(docRef, {
            ...ad,
            id: docRef.id
        })
    }

    const deleteRentAd = async (ad) => {
        const adRentRef = doc(db, "ads", ad);
        await deleteDoc(adRentRef, ad)
    }

    const sendComment = async (comment) => {
        const docRef = await doc(collection(db, "comments"))
        await setDoc(docRef, {
            ...comment,
            id: docRef.id
        })
    }

    const updateCityCount = async (city) => {
        const docRef = doc(db, "cities", city.id)
        const docSnap = await getDoc(docRef)
        const newCount = docSnap.data().count + 1
        await updateDoc(docRef, {
            count: newCount
        })
    }

    useEffect(() => {
        window.localStorage.setItem('selected-menu-item', JSON.stringify(selected))
    }, [selected])

    useEffect(() => {
        window.localStorage.setItem('searched-user', JSON.stringify(searchedUser))
    }, [searchedUser])

    useEffect(() => {
        // check if the user is logged in or not
        // just once at the beginning
        const unsubscribe = onAuthStateChanged(auth, user => {  
        setCurrentUser(user)
        setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        register, 
        login,
        logout,
        resetPassword,
        updateUser, 
        selected,
        setSelected,
        searchedUser,
        setSearchedUser,
        location,
        setLocation,
        sendFriendRequest,
        sendPost,
        sendComment,
        sendRentAd,
        changeRequestState,
        deleteRequest,
        addRentedFriend,
        updateCityCount,
        deleteRentAd
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}