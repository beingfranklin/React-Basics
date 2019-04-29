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

// this.props.match.params.id
componentDidMount() {
        console.log("Details Component did mount");
        console.log(this.props.match.params.id);
        const url = 'https://ac3cd296.ngrok.io/api/listdoctorrecords?doctorId=3020';
        // axios.get(url)
        //     .then(res => {
        //         console.log(res);
        //         this.setState({
        //             data: res.data
        //         });
        //         // console.log(this.state.data);

        //     }).catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     });

        // this.getData();
    }
    render() {
        const { data } = this.state;
        console.log(this.state.data);
        return (
            <div>
               <strong>{this.props.match.params.id}</strong>
            </div >
        );
    }
}