import React, { Component } from 'react';
import { Card, InputGroup } from 'react-bootstrap';
import style from './style.module.css';
import { API } from './../../backend/api';
class Signin extends Component {

    state = {
        name: "",
        state: "",
        district: "",
        problem: ""
    }

    // Simple POST request with a JSON body using fetch
    handleSubmit = () => {

        const newData = {
            name: this.state.name,
            state: this.state.state,
            district: this.state.district,
            problem: this.state.problem
        }

        console.log(newData)

        fetch(`http://localhost:5000/api/grievances`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        }).then(response => response.json()).then(data => {
            console.log(data)
        })
    }


    onChangeName = (e) => {
        this.setState({ name: e.target.value })
    }
    onChangeState = (e) => {
        this.setState({ state: e.target.value })
    }
    onChangeDistrict = (e) => {
        this.setState({ district: e.target.value })
    }
    onChangeProblem = (e) => {
        this.setState({ problem: e.target.value })
    }

    render() {
        return (
            <div>
                <Card className={style.card}>
                    <h3>Please fill the form to file a Grievance</h3>
                    <div className={style.row}>
                        <input className={style.names} type="text" placeholder="Enter Name" value={this.state.name} onChange={this.onChangeName} />
                        <input className={style.names} type="text" placeholder="Enter State" value={this.state.state} onChange={this.onChangeState} />
                        <input className={style.names} type="text" placeholder="Enter District" value={this.state.district} onChange={this.onChangeDistrict} />
                    </div>
                    <input className={style.problem} type="text" placeholder="Enter Problem" value={this.state.problem} onChange={this.onChangeProblem} />

                    <button onClick={this.handleSubmit}>Submit</button>
                </Card>
            </div>
        )
    }
}

export default Signin;