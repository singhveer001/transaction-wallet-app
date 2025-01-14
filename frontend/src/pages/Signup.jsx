import { useState ,useEffect} from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // Track errors
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
          navigate("/dashboard");
        }
      },[navigate])

    const handleSubmit = async () => {
        if (!firstName || !lastName || !username || !password) {
            setError("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username",`${response.data.firstName} ${response.data.lastName}`)
            navigate("/dashboard");
        } catch (err) {
            setError("Signup failed. Please try again.");
            console.error(err);  
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        label={"First Name"}
                    />
                    <InputBox
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        label={"Last Name"}
                    />
                    <InputBox
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="veer@gmail.com"
                        label={"Email"}
                    />
                    <InputBox
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        label={"Password"}
                        type="password"  
                    />
                    {error && <p className="text-red-500">{error}</p>} 
                    <div className="pt-4">
                        <Button onClick={handleSubmit} label={"Sign Up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    );
};
