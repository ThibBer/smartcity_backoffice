import React from 'react';

class BackOfficeTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: props.filter,
            columns: props.columns ?? [],
            data: props.data ?? [],
            onClickEditButton: props.onClickEditButton,
            onClickDeleteButton: props.onClickDeleteButton
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
                        <button className="btn" onClick={(event) => this.state.onClickDeleteButton(event)}><i className="far fa-trash-alt text-danger"/></button>
                    </td>
                </tr>
            )
        });
    }

    renderEmptyTable(){
        return <tr><td colSpan={this.state.columns.length + 2} className="text-center">Malheureusement, aucune donnée n'a été trouvée</td></tr>
    }

    render() {
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
                        this.state.data.length > 0 ? this.renderTable() : this.renderEmptyTable()
                    }
                    </tbody>
                </table>
            </>
        );
    }
}

export default BackOfficeTable;