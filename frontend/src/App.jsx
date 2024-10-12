import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import ProtectedProvider from "./provider/ProtectedProvider";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route 
          path="/dashboard" 
          element={
            <ProtectedProvider>
              <Dashboard />
            </ProtectedProvider>
          } 
        />          
        <Route path="/send" element={
          <ProtectedProvider>
          <SendMoney />
          </ProtectedProvider>
          } />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App