import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCart = ({user})=>{
  const dispatch = useDispatch();

  const handaleSendRequest = async (status, userId)=>{
    try{
      await axios.post(BASE_URL+"/request/send/"+ status+ "/"+ userId, {}, {withCredentials: true});
      dispatch(removeFeed(userId));
    }catch(err){
      console.error("Error sending request:", err);
      console.error("Error response:", err.response);
      // Show the actual error message from backend
      if(err.response?.data){
        if(typeof err.response.data === 'string'){
          alert(err.response.data);
        } else if(err.response.data.message){
          alert(err.response.data.message);
        } else {
          alert(JSON.stringify(err.response.data));
        }
      } else {
        alert("Failed to send request. Please try again.");
      }
    }
  }


    const {_id, firstName, lastName, photoUrl, age, about, gender} = user;
    return(
      <div className="w-full max-w-md mx-auto perspective-1000">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(147,51,234,0.5)]">
          {/* Profile Image with 3D Gradient Overlay */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={photoUrl}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              alt="User Photo"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-purple-900/30 to-transparent"></div>
            
            {/* 3D Floating Name Badge */}
            <div className="absolute bottom-6 left-6 right-6 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_32px_rgba(147,51,234,0.4)]">
                <h2 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <div className="flex items-center gap-2 text-white/95">
                    <span className="text-lg font-medium">{age} years old</span>
                    <span className="w-1.5 h-1.5 bg-white/95 rounded-full"></span>
                    <span className="text-lg capitalize font-medium">{gender}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3D About Section */}
          <div className="p-6 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">About Me</h3>
              </div>
              <p className="text-gray-700 leading-relaxed bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-inner">
                {about || "No description available"}
              </p>
            </div>

            {/* 3D Action Buttons with Depth */}
            <div className="flex gap-4">
              <button 
                className="flex-1 relative group overflow-hidden bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 text-white font-bold py-4 px-6 rounded-2xl shadow-[0_8px_20px_rgba(107,114,128,0.4)] transform hover:scale-105 hover:shadow-[0_12px_30px_rgba(107,114,128,0.6)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                onClick={() => handaleSendRequest("ignored", _id)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <svg className="w-6 h-6 relative z-10 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="relative z-10">Pass</span>
              </button>
              
              <button 
                className="flex-1 relative group overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 text-white font-bold py-4 px-6 rounded-2xl shadow-[0_8px_20px_rgba(236,72,153,0.5)] transform hover:scale-105 hover:shadow-[0_12px_30px_rgba(236,72,153,0.7)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                onClick={() => handaleSendRequest("interested", _id)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <svg className="w-6 h-6 relative z-10 transform group-hover:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="relative z-10">Like</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Floating Stats Pills */}
        <div className="flex justify-center gap-3 mt-8">
          <div className="bg-gradient-to-br from-white to-purple-50 backdrop-blur-md px-5 py-3 rounded-full shadow-[0_4px_15px_rgba(147,51,234,0.2)] transform hover:scale-110 hover:shadow-[0_6px_20px_rgba(147,51,234,0.3)] transition-all duration-300 border border-purple-100">
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">👨‍💻 Developer</span>
          </div>
          <div className="bg-gradient-to-br from-white to-pink-50 backdrop-blur-md px-5 py-3 rounded-full shadow-[0_4px_15px_rgba(236,72,153,0.2)] transform hover:scale-110 hover:shadow-[0_6px_20px_rgba(236,72,153,0.3)] transition-all duration-300 border border-pink-100">
            <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">🎯 Looking for Match</span>
          </div>
        </div>
      </div>
    )
}

export default UserCart;