/*Columns*/
import userColumns from "../tables/columns/user";
import reportColumns from "../tables/columns/report";
import eventColumns from "../tables/columns/event";
import reportTypeColumns from "../tables/columns/reportType";


/*Mappers*/
import userMapper from "../mappers/userMapper";
import reportMapper from "../mappers/reportMapper";
import eventMapper from "../mappers/eventMapper";
import reportTypeMapper from "../mappers/reportTypeMapper";

const items = [
    {name: "user", label: "Utilisateurs", singularLabel: "utilisateur", icon: "fa-user", apiRoute: "user", columns: userColumns, mapper: userMapper},
    {name: "report", label: "Signalements", singularLabel: "signalement", icon: "fa-file-chart-line", apiRoute: "report", columns: reportColumns, mapper: reportMapper},
    {name: "event", label: "Évenements", singularLabel: "évenement", icon: "fa-calendar-week", apiRoute: "event", columns: eventColumns, mapper: eventMapper},
    {name: "reportType", label: "Types de signalement", singularLabel: "type de signalement", icon: "fa-list", apiRoute: "reportType", columns: reportTypeColumns, mapper: reportTypeMapper},
];

export default items;