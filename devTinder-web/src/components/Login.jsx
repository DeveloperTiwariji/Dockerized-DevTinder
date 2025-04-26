import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [email, setEmailId] = useState("");
    const [password, setPassswor] = useState("");
    const [error, setError] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async ()=>{
       try{ 
        const res = await axios.post(BASE_URL+"/login", {email,password}, {withCredentials: true})
        dispatch(addUser(res?.data)); 
        return navigate("/");
    }catch(err){
       setError(err.response.data || "Something went wrong");
        
    }
    }



    const handleSignUp = async ()=>{
      try{
        const res = await axios.post(BASE_URL+"/signup", {firstName, lastName, email, password}, {withCredentials: true});
        dispatch(addUser(res?.data?.data)); 
        return navigate("/profile");
      }catch(err){
      setError(err.response.data || "Something went wrong");
    }
  }

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="card bg-white w-96 shadow-lg rounded-lg p-6">
          <div className="card-body">
            <h2 className="card-title text-center text-2xl font-semibold text-gray-700">{isLogin ? "Login" : "Sign up"}</h2>
            
            <div className="mt-4">
           {!isLogin && <> <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-gray-600">FirstName</span>
                </div>
                <input 
                  type="email"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>setFirstName(e.target.value)}
                />
              </label>


              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-gray-600">LastName</span>
                </div>
                <input 
                  type="email"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>setLastName(e.target.value)}
                />
              </label> </>}


              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-gray-600">Email ID</span>
                </div>
                <input 
                  type="email"
                  value={email}
                  className="input input-bordered w-full max-w-xs focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>setEmailId(e.target.value)}
                />
              </label>
  
              <label className="form-control w-full max-w-xs mt-3">
                <div className="label">
                  <span className="label-text text-gray-600">Password</span>
                </div>
                <input 
                  type="password"
                  value={password}
                  className="input input-bordered w-full max-w-xs focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>setPassswor(e.target.value)}
                />
              </label>
            </div>
  
            <div className="card-actions justify-center mt-4">
              <p className="text-red-600">{error}</p>
              <button className="btn btn-primary w-full hover:bg-blue-600 " onClick={isLogin ? handleLogin: handleSignUp}>{isLogin ?"Login": "SignUp"}</button>
            </div>
  
            <p className="text-center text-sm text-blue-800 mt-3 cursor-pointer " onClick={()=> setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
             {isLogin?  "Sign up":"Login"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  
  export default Login;
  