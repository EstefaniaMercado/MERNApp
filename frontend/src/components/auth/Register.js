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
import {startRegister} from '../../actions/auth';
import Swal from 'sweetalert2';

import './login.css';
import loginImg from '../../assets/register.png';

export const Register = () => {
    const dispatch = useDispatch();

    const [formRegisterValues,
        handleLoginInputChange] = useForm({name: '', email: '', password1: '', password2: ''});

    const {name, email, password1, password2} = formRegisterValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (password1 !== password2) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
        }
        console.log('?')
        dispatch(startRegister(name, email, password1));
    }

    return (
        <div className="container login-container">
            <Row>
                <Col md="6" className="login-form-1 my-auto">
                    <img className="img-login" alt="loginImg" src={loginImg}></img>
                </Col>

                <Col md="6" className="login-form-3">
                    <h3>Registro</h3>
                    <Form onSubmit={handleRegister}>
                        <FormGroup>
                            <Input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="name"
                                value={name}
                                onChange={handleLoginInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="email"
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
                                name="password1"
                                value={password1}
                                onChange={handleLoginInputChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="password2"
                                value={password2}
                                onChange={handleLoginInputChange}/>
                        </FormGroup>

                        <FormGroup className="text-center">
                            <Button type="submit" className="btnSubmit">
                                Crear cuenta
                            </Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}