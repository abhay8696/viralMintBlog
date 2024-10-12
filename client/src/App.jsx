import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

function App() {
    //functions
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
