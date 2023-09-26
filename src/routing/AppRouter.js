import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Movies } from "../pages/Movies";

export function AppRouter(){
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/customers"/>
            <Route path="/reports"/>
        </Routes>
    </BrowserRouter>
}