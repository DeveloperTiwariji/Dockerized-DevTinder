import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = ()=>{

    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);

    const fetchConnections = async ()=>{
        try{
            const res = await axios.get(BASE_URL+"/user/connections", {withCredentials: true});
            dispatch(addConnections(res.data.data));
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if(!connections) return;

    if(connections.length === 0){
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-2">No Connections Yet</h2>
                    <p className="text-gray-600 text-lg">Start swiping to make connections!</p>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-8 px-4 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg mb-4">
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600">
                            My Connections
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg font-medium">{connections.length} Amazing {connections.length === 1 ? 'Connection' : 'Connections'} 🎉</p>
                </div>

                {/* Connections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {connections.map((connection) => {
                        const { firstName, lastName, photoUrl, age, gender, about, _id } = connection;
                        return (
                            <div key={_id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-purple-100">
                                <div className="flex items-start gap-4">
                                    {/* Profile Image */}
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 rounded-full ring-4 ring-purple-200 ring-offset-2 overflow-hidden">
                                            <img
                                                alt={firstName}
                                                className="w-full h-full object-cover"
                                                src={photoUrl}
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* User Info */}
                                    <div className="flex-1 min-w-0">
                                        <h2 className="font-bold text-xl text-gray-800 truncate mb-1">
                                            {firstName + " " + lastName}
                                        </h2>
                                        {age && gender && (
                                            <p className="text-sm text-purple-600 font-semibold mb-2">
                                                {age} • {gender}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {about}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Connection Badge */}
                                <div className="mt-4 pt-4 border-t border-purple-100">
                                    <div className="flex items-center gap-2 text-sm text-purple-600 font-semibold">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                        Connected
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    
    )
}

export default Connections;