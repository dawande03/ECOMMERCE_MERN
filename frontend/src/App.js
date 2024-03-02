import './App.css';
import { useEffect } from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/Footer/Footer.js";
import Home from "./component/Home/Home.js";
<<<<<<< HEAD
import ProductDetails from "./component/Product/ProductDetails.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from "webfontloader";
import ReviewCard from './component/Product/ReviewCard';
=======
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import WebFont from "webfontloader";
>>>>>>> 71d636c5c85ccb323282f8eba8e30437c8349eec


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
<<<<<<< HEAD
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route element={<ReviewCard/>}/>
=======
      <Route extact path="/" Component={Home}/>
>>>>>>> 71d636c5c85ccb323282f8eba8e30437c8349eec
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
