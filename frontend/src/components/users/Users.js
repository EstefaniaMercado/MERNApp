import React, {useEffect} from 'react';
import {Row, Table, Button, ButtonGroup, Input} from 'reactstrap';
import './users.css';

import {userStartLoading, userStartDelete, userStartUpdate, updateUsers} from '../../actions/users';
import {useDispatch, useSelector} from 'react-redux';
import Swal from 'sweetalert2';

export const Users = () => {
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.users);

    useEffect(() => {
        dispatch(userStartLoading());
    }, [dispatch])

    const updateFieldChanged = index => e => {
        let usersList = [...users];
        let user = {
            ...usersList[index]
        };
        user = {
            ...user,
            isInactive: false
        }
        usersList[index] = user;
        dispatch(updateUsers(usersList))
    }

    const saveFieldChange = index => e => {
        let usersList = [...users];
        dispatch(userStartUpdate(usersList[index]))
    }

    const handleInputChange = (e, index) => {
        let usersList = [...users];
        let user = {
            ...usersList[index]
        };
        user = {
            ...user,
            [e.target.name]: e.target.value
        }
        usersList[index] = user;
        dispatch(updateUsers(usersList))
    }

    const deleteField = index => e => {
        Swal
            .fire({
            title: '¿Estas seguro?',
            text: 'El usuario no se podrá recuperar',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        })
            .then((result) => {
                if (result.value) {
                    let usersList = [...users];
                    dispatch(userStartDelete(usersList[index]))
                    Swal.fire('Eliminado!', 'El usuario fue eliminado exitosamente.', 'success')
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cacelado', 'El usuario no fue eliminado', 'error')
                }
            })
    }

    return (
        <div className="container">
            <Row className="mt-5">
                <h3>Usuarios</h3>
                {users && <Table className="mt-2" hover>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>
                                    <Input
                                        value={user.name}
                                        disabled={users[index].isInactive}
                                        name="name"
                                        onChange={(e) => handleInputChange(e, index)}></Input>
                                </td>
                                <td>
                                    <Input
                                        value={user.email}
                                        disabled={users[index].isInactive}
                                        name="email"
                                        onChange={(e) => handleInputChange(e, index)}></Input>
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <Button
                                            className="group-button"
                                            size="sm"
                                            outline
                                            color="primary"
                                            id="viewButton"
                                            onClick={users[index].isInactive
                                            ? updateFieldChanged(index)
                                            : saveFieldChange(index)}>
                                            {users[index].isInactive
                                                ? 'Editar'
                                                : 'Guardar'}
                                        </Button>
                                        <Button
                                            className="group-button"
                                            size="sm"
                                            outline
                                            color="warning"
                                            id="editButton"
                                            onClick={deleteField(index)}>
                                            Borrar
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
}
            </Row>
        </div>
    )
}