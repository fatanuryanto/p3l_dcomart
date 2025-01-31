import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Homepage from "./pages/homepage";
import Cart from "./pages/cart";
import Summary from "./pages/summary";
import OrderReview from "./pages/orderReview";
import LoginPage from "./pages/loginPage";
import Contact from "./components/contact";
import CaraBeli from "./components/howtobuy";
import InsertPage from "./components/insertItem";
import ShippingMethods from "./components/metodePengiriman";
import PaymentInfo from "./components/pembayaranInfo";
import AnekaNasi from "./pages/anekanasi";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={localStorage.getItem("token") === null ? <Navigate to="/login" /> : <Homepage />} />
        <Route path="/cart" element={localStorage.getItem("token") === null ? <Navigate to="/login" /> : <Cart />} />
        <Route path="/summary" element={localStorage.getItem("token") === null ? <Navigate to="/login" /> : <Summary />} />
        <Route path="/order-review" element={localStorage.getItem("token") === null ? <Navigate  to="/login" /> : <OrderReview />} />
        <Route path="/insert" element={localStorage.getItem("token") === null ? <Navigate to="/login" /> : <InsertPage />} />
        <Route path="/shipping-information" element={localStorage.getItem("token") === null ? <Navigate to="/login" /> : <ShippingMethods />} />
        <Route path="/PaymentInformation" element={localStorage.getItem("token") === null ? <Navigate to="/login" /> : <PaymentInfo />} />
        <Route path="/HowToBuy" element={localStorage.getItem("token") === null ? <Navigate to="/login" /> : <CaraBeli />} />
        <Route path="/ContactUs" element={localStorage.getItem("token") === null ? <Navigate to="/login" /> : <Contact />} />
        <Route path="/AnekaNasi" element={localStorage.getItem("token") === null ? <Navigate to="/login" /> : <AnekaNasi />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
