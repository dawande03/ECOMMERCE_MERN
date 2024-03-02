<<<<<<< HEAD
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            console.log("Error in ALL_PRODUCT_FAIL: 1", action.payload); // Log the error here
            return {
                loading: true,
                product: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            }

        case ALL_PRODUCT_FAIL: {
            console.log("Error in ALL_PRODUCT_FAIL:", action.payload); // Log the error here
            return {
                loading: false,
                error: action.payload
            }

        };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

=======
import {ALL_PRRODUCT_FAIL,ALL_PRRODUCT_REQUEST, ALL_PRRODUCT_SUCCESS} from  "../constants/productConstants";

export const productReducer = ((state = {products:[]}),(action)=>{
    switch(action.type){
        case ALL_PRRODUCT_REQUEST:
            return{
              loading:true,
              product:[]
            }
         case ALL_PRRODUCT_SUCCESS:
            return{
                loading:false,
                product:action.payload.products,
                productsCount:action.payload.productsCount
            }
            
        case ALL_PRRODUCT_FAIL:{
            return{
                loading:false,
                error: action.payload
            }
        }
        default:
            return state
    }
});
>>>>>>> 71d636c5c85ccb323282f8eba8e30437c8349eec
