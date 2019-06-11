import React, { Component } from 'react';
import axios from 'axios';
import CryptoJSAES from "crypto-js/aes";
import CryptoJS from "crypto-js"
import { ngrokurl } from './URL.js';
var url = ngrokurl;

// import JSEncrypt from 'node-jsencrypt';
export default class Detail extends Component {
    constructor() {
        super();
        this.state = {
            data: []
            // Empty initialisation
        }
    }
    async componentDidMount() {
        console.log("Details Component did mount");
        console.log("Params is " + this.props.match.params.id);
        console.log(window.location.href);
        var urlsplit = window.location.href.split("/");
        console.log(urlsplit[urlsplit.length - 2]);

        url = url + '/api/encryptionkey?patientid=' + urlsplit[urlsplit.length - 3] + '&recordid=' + urlsplit[urlsplit.length - 1] + '&doctorid=' + urlsplit[urlsplit.length - 2];
        console.log(url);
        axios.get(url)
            .then(res => {
                console.log(res);
                this.setState({
                    data: res.data
                });
                console.log(this.state.data);
                console.log(localStorage.getItem('hash'));
                // var decrypt = new JSEncrypt();
                // console.log(decrypt);
                // decrypt.setPrivateKey(localStorage.getItem('hash'));
                // var uncrypted = decrypt.decrypt(this.state.data.encryptedKey);
                // console.log("uncrypted");
                // console.log(uncrypted);


                //IPFS Fetching

                console.log(this.state.data.aesKey);
                console.log(this.state.data.fileHash);
                var ipfsurl  = 'https://ipfs.io/ipfs/' + this.state.data.fileHash ;
                axios.get(ipfsurl)
                .then(res => {
                        console.log("Fetching File Content");
                        console.log(res.data);
             
                        //Decryption
                        var resdata=res.data;
                        var decrypted = CryptoJSAES.decrypt(resdata.toString(), this.state.data.aesKey);
                        console.log(CryptoJS);
                        //Read Record
                        console.log(decrypted.toString(CryptoJS.enc.Utf8));

                    }).catch(function (error) {
                // handle error
                console.log(error);
            })
           })   
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