import React from 'react';

class SearchBar extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            filter: ""
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
        this.props.onFilter(filter);
    }

    reset(event){
        event.preventDefault();

        this.setState({filter: ""});
        this.props.onFilter("");
    }

    render(){
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <label>Recherche</label>
                        <input type="text" className="form-control" placeholder="Votre recherche" onChange={(event) => {this.onInputChange(event)}} value={this.state.filter}/>
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