import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useGoogleLogin } from '@react-oauth/google';

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

    const handleGoogleLogin = useGoogleLogin({
      onSuccess: async (codeResponse) => {
        try {
          // Get user info from Google
          const userInfoResponse = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
              headers: {
                Authorization: `Bearer ${codeResponse.access_token}`,
              },
            }
          );

          const googleUser = userInfoResponse.data;
          
          // Send to your backend for authentication
          const res = await axios.post(
            BASE_URL + "/auth/google", 
            {
              email: googleUser.email,
              firstName: googleUser.given_name,
              lastName: googleUser.family_name,
              photoUrl: googleUser.picture,
              googleId: googleUser.sub,
            }, 
            { withCredentials: true }
          );
          
          dispatch(addUser(res?.data?.data || res?.data));
          navigate("/");
        } catch (err) {
          console.error("Google login error:", err);
          setError(err.response?.data || "Google login failed. Please try again.");
        }
      },
      onError: () => {
        setError("Google login failed. Please try again.");
      },
    });

    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 relative overflow-hidden">
        {/* 3D Floating Background Elements */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>

        <div className="card bg-white/95 backdrop-blur-2xl w-full max-w-md shadow-[0_25px_70px_-15px_rgba(99,102,241,0.4)] rounded-3xl p-8 m-4 transform hover:scale-105 transition-all duration-300 hover:shadow-[0_30px_80px_-15px_rgba(168,85,247,0.5)] relative z-10 border-2 border-white/40">
          <div className="text-center mb-8">
            <div className="text-7xl mb-4 transform hover:scale-125 hover:rotate-12 transition-all duration-300 inline-block">👩‍💻</div>
            <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient mb-2">
              {isLogin ? "Welcome Back" : "Join DevTinder"}
            </h2>
            <p className="text-gray-600 mt-3 font-medium text-lg">
              {isLogin ? "Sign in to find your perfect match 💝" : "Create an account to get started 🚀"}
            </p>
          </div>
          
          <div className="space-y-5">
           {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div className="transform hover:scale-105 transition-transform duration-200">
                <label className="label">
                  <span className="label-text font-bold text-gray-700 text-sm">First Name</span>
                </label>
                <input 
                  type="text"
                  value={firstName}
                  className="input w-full bg-gradient-to-br from-white to-indigo-50 border-2 border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 rounded-xl shadow-sm text-gray-800 font-medium placeholder-gray-400 transition-all duration-200"
                  placeholder="John"
                  onChange={(e) =>setFirstName(e.target.value)}
                />
              </div>

              <div className="transform hover:scale-105 transition-transform duration-200">
                <label className="label">
                  <span className="label-text font-bold text-gray-700 text-sm">Last Name</span>
                </label>
                <input 
                  type="text"
                  value={lastName}
                  className="input w-full bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 rounded-xl shadow-sm text-gray-800 font-medium placeholder-gray-400 transition-all duration-200"
                  placeholder="Doe"
                  onChange={(e) =>setLastName(e.target.value)}
                />
              </div>
            </div>
           )}

              <div className="transform hover:scale-105 transition-transform duration-200">
                <label className="label">
                  <span className="label-text font-bold text-gray-700 text-sm">Email Address</span>
                </label>
                <input 
                  type="email"
                  value={email}
                  className="input w-full bg-gradient-to-br from-white to-pink-50 border-2 border-pink-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-200 rounded-xl shadow-sm text-gray-800 font-medium placeholder-gray-400 transition-all duration-200"
                  placeholder="you@example.com"
                  onChange={(e) =>setEmailId(e.target.value)}
                />
              </div>
  
              <div className="transform hover:scale-105 transition-transform duration-200">
                <label className="label">
                  <span className="label-text font-bold text-gray-700 text-sm">Password</span>
                </label>
                <input 
                  type="password"
                  value={password}
                  className="input w-full bg-gradient-to-br from-white to-rose-50 border-2 border-rose-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-200 rounded-xl shadow-sm text-gray-800 font-medium placeholder-gray-400 transition-all duration-200"
                  placeholder="••••••••"
                  onChange={(e) =>setPassswor(e.target.value)}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-600 font-semibold">OR</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button 
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-6 rounded-xl border-2 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3"
              onClick={() => handleGoogleLogin()}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
  
            {error && (
              <div className="alert bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 text-red-700 rounded-xl mt-4 shadow-lg transform hover:scale-105 transition-transform duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">{error}</span>
              </div>
            )}

            <button 
              className="btn w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white border-none rounded-xl py-4 text-lg font-bold shadow-[0_10px_30px_rgba(99,102,241,0.5)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.6)] transform hover:scale-105 active:scale-95 transition-all mt-6 relative overflow-hidden group" 
              onClick={isLogin ? handleLogin: handleSignUp}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLogin ? "Sign In 🚀" : "Create Account ✨"}
              </span>
            </button>
  
            <div className="text-center mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <p className="text-gray-700 font-medium">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all transform hover:scale-110 inline-block underline decoration-2 decoration-purple-400"
                  onClick={()=> setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign Up Now! 🎉" : "Sign In 👋"}
                </button>
              </p>
            </div>
        </div>
      </div>
    );
  }

  
  export default Login;
  