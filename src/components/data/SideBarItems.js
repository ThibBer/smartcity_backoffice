/*Columns*/
import userColumns from "../tables/columns/user";
import reportColumns from "../tables/columns/report";

/*Forms*/
import UserForm from "../forms/UserForm";

/*Mappers*/
import userRowMapper from "../mappers/userMapper";

const items = [
    {name: "user", label: "Utilisateurs", singularLabel: "utilisateur", icon: "fa-user", apiRoute: "user", columns: userColumns, form: new UserForm(), mapper: userRowMapper},
    {name: "report", label: "Signalements", singularLabel: "signalement", icon: "fa-file-chart-line", apiRoute: "report", columns: reportColumns, form: new UserForm(), mapper: userRowMapper},
    {name: "event", label: "Évenements", singularLabel: "évenement", icon: "fa-calendar-week", apiRoute: "event"},
    {name: "reportType", label: "Types de signalement", singularLabel: "type de signalement", icon: "fa-list", apiRoute: "reportType"},
];

export default items;