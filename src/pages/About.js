import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import "./AboutStyle.css"

export const About = () => {

    const {setLocation} = useAuth()

    useEffect(() => {
        setLocation(window.location.pathname)
    })


  return (
    <div className='about-container'>
      <div className='about-logo'>
      </div>
      <div className='about-title'>Rent a friend</div>
      <div className='about-item'>Rent a friend este o aplicatie web pentru inchirierea prietenilor online</div>
      <div className='about-item'>Platforma pune la dispozitie utilizatorilor un mediu de socializare cu posibilitatea publicarii postarilor sau a anunturilor de inchiriere </div>
      <div className='about-item'>Pentru validarea unui utilizator, datele introduse sunt verificate</div>
    </div>
  )
}
