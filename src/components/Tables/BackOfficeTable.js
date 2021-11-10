import React from 'react';
import Spinner from "../Spinner";

class BackOfficeTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: props.filter,
            data: props.data,
            error: undefined,
            onClickEditButton: props.onClickEditButton,
            onClickDeleteButton: props.onClickDeleteButton
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.data !== this.props.data){
            this.setState({
                data: this.props.data
            });
        }

        if(prevProps.error !== this.props.error){
            this.setState({
                error: this.props.error
            });
        }
    }

    renderTable(){
        return this.state.data.map((object, rowIndex) => {
            return (
                <tr key={"tr" + rowIndex}>
                    <td key={"td" + rowIndex}>{rowIndex + 1}</td>
                    {
                        this.props.mapper(object)
                    }
                    <td>
                        <button className="btn" onClick={(event) => this.state.onClickEditButton(event, object)}><i className="far fa-edit"/></button>
                        <button className="btn" onClick={(event) => this.state.onClickDeleteButton(event, object)}><i className="far fa-trash-alt text-danger"/></button>
                    </td>
                </tr>
            )
        });
    }

    emptyBody(){
        return <tr><td colSpan={this.props.columns.length + 2} className="text-center">Aucune donnée à afficher</td></tr>
    }

    renderError(){
        const error = this.state.error;
        let message = "Une erreur inattendue est survenue ...";

        if(error.message === "Network Error"){
            message = "Une erreur serveur rend impossible l'accès aux données";
        }else if(error.status >= 500 && error.status < 600){
            message = "Une erreur serveur est survenue. Réessayer dans quelques instants";
        }else if(error.status >= 400 && error.status < 500 ){
            message = "Une erreur est survenue. La ressource demandée n'est pas disponible";
        }

        return <tr><td colSpan={this.props.columns.length + 2} className="text-center">{message}</td></tr>
    }

    bodyTable(){
        if(this.state.error){
            return this.renderError();
        }

        if(this.state.data){
            return this.renderTable();
        }

        return this.emptyBody();
    }

    columns(){
        return this.props.columns.map((column) => {
            return <th scope="col" key={column}>{column}</th>
        })
    }

    tableContent(){
        return (
            <>
                <table id="panel-table" className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        {this.columns()}
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.bodyTable()
                    }
                    </tbody>
                </table>
            </>
        );
    }

    spinner(){
        return (
            <div className="row justify-content-center">
                <div className="col">
                    <Spinner/>
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

export default BackOfficeTable;