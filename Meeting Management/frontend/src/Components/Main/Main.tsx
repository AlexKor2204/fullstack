import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Main.css";
import Team from "../model/teamModel";
import Meeting from "../model/meetingModel";

function Main(): JSX.Element {
    const [teams, setTeams] = useState<Team[]>([]);
    const [meeting, setMeeting] = useState<Meeting[]>([]);
    
    useEffect(() => {
        axios.get("http://localhost:3001/team/all")
            .then(response => setTeams(response.data));
    },[]);

    useEffect(() => {
        axios.get("http://localhost:3001/team/meeting/all")
            .then((response) => setMeeting(response.data));
    },[]);

    const getMeet = async (id:number) =>{
        try{
           axios.get(`http://localhost:3001/team/id/${id}`)
            .then((response)=>{
                setMeeting(response.data); 
            });
        } catch (err:any) {
            console.log(err.message);
    }
};

    return (
        <div className="Main">
			<Header/>
            <select  defaultValue={0} style={{height:40}} onChange={(args)=>{
                getMeet(parseInt(args.target.value))
            }}>
                    <option value={0} disabled >Select course...</option>
                    {teams.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}
                </select>

                <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Team Id</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Description</th>
                        <th>Room</th>                      
                    </tr>
                </thead>
                <tbody>
                    {meeting.map(item=>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.teamID}</td>
                            <td>{new Date(item.startDate).toLocaleString()}</td>
                            <td>{new Date(item.endDate).toLocaleString()}</td>
                            <td>{item.memo}</td>
                            <td>{item.room}</td>
                        
                        </tr>
                        )}
                </tbody>
            </table>

                
        </div>
    );
}

export default Main;
