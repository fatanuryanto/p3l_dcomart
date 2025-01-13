import "./App.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import Cart from "./components/cart";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
