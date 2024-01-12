import './App.css';
import { useEffect } from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import WebFont from "webfontloader";


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
      <Route extact path="/" Component={Home}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
