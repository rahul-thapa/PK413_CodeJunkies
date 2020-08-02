import React, { Component } from 'react';
import { Card, InputGroup } from 'react-bootstrap';
import style from './style.module.css';
class Signin extends Component {

    state = {
        aadhaar: "",
        phone: ""
    }

    handleSubmit = () => {
        if (this.state.aadhaar.length == 12 && this.state.phone.length == 10) {
            window.location.href = '/dashboard'
        }
        else {
            alert("Wrong Aadhaar No or Phone No.")
        }
    }

    onChangeEmail = (e) => {
        this.setState({ aadhaar: e.target.value })
    }
    onChangePassword = (e) => {
        this.setState({ phone: e.target.value })
    }

    render() {
        return (
            <div>
                <Card className={style.card}>
                    <h3>Farmer Signup</h3>
                    <div className={style.row}>
                        <input className={style.names} type="text" placeholder="Enter Aadhar No." onChange={this.onChangeEmail} />
                        <input className={style.names} type="text" placeholder="Enter Phone No." onChange={this.onChangePassword} />
                    </div>

                    <button onClick={this.handleSubmit}>Submit</button>
                </Card>
            </div>
        )
    }
}

export default Signin;