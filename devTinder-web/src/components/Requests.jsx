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
            const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id, {}, {withCredentials: true});
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
    }, []);

    if(!requests) return;

    if(requests.length === 0){
        return <h1 className="text-3xl text-center my-10">No Requests Found</h1>;
    }

    return(
        <div className="text-center my-10">
        <h1 className="text-white text-3xl font-bold my-5">Connection Requests</h1>
        <div className="flex flex-wrap justify-center gap-4">
            {requests.map((request) => {
                const { firstName, lastName, photoUrl, age, gender, about, _id } = request.fromeUserId;
                return (
                    <div 
                        key={_id} 
                        className="flex items-center p-4 rounded-lg bg-base-300 w-full md:w-1/2 lg:w-1/3 h-auto min-h-56 shadow-lg"
                    >
                        {/* Profile Image */}
                        <div className="w-24 h-24 flex-shrink-0">
                            <img 
                                alt="photo" 
                                className="w-full h-full rounded-full object-cover" 
                                src={photoUrl} 
                            />
                        </div>
    
                        {/* User Details */}
                        <div className="flex-1 text-left mx-4">
                            <h2 className="font-bold text-xl capitalize">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p className="text-sm text-gray-400">{age} {gender}</p>}
                            <p className="text-sm max-h-20 overflow-hidden">
                                {about}
                            </p>
                        </div>
    
                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                            <button 
                                className="btn bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md w-28"
                                onClick={() => reviewRequest("rejected", request._id)}
                            >
                                Reject
                            </button>
                            <button 
                                className="btn bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md w-28"
                                onClick={() => reviewRequest("accepted", request._id)}
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
    

    )
}

export default Requests;