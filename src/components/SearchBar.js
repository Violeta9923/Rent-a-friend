import React, { useEffect, useState } from 'react'
import "./SearchBarStyle.css"
import {collection} from 'firebase/firestore'
import {db} from '../firebase-config'
import {onSnapshot} from 'firebase/firestore'
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'


const SearchBar = () => {
    const {setSelected, setSearchedUser, searchedUser, setLocation, currentUser} = useAuth()
    const [filteredData, setFilteredData] = useState([])
    const [typed, setTyped] = useState("")
    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate()

    useEffect(() => {
        setLocation(window.location.pathname)
    })

    useEffect(() => {
        const itemsArray = []
        const getUsers = onSnapshot(collection(db, 'users'), (querySnapshot) => {
            querySnapshot.forEach(doc => {
                if(doc.exists()) {
                    if(doc.data().id !== currentUser.uid) {
                        itemsArray.push(doc.data())
                    }
                }
                
            })
            setUsers(itemsArray)
            setLoading(false)
        })
    }, [db])



    const handleFilter = (event) => {
        const word = event.target.value
        setTyped(word)
        const newFilter = users.filter((element) => {
            return element.name.toLowerCase().includes(word.toLowerCase())
        })

        if(word === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }

    const clearSearchBar = () => {
        setFilteredData([])
        setTyped("")
    }

    const goToUserPage = (element) => {
        setFilteredData([])
        setTyped("")
        setSelected(-1)
        setSearchedUser(element)
        navigate("/profile/" + element.name)
    }

  return (
    <div className='search-container'>
        <div className='search-input'>
            <input 
                type="text"
                placeholder="Find a friend"
                value={typed}
                onChange={handleFilter}
            />
            <div className='search-icon'>
                {filteredData.length === 0 ? (
                    <PersonSearchOutlinedIcon />
                ) : (
                    <CloseOutlinedIcon style={{cursor: "pointer"}} onClick={clearSearchBar}/>
                )}
            </div>
        </div>
        {filteredData.length != 0  && (
            <div className='data-table'>
                {filteredData.slice(0, 10).map((element, key) => {
                    return(
                        <div className="link-item" key={element.id} onClick={() => goToUserPage(element)}>
                            <p>{element.name}</p>
                        </div>
                    )
                })}
            </div>
        )}
    </div>
  )
}

export default SearchBar