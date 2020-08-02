import React from 'react'
import { Container, Card } from 'react-bootstrap'
import style from './style.module.css'

export default function profile() {
    return (
        <Container>
            <Card className={style.card}>
                <img src="" alt="" />
                <div className={style.list}>
                    <div className={style.items}>
                        Name: Test Bug
                    </div>
                    <div className={style.items}>
                        Phone: Test Bug
                    </div>
                    <div className={style.items}>
                        Email: Test Bug
                    </div>
                    <div className={style.items}>
                        State: Test Bug
                    </div>
                    <div className={style.items}>
                        District: Test Bug
                    </div>
                    <div className={style.items}>
                        Account Type: Farmer
                    </div>
                </div>
            </Card>
        </Container>
    )
}
