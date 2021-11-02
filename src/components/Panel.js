import React from 'react';
import './../css/panel.css'
import './../css/verticalActionBar.css'

class Panel extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div id="panel" className="p-3">
                {/*HEADER*/}
                <div className="row">
                    <div className="col">
                        <button className="btn btn-smartcity rounded-pill"><i className="far fa-plus-circle"/>&nbsp;&nbsp;Ajouter un élément</button>
                    </div>
                </div>

                {/*TABLE*/}
                <div className="row">
                    <div className="col">
                        <table id="panel-table" className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Panel;