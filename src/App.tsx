import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePassword from "./pages/change-password/[token]";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Register from "./pages/Register";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home pageProps={undefined} />} />
      <Route path="/post/:id" element={<Post pageProps={undefined} />} />
      <Route
        path="/post/edit/:id"
        element={<EditPost pageProps={undefined} />}
      />
      <Route path="/register" element={<Register pageProps={undefined} />} />
      <Route path="/login" element={<Login pageProps={undefined} />} />
      <Route
        path="/create-post"
        element={<CreatePost pageProps={undefined} />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword pageProps={undefined} />}
      />
      <Route
        path="/change-password/:token"
        element={<ChangePassword token={""} pageProps={undefined} />}
      />
    </Routes>
  </BrowserRouter>
);
