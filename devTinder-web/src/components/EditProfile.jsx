import { useState } from "react";
import UserCart from "./UserCart";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user})=>{
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async ()=>{
        setError("");
        try{
            const res = await axios.patch(BASE_URL+"/profile/edit", {firstName, lastName, age, photoUrl, about,gender}, {withCredentials: true});
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(()=>{
                setShowToast(false);
            }, 3000);
        }catch(err){
            setError(err.response.data);
        }
    }

    return(
        <>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-8 relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 mb-2">
                        ✨ Edit Your Profile ✨
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg font-medium">Update your information and see the preview live</p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Edit Form Card */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-6 md:p-8 border border-purple-100 hover:shadow-purple-200/50 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-purple-100">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                                    Your Details
                                </h2>
                            </div>
                            
                            <div className="space-y-4">
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            👤 First Name
                                        </label>
                                        <input 
                                            type="text"
                                            value={firstName}
                                            className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800 font-medium"
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            👤 Last Name
                                        </label>
                                        <input 
                                            type="text"
                                            value={lastName}
                                            className="w-full px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-gray-800 font-medium"
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Photo URL */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        📸 Photo URL
                                    </label>
                                    <input 
                                        type="text"
                                        value={photoUrl}
                                        className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-gray-800 font-medium"
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />
                                </div>

                                {/* Age and Gender */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            🎂 Age
                                        </label>
                                        <input 
                                            type="number"
                                            value={age}
                                            className="w-full px-4 py-3 bg-orange-50 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800 font-medium"
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            ⚧️ Gender
                                        </label>
                                        <select 
                                            value={gender}
                                            className="w-full px-4 py-3 bg-violet-50 border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all text-gray-800 font-medium"
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* About Me */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        💬 About Me
                                    </label>
                                    <textarea 
                                        value={about}
                                        rows="4"
                                        className="w-full px-4 py-3 bg-cyan-50 border-2 border-cyan-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-gray-800 font-medium resize-none"
                                        placeholder="Tell us about yourself..."
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border-2 border-red-300 text-red-700 rounded-xl p-4 mt-4 flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-semibold">{error}</span>
                                </div>
                            )}

                            <button 
                                className="w-full mt-6 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2" 
                                onClick={saveProfile}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Save Profile
                            </button>
                        </div>
                    </div>
                    
                    {/* Preview Card */}
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-4">
                        <div className="bg-purple-100/50 backdrop-blur-sm rounded-2xl p-4 mb-4">
                            <div className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <h3 className="text-xl font-bold text-purple-700">👁️ Live Preview</h3>
                            </div>
                            <p className="text-center text-sm text-purple-600 mt-1">How others will see you</p>
                        </div>
                        
                        <UserCart 
                            user={{
                                firstName, 
                                lastName, 
                                photoUrl, 
                                age, 
                                about, 
                                gender
                            }} 
                        />
                    </div>
                </div>
            </div>
        </div>

        {showToast && (
            <div className="toast toast-top toast-center z-50">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-bold text-lg">✅ Profile saved successfully!</span>
                </div>
            </div>
        )}
        </>
    )
}

export default EditProfile;
