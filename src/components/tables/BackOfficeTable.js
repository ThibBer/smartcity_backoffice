import React from 'react';
import Spinner from "../Spinner";
import Comparator from "../../utils/Comparator";
import PropTypes from "prop-types";

class BackOfficeTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            error: undefined,
            filter: "",
            currentPagination: 1,
            allEntitiesCount: this.props.allEntitiesCount,
            nbElementsPerPage: this.props.nbElementsPerPage
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(!Comparator.arraysAreEquals(prevProps.data, this.props.data)){
            this.setState({data: this.props.data});
        }

        if(prevProps.nbElementsPerPage !== this.props.nbElementsPerPage){
            await this.setState({nbElementsPerPage: this.props.nbElementsPerPage, currentPagination: 1});
            this.props.onPaginationClick(this.state.currentPagination);
        }

        if(prevProps.allEntitiesCount !== this.props.allEntitiesCount){
            await this.setState({allEntitiesCount: this.props.allEntitiesCount});
        }

        if(prevProps.currentPagination !== this.props.currentPagination){
            await this.setState({currentPagination: this.props.currentPagination});
            this.props.onPaginationClick(this.state.currentPagination);
        }

        if(prevProps.error !== this.props.error){
            this.setState({error: this.props.error});
        }

        if(prevProps.filter !== this.props.filter){
            await this.setState({filter: this.props.filter, currentPagination: 1});
            this.props.onPaginationClick(this.state.currentPagination);
        }
    }

    renderTable(){
        return this.state.data.map((object, rowIndex) => {
            return (
                <tr key={"tr" + rowIndex} className={"align-middle"}>
                    {
                        this.props.mapper(object)
                    }
                    <td>
                        <button className="btn" onClick={(event) => this.props.onClickEditButton(event, object, rowIndex)}><i className="far fa-edit"/></button>
                        <button className="btn" onClick={(event) => this.props.onClickDeleteButton(event, object, rowIndex)}><i className="far fa-trash-alt text-danger"/></button>
                    </td>
                </tr>
            )
        });
    }

    emptyBody(){
        return <tr><td colSpan={this.props.columns.length + 1} className="text-center">{this.state.filter !== "" ? "Aucune donnée ne correspond à cette recherche" : "Aucune donnée à afficher"}</td></tr>
    }

    renderError(){
        return <tr><td colSpan={this.props.columns.length + 1} className="text-center">{this.state.error}</td></tr>
    }

    bodyTable(){
        if(this.state.error){
            return this.renderError();
        }


        if(this.state.data !== undefined && this.state.data.length > 0){
            return this.renderTable();
        }

        return this.emptyBody();
    }

    headerColumns(){
        return this.props.columns.map((column) => {
            return <th scope="col" key={column}>{column}</th>
        });
    }

    async onPaginationClick(event, number){
        let newPageNumber = number;

        if(number === "previous"){
            newPageNumber = this.state.currentPagination - 1;
        }else if(number === "next"){
            newPageNumber = this.state.currentPagination + 1;
        }

        await this.setState({currentPagination: newPageNumber});

        this.props.onPaginationClick(newPageNumber);
    }

    tableContent(){
        let paginationElements = [];
        const nbPages = Math.ceil(this.state.allEntitiesCount / this.state.nbElementsPerPage);

        for(let i = 1; i <= nbPages; i++){
            paginationElements.push(
                <li className="page-item" key={i}>
                    <button className={"page-link" + ((this.state.currentPagination === i) ? " text-light bg-info" : " text-black")} onClick={(event) => this.onPaginationClick(event, i)}>{i}</button>
                </li>
            );
        }

        const moreThanOneEntity = this.state.allEntitiesCount > 1;
        return (
            <>
                <div className={"row"}>
                    <div className={"col"}>
                        <p>{this.state.allEntitiesCount} élément{moreThanOneEntity && "s"} trouvé{moreThanOneEntity && "s"} {this.state.filter !== "" && <>avec le filtre "{this.state.filter}"</>}</p>
                    </div>
                </div>
                <div className="row">
                   <div className="col">
                           <table id="panel-table" className="table table-striped table-hover">
                               <thead>
                                   <tr>
                                       {this.headerColumns()}
                                       <th scope="col">Action</th>
                                   </tr>
                               </thead>
                               <tbody>
                               {
                                   this.bodyTable()
                               }
                               </tbody>
                           </table>
                    </div>
                </div>
                {!this.props.error && <div className="row">
                   <div className="col align-self-end">
                       <ul className="pagination">
                           <li className={"page-item" + (this.state.currentPagination <= 1 && " disabled")}>
                                <button className="page-link" onClick={(event) => this.onPaginationClick(event, "previous")} disabled={this.state.currentPagination <= 1}>
                                    Précédent
                                </button>
                           </li>
                           {
                               paginationElements
                           }
                           <li className={"page-item" + (this.state.currentPagination >= nbPages && " disabled")}>
                               <button className="page-link" onClick={(event) => this.onPaginationClick(event, "next")} disabled={this.state.currentPagination >= nbPages}>
                                   Suivant
                               </button>
                           </li>
                       </ul>
                    </div>
                </div>}
            </>
        );
    }

    spinner(){
        return (
            <div className="row justify-content-center">
                <div className="col">
                    <Spinner text={"Chargement des données en cours"}/>
                </div>
            </div>
        )
    }

    render() {
        if(this.props.data || this.props.error){
            return this.tableContent();
        }

        return this.spinner();
    }
}

BackOfficeTable.propTypes = {
    data: PropTypes.array,
    allEntitiesCount: PropTypes.number,
    nbElementsPerPage: PropTypes.number,
    currentPagination: PropTypes.number,
    error: PropTypes.string,
    filter: PropTypes.string,
    onPaginationClick: PropTypes.func.isRequired,
    onClickEditButton: PropTypes.func.isRequired,
    onClickDeleteButton: PropTypes.func.isRequired,
    columns: PropTypes.array,
    mapper: PropTypes.func.isRequired
}

export default BackOfficeTable;