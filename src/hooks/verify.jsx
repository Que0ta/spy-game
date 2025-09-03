import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function verifyUser(directTO) {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:2000/dashboard", {
      method: "GET",
      credentials: "include", // send cookie
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate(directTO); // user is logged in, redirect
        }
      })
      .catch((err) => {
        console.log("Not logged in", err);
        navigate('/');
      });
  }, [navigate]);
}

export default verifyUser;
