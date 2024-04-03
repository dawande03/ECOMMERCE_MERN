import './App.css';
import { useEffect } from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from "webfontloader";
import ReviewCard from './component/Product/ReviewCard';
import Products from './component/Product/Products';
import Search from './component/Product/Search.js';

 
function App() {
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, []);
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route  path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route element={<ReviewCard/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
