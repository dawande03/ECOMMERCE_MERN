import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg';
import "./Home.css"
import ProductCard from "./ProductCard.js";
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';


// const product={
//     name:"Blue Tshirt",
//     images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
//     price:"$3000",
//     _id:"shubham"
// }

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const data = useSelector(state => state.products);
    const { loading, error, products, productsCount } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);
    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>
                        <MetaData title="ECOMMERCE" />
                        <div className='banner'>
                            <p>Welcome to Ecommerce</p>
                            <h1>FIND AMAZING PRODUCTS BELOW</h1>
                            <a href="#container">
                                <button>
                                    Scroll <CgMouse />
                                </button>
                            </a>
                        </div>
                        <h2 className='homeHeading'>Featured Products</h2>
                        <div className='container' id='container'>
                            {products && products.map(product => (
                                <ProductCard product={product} />
                            ))}
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default Home
