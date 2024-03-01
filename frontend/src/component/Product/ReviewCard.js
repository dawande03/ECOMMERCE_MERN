import React, { useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import profilePng from "../../Images/Profile.png"

const ReviewCard = ({review}) => {
    useEffect(()=>{
        console.log("console check===========>");
    },[])
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth < 600 ? 20 : 25,
        value: review.ratings,
        isHalf:true,
    }
  return (
    <div className='reviewCard'>
      <img src={profilePng} alt='User'/>
      <p>{review.name}</p>
      <ReactStars {...options}/>
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
