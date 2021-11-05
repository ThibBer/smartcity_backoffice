import React from 'react';
import Spinner from "../Spinner";

class BackOfficeTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: props.filter,
            columns: props.columns ?? [],
            data: props.data ?? [],
            onClickEditButton: props.onClickEditButton,
            onClickDeleteButton: props.onClickDeleteButton,
            loadingCompleted: props.data !== undefined && props.data.length >= 0,
            error: undefined
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.data !== this.props.data){
            this.setState({
                data: this.props.data,
                loadingCompleted: true
            });
        }

        if(prevProps.error !== this.props.error){
            this.setState({
                error: this.props.error,
                loadingCompleted: true
            });
        }
    }

    formatData(key, value){
        if(key.includes("date")){
            return new Date(value).toLocaleDateString();
        }

        return value;
    }


    renderTable(){
        return this.state.data.map((rowData, rowIndex) => {
            return (
                <tr key={"tr" + rowIndex}>
                    <td key={"td" + rowIndex}>{rowIndex + 1}</td>
                    {
                        this.state.columns.map((column, colIndex) => {
                            const property = Object.keys(column)[0];

                            return <td key={"td" + rowIndex + "-" + colIndex}>{this.formatData(property, rowData[property])}</td>
                        })
                    }
                    <td>
                        <button className="btn" onClick={(event) => this.state.onClickEditButton(event, rowData)}><i className="far fa-edit"/></button>
                        <button className="btn" onClick={(event) => this.state.onClickDeleteButton(event, rowData)}><i className="far fa-trash-alt text-danger"/></button>
                    </td>
                </tr>
            )
        });
    }

    renderEmptyBody(){
        return <tr><td colSpan={this.state.columns.length + 2} className="text-center">Aucune donnée à afficher</td></tr>
    }

    renderError(){
        const error = this.state.error;
        let message = "";

        if(error.status === 500){
            message = "Une erreur interne est survenue. Réessayer dans quelques instants";
        }else if(error.status === 404){
            message = "La ressource demandée n'est pas disponible";
        }

        return <tr><td colSpan={this.state.columns.length + 2} className="text-center">{message}</td></tr>
    }

    renderBodyTable(){
        if(this.state.error){
            return this.renderError();
        }

        if(this.state.data.length > 0){
            return this.renderTable();
        }

        return this.renderEmptyBody();
    }

    tableContent(){
        return (
            <>
                <table id="panel-table" className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        {
                            this.state.columns.map((column, index) => {
                                return <th scope="col" key={index}>{column[Object.keys(column)[0]]}</th>
                            })
                        }
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.renderBodyTable()
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
        return (
            <>
                {
                    this.state.loadingCompleted ? this.tableContent() : this.spinner()
                }
            </>
        );
    }
}

export default BackOfficeTable;