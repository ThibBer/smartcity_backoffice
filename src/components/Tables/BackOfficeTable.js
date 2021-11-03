import React from 'react';
import {Modal} from "react-bootstrap";

class BackOfficeTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: props.filter,
            columns: props.columns ?? [],
            data: props.data ?? [],
            modal: {
                visibility: false,
                data: {}
            }
        }
    }

    onEditElement(event, rowData){
        this.setState({
            modal: {
                visibility: true,
                data: rowData
            }
        });
    }

    setEditModalVisibility(visibility){
        this.setState({
            modal: {
                visibility: visibility
            }
        });
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
                        this.state.data.map((rowData, rowIndex) => {
                            return (
                                <tr key={"tr" + rowIndex}>
                                    <td key={"td" + rowIndex}>{rowIndex + 1}</td>
                                    {
                                        this.state.columns.map((column, colIndex) => {
                                            const property = Object.keys(column)[0];

                                            return <td key={"td" + rowIndex + "-" + colIndex}>{rowData[property]}</td>
                                        })
                                    }
                                    <td>
                                        <button className="btn" onClick={(event) => this.onEditElement(event, rowData)}><i className="far fa-edit"/></button>
                                        <button className="btn"><i className="far fa-trash-alt text-danger"/></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>

                <Modal show={this.state.modal.visibility && this.state.modal.data !== undefined} onHide={() => this.setEditModalVisibility(false)} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modal.data?.first_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        I will not close if you click outside me. Don't even try to press
                        escape key.
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={() => this.setEditModalVisibility(false)}>Fermer</button>
                        <button className="btn btn-primary">Savegarder</button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default BackOfficeTable;