import React from 'react';
import {useDispatch} from 'react-redux';
import {
    Col,
    Row,
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';
import {useForm} from '../../hooks/useForm';
import {startLogin} from '../../actions/auth';

import './login.css';
import loginImg from '../../assets/login.jpg';

export const Login = () => {
    const dispatch = useDispatch();

    const [formLoginValues,
        handleLoginInputChange] = useForm({email: '', password: ''});

    const {email, password} = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(email, password));
    }

    return (
        <div className="container login-container">
            <Row>
                <Col md="6" className="login-form-2 my-auto">
                    <h3 className="mt-5">Ingreso</h3>
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={email}
                                onChange={handleLoginInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={password}
                                onChange={handleLoginInputChange}/>
                        </FormGroup>
                        <FormGroup className="text-center">
                            <Button className="btnSubmit" type="submit">
                                Login
                            </Button>
                        </FormGroup>
                        <div className="text-right">
                            <a className="register-link" href="/register">Registro</a>
                        </div>
                    </Form>
                </Col>
                <Col md="6" className="login-form-1">
                    <img className="img-login" alt="loginImg" src={loginImg}></img>
                </Col>
            </Row>
        </div>
    )
}
