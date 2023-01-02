import * as React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { Home } from "./pages/Home";
import { createClient, Provider } from "urql";
import Login from "./pages/Login";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

export const App = () => (
  <Provider value={client}>
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);
