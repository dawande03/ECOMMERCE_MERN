import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import "./ProductDetails.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import { Slide } from '@mui/material';
import ReviewCard from './ReviewCard';

const ProductDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {product, loading, error} = useSelector(state=>state.produtDetails);
    console.log("product=====>",product);
    useEffect(()=>{
        dispatch(getProductDetails(id))
    },[dispatch, id]);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf:true,
    }
  return (
<Fragment>
    <div className='ProductDetails'>
        <div>
            <Carousel>
                {product.images &&
                    product.images.map((item,i)=>{
                        return(
                            <img
                            className='CarouselImage'
                            key={item.url}
                            src={item.url}
                            alt={`${i} Slide`}/>
                        )
                    })
                }
            </Carousel>
        </div>
        <div>
            <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
            </div>
            <div className='detailsBlock-2'>
                <ReactStars {...options}/>
                <span>({product.numOfReviews} Reviews)</span>
            </div>
            <div className='detailsBlock-3'>
                <h1>{`${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                    <div className='detailsBlock-3-1-1'>
                        <button>-</button>
                        <input value='1' type='number'/>
                        <button>+</button>
                    </div>{""}
                    <button>Add to Cart</button>
                </div>
                <p>
                    Status:{""}
                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                </p>
            </div>
            <div className='detailsBlock-4'>
                Description : <p>{product.description}</p>
            </div>
            <button className='submitReview'>Submit Review</button>
        </div>
    </div>
    {console.log("product reviews===>",product.reviews)}
    {product.reviews && product.reviews[0] ? (
        <div className='reviews'>
        {
            product.reviews && product.reviews.map((review)=><ReviewCard review={review} />)
        }
        </div>
    ):(<p className='noReviews'>No Reviews yet</p>)}
</Fragment>
  ) 
}

export default ProductDetails
