import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/summary"
          element={
            <PrivateRoute>
              <Summary />
            </PrivateRoute>
          }
        />
        <Route
          path="/order-review"
          element={
            <PrivateRoute>
              <OrderReview />
            </PrivateRoute>
          }
        />
        <Route
          path="/insert"
          element={
            <PrivateRoute>
              <InsertPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/shipping-information"
          element={
            <PrivateRoute>
              <ShippingMethods />
            </PrivateRoute>
          }
        />
        <Route
          path="/PaymentInformation"
          element={
            <PrivateRoute>
              <PaymentInfo />
            </PrivateRoute>
          }
        />
        <Route
          path="/HowToBuy"
          element={
            <PrivateRoute>
              <CaraBeli />
            </PrivateRoute>
          }
        />
        <Route
          path="/ContactUs"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
        <Route
          path="/AnekaNasi"
          element={
            <PrivateRoute>
              <AnekaNasi />
            </PrivateRoute>
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
