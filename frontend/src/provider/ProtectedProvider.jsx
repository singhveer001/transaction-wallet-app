import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedProvider = ({children}) => {
    const [protectedRoute,setProtectedRoute] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); 
    
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setProtectedRoute(true);
            if(location.pathname === "/"){
                navigate("/dashboard")
            }
        }
        else{
            navigate("/signin")
        }
    },[navigate,location])

    return (
        protectedRoute && children
  )
}

export default ProtectedProvider