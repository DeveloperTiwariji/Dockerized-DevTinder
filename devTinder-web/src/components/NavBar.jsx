
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = ()=>{

  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const handleLogout = async ()=>{
    try{
      await axios.post(BASE_URL+"/logout", {}, {withCredentials: true});
      dispatch(removeUser());
      return nevigate("/login");
    }catch(err){
      console.error(err);
    }
  }

    return (
        <>
         <div className="navbar bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 shadow-[0_4px_20px_rgba(147,51,234,0.4)] sticky top-0 z-40 backdrop-blur-md bg-opacity-95 border-b border-white/10">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl text-white hover:scale-110 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-2xl">
      <span className="text-2xl transform hover:rotate-12 transition-transform duration-300">👩‍💻</span>
      <span className="font-bold text-white drop-shadow-lg">
        DevTinder
      </span>
    </Link>
  </div>
  {user && <div className="flex gap-2">
    <div className="form-control mt-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-inner">
      <span className="text-white font-medium">Welcome, <span className="font-bold drop-shadow-md">{user.firstName}</span></span>
    </div>
    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-white/50 hover:ring-4 hover:ring-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 transform hover:scale-110">
        <div className="w-10 rounded-full shadow-lg">
          <img
            alt="User Photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-white/95 backdrop-blur-xl rounded-2xl z-[1] mt-3 w-52 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-purple-100">
        <li>
          <Link to={"/profile"} className="justify-between hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 text-gray-700 font-medium rounded-xl transform hover:scale-105 transition-all duration-200">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </span>
            <span className="badge bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-md">New</span>
          </Link>
        </li>
        <li>
          <Link to={"/connections"} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 text-gray-700 font-medium rounded-xl transform hover:scale-105 transition-all duration-200">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Connections
            </span>
          </Link>
        </li>
        <li>
          <Link to={"/requests"} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 text-gray-700 font-medium rounded-xl transform hover:scale-105 transition-all duration-200">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Requests
            </span>
          </Link>
        </li>
        <div className="divider my-1"></div>
        <li>
          <Link to={"/"} onClick={handleLogout} className="text-red-600 hover:bg-red-50 font-medium rounded-xl transform hover:scale-105 transition-all duration-200 hover:shadow-md">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </span>
          </Link>
        </li>
      </ul>
    </div>
  </div>}
</div>
        </>
    )
}


export default Navbar;