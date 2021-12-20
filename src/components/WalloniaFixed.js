import React from 'react';
import TopBar from "./menus/TopBar";
import SideBar from "./menus/SideBar";
import BackEndPanel from "./BackEndPanel";
import SideBarItems from "./data/SideBarItems";

class WalloniaFixed extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentItem: SideBarItems[0],
            filter: undefined,
        }
    }

    onMenuItemSelected(event, item){
        this.setState({currentItem: item});
    }

    onFilter(filter){
        this.setState({filter})
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row min-vh-100">
                    <div className="col">
                        <div className="d-flex flex-column h-100">
                            <div className="row">
                                <TopBar/>
                            </div>

                            <div className="row flex-grow-1">
                                <div className="col-2 py-4">
                                    <SideBar onMenuItemSelected={(event, item) => this.onMenuItemSelected(event, item)} onFilter={(filterValue) => this.onFilter(filterValue)}/>
                                </div>

                                <div className="col-10 py-4">
                                    <div id="panel" className="p-3">
                                        <BackEndPanel currentItem={this.state.currentItem} filter={this.state.filter}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
bernard_nicolas.png
export default WalloniaFixed;