// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import newLogic from '../Logic/newLogic';


// generic router 
const teamController = express.Router();

teamController.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("controller working");
})

// get all teams
teamController.get("/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json(await newLogic.getAllTeams());
})

// get meeting by id
teamController.get("/id/:id", async (request: Request, response: Response, next: NextFunction) => {
  const teamId = +request.params.id;
  response.status(200).json(await newLogic.getSingleMeeting(teamId));
});

// add new ...
teamController.post("/add", async (request: Request, response: Response, next: NextFunction) => {
  const newMeeting = request.body;
  response.status(201).json(await newLogic.addMeeting(newMeeting));
});

// get all meeting
teamController.get("/meeting/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json(await newLogic.getAllMeetings());
})


export default teamController;