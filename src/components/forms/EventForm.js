import React from 'react';
import Error from "../Error";
import Comparator from "../../utils/Comparator";
import {AsyncTypeahead} from "react-bootstrap-typeahead";

import ApiWebService from "../../api/ApiWebService";
import ErrorCodeManager from "../ErrorCodeManager";
const PropTypes = require('prop-types');

class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.errors,
            event: {...this.props.data},

            users: [],
            reports: [],
            error: undefined
        }
    }

    async componentDidUpdate(previousProps, previousState, snapshot){
        if(!Comparator.objectsAreEquals(previousProps.errors, this.props.errors)){
            this.setState({errors: this.props.errors});
        }
    }

    onInputChange(event, name) {
        this.onUpdateReportValue(name, event.target.value);
    }

    onUpdateReportValue(name, value) {
        const event = {...this.state.event};

        event[name] = value;

        this.props.onInputChange(name, value);
        this.setState({event});
    }

    async onUserSearch(filter) {
        try {
            const response = await ApiWebService.get(`user/filter/${filter}`);

            await this.setState({users: response.data, error: undefined});
        } catch (e) {
            this.setState({error: ErrorCodeManager.message(e)});
        }
    }

    async onReportSearch(filter) {
        try {
            const response = await ApiWebService.get(`report/filter/${filter}`);

            await this.setState({reports: response.data, error: undefined});
        } catch (e) {
            this.setState({error: ErrorCodeManager.message(e)});
        }
    }

    render() {
        return (
            <form>
                {this.state.error &&
                    <div className="row">
                        <div className="col">
                            {this.state.error}
                        </div>
                    </div>
                }

                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="date_hour">Date / heure</label>
                            <input id="date_hour" type="datetime-local" className="form-control" defaultValue={this.state.event?.date_hour?.substr(0, 16)} onChange={(event) => this.onInputChange(event, "date_hour")}/>
                            {this.state.errors?.date_hour && <Error content={this.state.errors.date_hour}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label>Dur??e de l'??v??nement</label>

                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="Dur??e de l'??v??nement" aria-describedby="minutes-label" defaultValue={this.state.event?.duration} onChange={(event) => this.onInputChange(event, "duration")}/>
                                <div className="input-group-append">
                                    <span className="input-group-text" id="minutes-label">minutes</span>
                                </div>
                            </div>
                            {this.state.errors?.duration && <Error content={this.state.errors.duration}/>}
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
                                minLength={1}
                                onSearch={(filter) => this.onReportSearch(filter)}
                                options={this.state.reports}
                                emptyLabel="Aucune donn??e trouv??e"
                                placeholder="Signalement"
                                defaultSelected={this.state.event?.report ? [this.state.event?.report] : []}
                                renderMenuItemChildren={(report) => (
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
                            <label htmlFor="creator">Cr??ateur</label>

                            <AsyncTypeahead
                                onChange={(user) => this.onUpdateReportValue("creator", user[0])}
                                id="creator"
                                isLoading={false}
                                delay={800}
                                multiple={false}
                                labelKey={user => ("#" + user.id + " " + user.first_name + " " + user.last_name)}
                                minLength={1}
                                onSearch={(filter) => this.onUserSearch(filter)}
                                options={this.state.users}
                                emptyLabel="Aucune donn??e trouv??e"
                                placeholder="Cr??ateur de l'??v??nement"
                                defaultSelected={this.state.event?.creator ? [this.state.event?.creator] : []}
                                renderMenuItemChildren={(user) => (
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

EventForm.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
    data: PropTypes.object,
    isAnUpdate: PropTypes.bool,
}

export default EventForm;