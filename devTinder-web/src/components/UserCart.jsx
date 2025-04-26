import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCart = ({user})=>{
  const dispatch = useDispatch();

  const handaleSendRequest = async (status, userId)=>{
    try{
      const res = await axios.post(BASE_URL+"/request/send/"+ status+ "/"+ userId, {}, {withCredentials: true});
      dispatch(removeFeed(userId));
    }catch(err){
      console.error(err);
    }
  }


    const {_id, firstName, lastName, photoUrl, age, about, gender} = user;
    return(
      <div className="card bg-base-300 w-96 shadow-lg mb-10">
      <figure>
        <img
          src={photoUrl}
          className="w-full h-80 object-cover rounded-t-lg"
          alt="User Photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p className="max-h-24 overflow-auto">{about}</p>
        {age && gender && <p>{age + " " + gender}</p>}
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={() => handaleSendRequest("ignored", _id)}>Ignored</button>
          <button className="btn btn-secondary" onClick={() => handaleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
    
    )
}

export default UserCart;