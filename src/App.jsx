import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import VerifyEmail from "./VerifyEmail";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import AddProducts from "./AddProducts";
import Account from "./Account";
import Cart from "./Cart";
import PaymentForm from "./PaymentForm";

import { AuthContext } from "./AuthContext";
import React, { useContext, useState } from "react";

import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme } from "./themes";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const GlobalStyle = createGlobalStyle`
  body, html, #root, .App {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: ${(props) =>
      props.theme.bgcolor};  remove this to fix the bg color
    color: ${(props) => props.theme.text};
  }

  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    color: ${(props) => props.theme.text}!important;
  }
`;

  const [theme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  // Get isLoggedIn from AuthContext
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      {/* Wrap the Routes with AuthProvider */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify_your_email/:token" element={<VerifyEmail />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
        <Route path="/add_products" element={<AddProducts />} />
        <Route
          path="/account"
          element={!isLoggedIn ? <Navigate to="/" replace /> : <Account />}
        />
        <Route
          path="/account/cart"
          element={!isLoggedIn ? <Navigate to="/" replace /> : <Cart />}
        />
        <Route
          path="/payment"
          element={
            isLoggedIn ? <Navigate to="/login" replace /> : <PaymentForm />
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
