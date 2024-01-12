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