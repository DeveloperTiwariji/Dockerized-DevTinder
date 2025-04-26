import axios from "axios"
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCart from "./UserCart";
const Feed = ()=>{
    const dispatch = useDispatch();
    const feed = useSelector((store)=>store.feed);
    const getFeed  = async()=>{
        try{
            const res = await axios.get(BASE_URL+"/feed", {withCredentials: true});
            dispatch(addFeed(res.data));

        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        getFeed();
    },[]);

    if(!feed) return;
    if(feed.length <=0){
        return <h1 className="text-3xl text-center my-10">No New Users Found</h1>;
    }
    return feed && (
        <div className="flex justify-center py-10">
         <UserCart  user = {feed[0]}/>
        </div>
    )
}

export default Feed;