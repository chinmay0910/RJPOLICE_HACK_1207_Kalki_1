import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from '../Homepage'
import { Form } from '../modules/signup/Form';

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="/account/signin" element={<Form isSignInPage={true} />} />
                <Route exact path="/account/signup" element={<Form isSignInPage={false} />} />
            </Routes>

            <Homepage />

        </>
    )
} 