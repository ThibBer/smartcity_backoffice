import React from 'react';
import Error from "../../Error";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import axios from "axios";

class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.errors,
            event: {...this.props.data},

            users: [],
            reports: [],
        }
    }

    async componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.errors !== this.props.errors){
            this.setState({errors: this.props.errors});
        }
    }

    onInputChange(event, name) {
        this.onUpdateReportValue(name, event.target.value);
    }

    onUpdateReportValue(name, value) {
        const report = {...this.state.report};

        report[name] = value;

        this.props.onInputChange(name, value);
        this.setState({report});
    }

    async onUserSearch(filter) {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "user/filter/" + filter);
            await this.setState({users: response.data});
        } catch (e) {
            console.error(e)
        }
    }

    async onReportSearch(filter) {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "report/filter/" + filter);
            await this.setState({reports: response.data});
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        return (
            <form>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="date_hour">Date / heure</label>
                            <input id="date_hour" type="datetime-local" className="form-control" defaultValue={this.state.event?.date_hour?.substr(0, 16)} onChange={(event) => this.onInputChange(event, "date_hour")}/>
                            {this.state.errors?.date_hour && <Error content={this.state.errors.date_hour}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="report">Signalement</label>

                            <AsyncTypeahead
                                onChange={(report) => this.onUpdateReportValue("report", report[0])}
                                id="report"
                                isLoading={false}
                                delay={800}
                                multiple={false}
                                labelKey={report => ("#" + report.description)}
                                minLength={3}
                                onSearch={(filter) => this.onReportSearch(filter)}
                                options={this.state.reports}
                                emptyLabel="Aucune donnée trouvée"
                                placeholder="Signalement"
                                renderMenuItemChildren={(report, props) => (
                                    <>
                                        <span>#{report.description}</span>
                                    </>
                                )}
                            />

                            {this.state.errors?.report && <Error content={this.state.errors.report}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="creator">Créateur</label>

                            <AsyncTypeahead
                                onChange={(user) => this.onUpdateReportValue("creator", user[0])}
                                id="creator"
                                isLoading={false}
                                delay={800}
                                multiple={false}
                                labelKey={user => ("#" + user.id + " " + user.first_name + " " + user.last_name)}
                                minLength={3}
                                onSearch={(filter) => this.onUserSearch(filter)}
                                options={this.state.users}
                                emptyLabel="Aucune donnée trouvée"
                                placeholder="Créateur de l'événement"
                                renderMenuItemChildren={(user, props) => (
                                    <>
                                        <span>#{user.id} - {user.email} | {user.first_name} {user.last_name}</span>
                                    </>
                                )}
                            />

                            {this.state.errors?.creator && <Error content={this.state.errors.creator}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" className="form-control" placeholder="Description" rows="4" defaultValue={this.state.event?.description} onChange={(event) => this.onInputChange(event, "description")}/>
                            {this.state.errors?.description && <Error content={this.state.errors.description}/>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default EventForm;