import React, { Component } from 'react'

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";

import { Redirect } from "react-router-dom";

//Manage requests
import axios from 'axios'

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

//Form validation
import Formsy from 'formsy-react';

import { API_URL } from "api/api"

import logo from "../assets/img/cse_hq.png";

export class Login extends Component {
    _isMounted = false

    state = {
        email: '',
        password: '',
        redirectToReferrer: false,
        canSubmit: false,
    }

    componentDidMount() {
        this._isMounted = true
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    login() {
        const email = this.state.email
        const password = this.state.password
        axios.post(`${API_URL}login`, { email, password })
            .then((response) => {
                localStorage.setItem("tokens", JSON.stringify(response.data.token))
                if (this._isMounted) {
                    this.setState({
                        redirectToReferrer: true
                    })
                }
            }).catch((error) => {
                alert("Email ou mot de passe éronné !")
            })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/admin' } }
        if (this.state.redirectToReferrer === true) {
            return <Redirect to={from} />
        }
        return (
            <>
                <PanelHeader size="md" content={
                    <div className="logo">
                        <a
                            href="https://cse.club/"
                            className="simple-text logo-mini"
                            target="_blank"
                        >
                            <div className="logo-img">
                                <img src={logo} alt="cse-logo" style={{
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto"
                                }} />
                            </div>
                        </a>
                    </div>
                } />
                <div className="content">
                    <Row>
                        <Col md="3"></Col>
                        <Col md="6">
                            <Card>
                                <CardHeader>
                                    <h1 className="title"
                                        style={{ textAlign: "center" }}
                                    >Login</h1>
                                </CardHeader>
                                <CardBody>
                                <Formsy onValidSubmit={this.login.bind(this)} 
                                    onValid={this.enableButton.bind(this)} 
                                    onInvalid={this.disableButton.bind(this)}>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <h6>Email</h6>
                                                    <Input
                                                        placeholder="Email"
                                                        type="email"
                                                        required
                                                        onChange={(e) => {
                                                            var email = e.target.value
                                                            this.setState({ email: email })
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <h6>Mot de passe</h6>
                                                    <Input
                                                        placeholder="Mot de passe"
                                                        type="password"
                                                        required
                                                        onChange={(e) => {
                                                            var password = e.target.value
                                                            this.setState({ password: password })
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup style={{ left: "40%" }}>
                                                    <Button outline color="info" size="lg"
                                                        type="submit" className="btn-round">Login</Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Formsy>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3"></Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default Login