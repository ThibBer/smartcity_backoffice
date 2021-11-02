import React from 'react';

class SearchBar extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            searchValue : ""
        }
    }

    changeSearchValue(event){
        event.preventDefault();
    }

    reset(event){
        event.preventDefault();
    }

    render(){
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <label>Recherche</label>
                        <input type="text" className="form-control" placeholder="Votre recherche" onChange={(event) => this.changeSearchValue(event)}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <button className="btn btn-smartcity w-100" onClick={(event) => this.reset(event)}>Réinitialiser</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default SearchBar;