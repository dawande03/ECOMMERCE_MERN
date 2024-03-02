import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
//import "./Home.css"

<<<<<<< HEAD
const Product = ({product}) => {
  const options ={
    edit: false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value: product.ratings,
    isHalf:true,
    size: window.innerWidth < 600 ? 20 : 25
}

  return (
    <Link className='productCart' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/> <span>({product.numOfReviews} Reviews)</span>
        </div>  
=======
const options ={
    edit: false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value:2.5,
    isHalf:true,
    size: window.innerWidth < 600 ? 20 : 25
}
const Product = ({product}) => {
  return (
    <Link className='productCart' to={product._id}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/> <span>(256 Reviews)</span>
        </div>
>>>>>>> 71d636c5c85ccb323282f8eba8e30437c8349eec
        <span>{product.price}</span>
    </Link>
  )
}

export default Product  
