import axios from "axios";
import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/productConstants";
import {baseUrl} from "../../src/config"


export const getProduct = ({keyword="", currentPage =1}) => async (dispatch) => {
    console.log(keyword);
    try {
        dispatch({type: ALL_PRODUCT_REQUEST});
        const {data} = await axios.get(baseUrl + `products?keyword=${keyword}&page=${currentPage}`);
        
        dispatch(   {
            type: ALL_PRODUCT_SUCCESS,
            payload: data   
        })
       
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })

    }
};

export const getProductDetails = (id)=> async(dispatch)=>{
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(baseUrl + `product/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    }catch(error){
        dispatch({
           type: PRODUCT_DETAILS_FAIL,
           payload: error.response.data.message
        })
    }
}


// Clearing Errors
export const clearErrors = () => async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}