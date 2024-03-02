import {createStore,combineReducers,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
<<<<<<< HEAD
import { productDetailsReducer, productReducer } from "./reducers/productReducer";

const reducer = combineReducers({
products: productReducer,
produtDetails: productDetailsReducer
=======

const reducer = combineReducers({

>>>>>>> 71d636c5c85ccb323282f8eba8e30437c8349eec
});

let initialState={};

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;