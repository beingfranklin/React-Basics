import React, { Component } from 'react';
import axios from 'axios';


export default class Detail extends Component {
    constructor() {
        super();
        this.state = {
            data: []
            // Empty initialisation
        }
    }
componentDidMount() {
        console.log("Details Component did mount");
        console.log(this.props.match.params.id);
        const url = 'https://ac3cd296.ngrok.io/api/encryptionkey?patientid=2001&recordid=1001&doctorid=3020';
        axios.get(url)
            .then(res => {
                console.log(res);
                this.setState({
                    data: res.data
                });
                console.log(this.state.data);
                console.log(this.state.data.encryptedKey);

            }).catch(function (error) {
                // handle error
                console.log(error);
            });

        // this.getData();
    }
    render() {
        const { data } = this.state;
        return (
            <div>
               <strong>PatientId : {this.props.match.params.patientid} </strong>
               <strong>DoctorId : {this.props.match.params.doctorid}   </strong>
               <strong>RecordId : {this.props.match.params.recordid}  </strong>
            </div >
        );
    }
}