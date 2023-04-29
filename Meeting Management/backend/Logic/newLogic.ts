import dal from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
// import model from...
import Team from "../Models/teamModel";
import Meeting from "../Models/meetingModel";


//get all teams 
const getAllTeams = async (): Promise<Team[]> => {
    // command line for the DB
    const sql = "SELECT * FROM devTeam";
    // a promise function that connects us to the database with the command line
    const teams = await dal.execute(sql);
    return teams;
}

//get meeting by team id and JOIN TABLES
const getSingleMeeting = async (id:number): Promise<Team> => {
    // command line for the DB
    const sql = `
    SELECT meeting.* , devteam.name AS teamId
    FROM meeting JOIN devteam
    ON meeting.teamId = devteam.id
    WHERE meeting.id = ${id}
`;
    // a promise function that connects us to the database with the command line
    const student = await dal.execute(sql);
    return student;
}

//add new meeting
const addMeeting = async(newMeeting:Meeting):Promise<Meeting> =>{
    const sql = `
    INSERT INTO meeting (teamID, startDate, endDate, memo, room) 
    VALUES (${newMeeting.teamID}, '${newMeeting.startDate}', '${newMeeting.endDate}', '${newMeeting.memo}', '${newMeeting.room}');
    `; // sqlלוודא שיש רווח בין המילים ב
    const result: OkPacket = await dal.execute(sql);
    newMeeting.id = result.insertId;
    return newMeeting;
}

const getAllMeetings = async (): Promise<Meeting[]> => {
    // command line for the DB
    const sql = "SELECT * FROM meeting";
    // a promise function that connects us to the database with the command line
    const meeting = await dal.execute(sql);
    return meeting;
}

export default{
    getAllTeams,
    getSingleMeeting,
    addMeeting,
    getAllMeetings
}