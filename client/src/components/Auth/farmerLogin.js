import React, { Component } from 'react';
import { Card, InputGroup } from 'react-bootstrap';
import style from './style.module.css';

class Signin extends Component {

    state = {
        aadhaar: "123456789012",
        phone: "8011493789",
        newphone: "",
        newaadhaar: ""
    }

    handleSubmit = () => {
        if (this.state.aadhaar === this.state.newaadhaar && this.state.phone === this.state.newphone) {
            window.location.href = '/dashboard'
        }
        else {
            alert("Wrong Aadhaar No. or Phone No.")
        }
    }

    onChangeEmail = (e) => {
        this.setState({ newaadhaar: e.target.value })
    }
    onChangePassword = (e) => {
        this.setState({ newphone: e.target.value })
    }

    render() {
        return (
            <div>
                <Card className={style.card}>
                    <div className={style.head}><h3>Farmer Login</h3></div>
                    <input type="text" placeholder="Enter Aadhaar No." value={this.state.newemail} onChange={this.onChangeEmail} />
                    <input type="text" placeholder="Enter Phone No." value={this.state.newpassword} onChange={this.onChangePassword} />
                    <button onClick={() => this.handleSubmit()}>Submit</button>
                    <a href="/farmersignup">Not Signed Up? Click Here to SignUp</a>
                </Card>
            </div>
        )
    }
}

export default Signin;