import React from 'react';
import Spinner from "../Spinner";
import ErrorCodeManager from "../ErrorCodeManager";

class BackOfficeTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
                <tr key={"tr" + rowIndex} className={"align-middle"}>
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
        return <tr><td colSpan={this.props.columns.length + 1} className="text-center">Aucune donnée à afficher</td></tr>
    }

    renderError(){
        const message = ErrorCodeManager.message(this.state.error);

        return <tr><td colSpan={this.props.columns.length + 1} className="text-center">{message}</td></tr>
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

    headerColumns(){
        return this.props.columns.map((column) => {
            return <th scope="col" key={column}>{column}</th>
        });
    }

    tableContent(){
        return (
            <>
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