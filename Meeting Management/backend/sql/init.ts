import dal_mysql from "../Utils/dal_mysql";

const mysql_team = "CREATE TABLE IF NOT EXISTS devteam (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(45) NULL, PRIMARY KEY (id));";
const mysql_meeting = "CREATE TABLE IF NOT EXISTS meeting (id INT NOT NULL, teamID INT NULL, startDate DATE NULL, endDate DATE NULL, memo VARCHAR(45) NULL, room VARCHAR(45) NULL, PRIMARY KEY (id));";

const mysql_init = () =>{
    dal_mysql.execute (mysql_team);
    dal_mysql.execute (mysql_meeting);

};

export default mysql_init;