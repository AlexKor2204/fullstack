import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Meeting from "../model/meetingModel";
import Team from "../model/teamModel";
import "./Add.css";

function Add(): JSX.Element {
    const [teams, setTeams] = useState<Team[]>([]);
    const {register, handleSubmit} = useForm<Meeting>();
    const navigate = useNavigate();//add

    useEffect(() => {
        axios.get("http://localhost:3001/team/all")
            .then(response => setTeams(response.data));
    },[])

    const send = async(newMeeting:Meeting)=>{
        try{  
            await axios.post("http://localhost:3001/team/add", newMeeting)
            .then(res=>navigate("/"))     
        }catch(err:any){
            console.log(err.message)
    }
}
    return (
        <div className="Add">
			<Header/>
            <div className="Box">
            <form onSubmit={handleSubmit(send)}>
                <h2>Add Meeting</h2>

                <label>Dev Team</label>
                <select  style={{height:40}} {...register("teamID")}>
                    <option disabled >Select course...</option>
                    {teams.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}
                </select>

                <label>Start Date:</label>
                <input type="date" {...register("startDate")}/>

                <label>End Date:</label>
                <input type="date" {...register("endDate")}/>
                
                <label>Memo:</label>
                <input type="text" {...register("memo")}/>

                <label>Room:</label>
                <input type="text" {...register("room")}/>

                <input type="submit" value="Save meeting" style={{backgroundColor:"lightskyblue", borderRadius:5}}/>
            </form>
            </div>
        </div>
    );
}

export default Add;
