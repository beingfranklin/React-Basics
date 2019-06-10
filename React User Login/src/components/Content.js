import React, { Component } from 'react';
import Viewlist from '../components/ViewList';
import Detail from '../components/Detail';
import CreateRecordDoc from '../components/CreateRecordDoc';
import CreateRecordDoctor from '../components/CreateRecordDoctor';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import CreatePatient from '../components/CreatePatient';
import RegulatorChoice from '../components/RegulatorChoice';

export default class Content extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    {/* <h3 className="box-title">Hey, Doctor!!</h3> */}
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <p className="text-center">
                                                {/* <strong>Doctor Data !!</strong> */}
                                                <Route exact path="/doctor" component={Viewlist} />
                                                <Route path="/doctor/:patientid/:doctorid/:recordid" component={Detail} />
                                                <Route path="/doctor/create" component={CreateRecordDoc} />
                                                <Route exact path="/regulator/create/doctor" component={CreateRecordDoctor} />
                                                <Route exact path="/regulator/create/" component={RegulatorChoice} />
                                                <Route path="/hospital/create" component={CreatePatient} />
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}