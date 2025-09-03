import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useVerifyUser } from "../hooks/verifyUser";
import LogoutButton from "./LogoutButton";

function Navigation(){
    const { user,setUser } = useContext(UserContext);
    useVerifyUser("/game");

    return(
        <div className="navigation-panel">
            <h1>Navigate {user}</h1>
            <LogoutButton> </LogoutButton>
        </div>
    )
}

export default Navigation;