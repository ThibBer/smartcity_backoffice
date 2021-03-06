import React from 'react';

import Error from "../Error";
import {Form} from "react-bootstrap";
import ReportStates from "../data/ReportStates";
import {AsyncTypeahead, Typeahead} from "react-bootstrap-typeahead";

import Comparator from "../../utils/Comparator";
import PropTypes from "prop-types";
import ApiWebService from "../../api/ApiWebService";
import ErrorCodeManager from "../ErrorCodeManager";

class ReportForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.errors,
            report: {...this.props.data},
            error: undefined,


            reportTypes: [],
            users: [],
            loading: false
        }
    }

    async componentDidMount() {
        try {
            const response = await ApiWebService.get("reportType");

            this.setState({reportTypes: response.data, error: undefined});
        } catch (error) {
            this.setState({error: ErrorCodeManager.message(error)});
        }
    }

    async componentDidUpdate(previousProps, previousState, snapshot) {
        if(!Comparator.objectsAreEquals(previousProps.errors, this.props.errors)){
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
        this.setState({loading: true});

        try {
            const response = await ApiWebService.get(`user/filter/${filter}`);

            await this.setState({users: response.data, error: undefined});
        } catch (e) {
            this.setState({error: ErrorCodeManager.message(e)});
        }

        this.setState({loading: false});
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
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>

                            <textarea className="form-control" id="description" rows="3" placeholder="Description"
                                      defaultValue={this.state.report?.description}
                                      onChange={(event) => this.onInputChange(event, "description")}/>
                            {this.state.errors?.description && <Error content={this.state.errors.description}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="state">??tat</label>
                            <Form.Select id="state" onChange={(event) => this.onInputChange(event, "state")}
                                         value={this.state.report?.state}>
                                <option>??tat</option>
                                {
                                    Object.keys(ReportStates).map(state =>
                                        <option key={state} value={state}>{ReportStates[state]}</option>
                                    )
                                }
                            </Form.Select>
                            {this.state.errors?.state && <Error content={this.state.errors.state}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="reporter">Cr??ateur</label>
                            <AsyncTypeahead
                                onChange={(user) => this.onUpdateReportValue("reporter", user[0])}
                                id="reporter"
                                isLoading={this.state.loading}
                                delay={800}
                                multiple={false}
                                labelKey={user => ("#" + user.id + " " + user.first_name + " " + user.last_name)}
                                minLength={1}
                                onSearch={(filter) => this.onUserSearch(filter)}
                                options={this.state.users}
                                emptyLabel="Aucune donn??e trouv??e"
                                placeholder="Cr??ateur du signalement"
                                defaultSelected={this.state.report?.reporter ? [this.state.report?.reporter] : []}
                                renderMenuItemChildren={(user) => (
                                    <>
                                        <span>#{user.id} - {user.email} | {user.first_name} {user.last_name}</span>
                                    </>
                                )}
                            />
                            {this.state.errors?.reporter && <Error content={this.state.errors.reporter}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="report_type">Type de signalement</label>
                            <Typeahead
                                id="state"
                                labelKey="label"
                                multiple={false}
                                onChange={(reportType) => this.onUpdateReportValue("report_type", reportType[0])}
                                options={this.state.reportTypes}
                                placeholder="Type de signalement"
                                defaultSelected={this.state.report?.report_type ? [this.state.report?.report_type] : []}
                            />
                            {this.state.errors?.report_type && <Error content={this.state.errors.report_type}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="city">Ville</label>
                            <input id="city" type="text" className="form-control" placeholder="Ville"
                                   defaultValue={this.state.report?.city}
                                   onChange={(event) => this.onInputChange(event, "city")}/>

                            {this.state.errors?.city && <Error content={this.state.errors.city}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="street">Rue</label>
                            <input id="street" type="text" className="form-control" placeholder="Rue"
                                   defaultValue={this.state.report?.street}
                                   onChange={(event) => this.onInputChange(event, "street")}/>

                            {this.state.errors?.street && <Error content={this.state.errors.street}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="zip_code">Code postal</label>
                            <input id="zip_code" type="number" className="form-control" placeholder="Code postal"
                                   defaultValue={this.state.report?.zip_code}
                                   onChange={(event) => this.onInputChange(event, "zip_code")}/>

                            {this.state.errors?.zip_code && <Error content={this.state.errors.zip_code}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="house_number">Num??ro</label>
                            <input id="house_number" type="number" className="form-control" placeholder="Num??ro"
                                   defaultValue={this.state.report?.house_number}
                                   onChange={(event) => this.onInputChange(event, "house_number")}/>
                            {this.state.errors?.house_number && <Error content={this.state.errors.house_number}/>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

ReportForm.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
    data: PropTypes.object,
    isAnUpdate: PropTypes.bool,
}

export default ReportForm;