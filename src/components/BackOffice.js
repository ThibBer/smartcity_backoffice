import React from 'react';
import TopBar from "./TopBar";
import VerticalActionsBar from "./VerticalActionsBar";
import Panel from "./Panel";

class BackOffice extends React.Component{
    render() {
        return (
            <div className="container-fluid">
                <div className="row min-vh-100">
                    <div className="col">
                        <div className="d-flex flex-column h-100">
                            <div className="row justify-content-center bg-purple">
                                <TopBar/>
                            </div>
                            <div className="row justify-content-center bg-blue flex-grow-1">
                                <div className="col-2 p-2">
                                    <VerticalActionsBar/>
                                </div>
                                <div className="col-10 p-2">
                                    <Panel/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BackOffice;