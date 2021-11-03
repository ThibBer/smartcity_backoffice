import React from 'react';
import TopBar from "./TopBar";
import VerticalActionsBar from "./VerticalActionsBar";
import Panel from "./Panel";

class BackOffice extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentButtonChoice: undefined
        }
    }

    onMenuItemSelected(event, buttonName){
        this.setState({currentButtonChoice: buttonName});
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row min-vh-100">
                    <div className="col">
                        <div className="d-flex flex-column h-100">
                            <div className="row justify-content-center bg-purple">
                                <TopBar/>
                            </div>
                            <div className="row justify-content-center bg-blue flex-grow-1 px-3">
                                <div className="col-2 py-4">
                                    <VerticalActionsBar onMenuItemSelected={(event, itemSelected) => this.onMenuItemSelected(event, itemSelected)}/>
                                </div>
                                <div className="col-10 py-4">
                                    <Panel key={this.state.currentButtonChoice} currentButtonChoice={this.state.currentButtonChoice}/>
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