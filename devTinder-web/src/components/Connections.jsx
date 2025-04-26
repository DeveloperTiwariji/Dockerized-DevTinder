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
    }, []);


    if(!connections) return;

    if(connections.length === 0){
        return <h1 className="text-3xl text-center my-10">No Connections Found</h1>;
    }

    return(
        <div className="text-center my-10">
        <h1 className="text-white text-3xl font-bold">Connections</h1>
        <div className="flex flex-wrap justify-center gap-4">
            {connections.map((connection) => {
                const { firstName, lastName, photoUrl, age, gender, about, _id } = connection;
                return (
                    <div key={_id} className="flex items-center m-4 p-4 rounded-lg bg-base-300 w-full md:w-1/2 lg:w-1/3 h-52 shadow-lg">
                        <div className="w-1/4 flex justify-center">
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full object-cover"
                                src={photoUrl}
                            />
                        </div>
                        <div className="text-left mx-4 w-3/4 flex flex-col justify-between">
                            <h2 className="font-bold text-xl truncate">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p>{age + " " + gender}</p>}
                            <p className="text-sm max-h-16 overflow-hidden text-ellipsis">
                                {about}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
    
    )
}

export default Connections;