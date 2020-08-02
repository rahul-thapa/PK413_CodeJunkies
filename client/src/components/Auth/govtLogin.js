import React from 'react';
import { Card, InputGroup } from 'react-bootstrap';
import style from './style.module.css';
const Signin = () => {


    return (
        <div>
            <Card className={style.card}>
                <h3>Govt. Login</h3>
                <input type="text" placeholder="Enter email" />
                <input type="password" placeholder="Enter Password" />
                <button>Submit</button>
            </Card>
        </div>
    )
}

export default Signin;