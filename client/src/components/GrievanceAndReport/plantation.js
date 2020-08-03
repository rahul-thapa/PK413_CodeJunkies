import React, { Component } from 'react';
import { Card, InputGroup } from 'react-bootstrap';
import style from './style.module.css';
import { API } from '../../backend/api';
class Signin extends Component {

    state = {
        name: "",
        quantity: ""
    }

    // Simple POST request with a JSON body using fetch
    handleSubmit = () => {

        const newData = {
            name: this.state.name,
            quantity: this.state.quantity
        }

        console.log(newData)

        fetch(`http://localhost:5000/api/plantationreport`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        }).then(response => response.json())
        window.location.href = "/dashboard"
    }


    onChangeName = (e) => {
        this.setState({ name: e.target.value })
    }
    onChangeQuantity = (e) => {
        this.setState({ quantity: e.target.value })
    }
    render() {
        return (
            <div>
                <Card className={style.card}>
                    <h3>Please fill the form to file a Plantation Report</h3>
                    <div className={style.row}>
                        <input className={style.names} type="text" placeholder="Enter Name" value={this.state.name} onChange={this.onChangeName} />
                        <input className={style.names} type="text" placeholder="Enter Quantity" value={this.state.quantity} onChange={this.onChangeQuantity} />
                    </div>
                    <button onClick={this.handleSubmit}>Submit</button>
                </Card>
            </div>
        )
    }
}

export default Signin;