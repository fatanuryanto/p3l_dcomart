import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import Cart from "./components/cart";
import Summary from "./components/summary";
import OrderReview from "./components/orderReview";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/order-review" element={<OrderReview />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
