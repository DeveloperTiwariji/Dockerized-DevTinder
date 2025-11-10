import axios from "axios"
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCart from "./UserCart";

const Feed = ()=>{
    const dispatch = useDispatch();
    const feed = useSelector((store)=>store.feed);
    const user = useSelector((store)=>store.user);
    const [showWelcome, setShowWelcome] = useState(true);
    
    useEffect(()=>{
        const getFeed  = async()=>{
            try{
                const res = await axios.get(BASE_URL+"/feed", {withCredentials: true});
                dispatch(addFeed(res.data));

            }catch(err){
                console.error(err);
            }
        }
        getFeed();

        // Hide welcome message after 3 seconds
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 3000);

        return () => clearTimeout(timer);
    },[dispatch]);

    if(!feed) return;
    
    if(feed.length <=0){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="text-center">
                    <div className="mb-6">
                        <svg className="mx-auto h-24 w-24 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">No New Users Found</h1>
                    <p className="text-gray-600 text-lg">Check back later for more connections!</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-10">
            {/* Radhe Radhe Welcome Notification */}
            {showWelcome && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
                    <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
                        <span className="text-3xl">🙏</span>
                        <div>
                            <p className="text-xl font-bold">Radhe Radhe, {user?.firstName}!</p>
                            <p className="text-sm opacity-90">Welcome back to DevTinder</p>
                        </div>
                        <span className="text-3xl">🙏</span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex justify-center px-4">
                <UserCart key={feed[0]._id} user={feed[0]}/>
            </div>
        </div>
    );
}

export default Feed;