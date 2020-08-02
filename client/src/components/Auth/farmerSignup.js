import React from 'react';
import { Card, InputGroup } from 'react-bootstrap';
import style from './style.module.css';
const Signin = () => {


    return (
        <div>
            <Card className={style.card}>
                <h3>Farmer Signup</h3>
                <div className={style.row}>
                    <input className={style.names} type="text" placeholder="First Name" />
                    <input className={style.names} type="text" placeholder="Last Name" />
                </div>

                <div className={style.row}>
                    <input className={style.names} type="text" placeholder="Email" />
                    <input className={style.names} type="text" placeholder="Phone Number" />
                </div>

                <div className={style.row}>
                    <input className={style.names} type="text" placeholder="State" />
                    <input className={style.names} type="text" placeholder="District" />
                </div>
                <div className={style.row}>
                    <input className={style.names} type="password" placeholder="Enter Password" />
                    <input className={style.names} type="password" placeholder="Confirm Password" />
                </div>

                <button>Submit</button>
            </Card>
        </div>
    )
}

export default Signin;