import React from 'react';
import '../../css/topBar.css'
import logo from '../../logo.svg'

class TopBar extends React.Component{
    logout() {
        localStorage.removeItem(process.env.REACT_APP_JWT_KEY);
    }

    render() {
        return (
            <div id="top-bar" className="row bg-smartcity">
                <div className="col-4 align-self-center">
                    <img src={logo} alt="logo" width={100}/>
                </div>
                <div className="col-4 text-center align-self-center">
                    <h3 className="text-white">WALLONIA FIXED</h3>
                </div>
                <div className="col-4 align-self-center">
                    <a href="/" onClick={event => this.logout(event)} className={"float-end"}><i className="fal fa-sign-out-alt text-white fa-2x"/></a>
                </div>
            </div>
        );
    }
}

export default TopBar;