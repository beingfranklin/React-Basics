import React, { Component } from 'react';
import axios from 'axios';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// json - create state - component did mount lifecyclehook- api call inside - get data .then - data to var - json 


export default class Viewlist extends Component {
    constructor() {
        super();
        this.state = {
            data: {}
            // Empty initialisation
        }
    }
    componentDidMount() {
        const url = 'https://ac3cd296.ngrok.io/api/listdoctorrecords?doctorId=3020';
        axios.get(url)
            .then(res => {
                this.state.data = JSON.parse(res);
                console.log(this.state.data);
                
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
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: "Record ID",
                            accessor: "recordId"
                        },
                        {
                            Header: "Patient ID",
                            accessor: "owner"
                        },
                        {
                            Header: 'Actions'


                        }
                    ]}
                    className="-striped -highlight"
                />
                <br />
            </div>
        );
    }
}

