import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";


export const PageRoutes = () => {
    return (
        <Routes>
            {
                routes.map((pageRoute, index) => {
                    return (
                        <Route key={index} path={pageRoute.path} element={pageRoute.element} />
                    )
                })
            }
        </Routes>
    )
}