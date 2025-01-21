import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Homepage from "./pages/homepage";
import Cart from "./pages/cart";
import Summary from "./pages/summary";
import OrderReview from "./pages/orderReview";
import LoginPage from "./pages/loginPage"; // Tambahkan ini

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/login" element={<LoginPage />} /> {/* Tambahkan ini */}
        <Route path="/" element={localStorage.getItem("token") === null ? <Navigate to="/login" /> : <Homepage />} />
        <Route path="/cart" element={localStorage.getItem("token") === null ? <Navigate to="/login" /> : <Cart />} />
        <Route path="/summary" element={localStorage.getItem("token") === null ? <Navigate to="/login" /> : <Summary />} />
        <Route path="/order-review" element={localStorage.getItem("token") === null ? <Navigate  to="/login" /> : <OrderReview />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
