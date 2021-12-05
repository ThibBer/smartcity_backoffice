import React from 'react';
import PropTypes from "prop-types";
const INVALID_CHAR = /[!#$%^&*()_+\-=[\]{};':"\\|,<>/?]+/;

class SearchBar extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            filter: "",
            error: undefined
        }

        this.intervalTypingTimeout = undefined;
    }

    onInputChange(event){
        const filter = event.target.value;
        this.setState({filter});

        if(this.intervalTypingTimeout){
            clearTimeout(this.intervalTypingTimeout);
        }

        this.intervalTypingTimeout = setTimeout(() => this.updateInputValue(filter), 500);
    }

    updateInputValue(filter){
        if(filter.match(INVALID_CHAR)){
            this.setState({error: "Impossible d'effectuer une recherche avec des caractères spéciaux."});
        }else{
            this.setState({error: undefined});
            this.props.onFilter(filter);
        }
    }

    async reset(event){
        event.preventDefault();

        await this.setState({filter: "", error: undefined});
        this.props.onFilter(this.state.filter);
    }

    render(){
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <label>Recherche</label>
                        <input type="text" className="form-control" placeholder="Votre recherche" onChange={(event) => {this.onInputChange(event)}} value={this.state.filter}/>
                    </div>
                    {this.state.error && <small>{this.state.error}</small>}
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

SearchBar.propTypes = {
    onFilter: PropTypes.func.isRequired
}

export default SearchBar;