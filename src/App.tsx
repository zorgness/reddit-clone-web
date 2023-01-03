import { ChakraProvider, theme } from "@chakra-ui/react";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePassword from "./pages/change-password/[token]";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home pageProps={undefined} />} />
        <Route path="/register" element={<Register pageProps={undefined} />} />
        <Route path="/login" element={<Login pageProps={undefined} />} />
        <Route
          path="/change-password/:token"
          element={<ChangePassword token={""} />}
        />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
