import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      navigate("/dashboard");
    }
  },[navigate])

  const handleSubmit = async () => {
    if ( !username || !password) {
      setError("Please fill out all fields.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
          username,
          password
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username",`${response.data.firstName} ${response.data.lastName}`)
      navigate("/dashboard");
    } catch (err) {
      setError("Signin failed. Please try again.");
      console.error(err);
    }
  };


  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="veer@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="pt-4">
            <Button onClick={handleSubmit} label={"Sign in"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
