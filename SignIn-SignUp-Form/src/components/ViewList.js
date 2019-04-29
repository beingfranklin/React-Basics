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
            data: []
            // Empty initialisation
        }
    }
    componentDidMount() {
        console.log("Component did mount");

        const url = 'https://ac3cd296.ngrok.io/api/listdoctorrecords?doctorId=3020';
        axios.get(url)
            .then(res => {
                console.log(res);
                this.setState({
                    data: res.data
                });
                // console.log(this.state.data);

            }).catch(function (error) {
                // handle error
                console.log(error);
            });

        // this.getData();
    }
    render() {
        const { data } = this.state;
        console.log(this.state.data);
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
                        }
                        ,
                        {
                            Header: 'Actions',
                            Cell: row => (
                                < button onClick={() =>{
                                    console.log(row.original.recordId);
                                    var patientid=((row.original.owner).split("#"));
                                    this.props.history.push('/doctor/'+patientid[1]+'/'+localStorage.getItem('doctorId')+'/'+row.original.recordId)}}>button</button>
                            )


                        }
                    ]
                    }
                    className="-striped -highlight"
                />
                <br />
            </div >
        );
    }
}

