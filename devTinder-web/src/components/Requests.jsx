import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestsSlice";

const Requests = ()=>{

    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);

    const reviewRequest = async (status, _id)=>{
        try{
            await axios.post(BASE_URL+"/request/review/"+status+"/"+_id, {}, {withCredentials: true});
            dispatch(removeRequest(_id));
        }catch(err){
            console.error(err);
        }
    }





    const fetchRequests = async ()=>{
        try{
            const res = await axios.get(BASE_URL+"/user/requests/received", {withCredentials: true});
            dispatch(addRequest(res.data.data));

        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(!requests) return;

    if(requests.length === 0){
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600 mb-2">No Pending Requests</h2>
                    <p className="text-gray-600 text-lg">You're all caught up! Check back later.</p>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-8 px-4 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg mb-4">
                        <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
                            Connection Requests
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg font-medium">{requests.length} {requests.length === 1 ? 'Person' : 'People'} want to connect with you 💝</p>
                </div>

                {/* Requests Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {requests.map((request) => {
                        const { firstName, lastName, photoUrl, age, gender, about, _id } = request.fromeUserId;
                        return (
                            <div 
                                key={_id} 
                                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-rose-100"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    {/* Profile Image */}
                                    <div className="flex-shrink-0">
                                        <div className="w-24 h-24 rounded-full ring-4 ring-rose-200 ring-offset-2 overflow-hidden">
                                            <img 
                                                alt={firstName} 
                                                className="w-full h-full object-cover" 
                                                src={photoUrl} 
                                            />
                                        </div>
                                    </div>
            
                                    {/* User Details */}
                                    <div className="flex-1 min-w-0">
                                        <h2 className="font-bold text-xl text-gray-800 capitalize mb-1">
                                            {firstName + " " + lastName}
                                        </h2>
                                        {age && gender && (
                                            <p className="text-sm text-rose-600 font-semibold mb-2">
                                                {age} • {gender}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {about}
                                        </p>
                                    </div>
                                </div>
            
                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-rose-100">
                                    <button 
                                        className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                                        onClick={() => reviewRequest("rejected", request._id)}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Ignore
                                    </button>
                                    <button 
                                        className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                                        onClick={() => reviewRequest("accepted", request._id)}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                        Accept
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    

    )
}

export default Requests;