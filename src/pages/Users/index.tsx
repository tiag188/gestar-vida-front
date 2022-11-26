import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';
import './index.css';
 
interface IUser {
    id: number;
    name: string;
    user: string;
    password: string;
    email: string;
    info: {
		specialty: string;
		interest: string;
		time: number;
	};
    status: boolean;
	role: string;
    created_at: Date;
    updated_at: Date;
}
 
const Users: React.FC = () => {
 
    const [users, setUsers] = useState<IUser[]>([])
    const history = useHistory()
 
    useEffect(() => {
        loadUsers()
    }, [])
 
    async function loadUsers() {
        const response = await api.get('/users')
        setUsers(response.data)
    }
 
    function formatDate(date: Date){
        return moment(date).format('DD/MM/YYYY')
    }
 
    function newUser(){
        history.push('/usuarios_cadastro')
    }
 
    function editUser(id: number){
        history.push(`/usuarios_cadastro/${id}`)
    }

    function viewUser(id: number){
        history.push(`/usuarios/${id}`)
    }

    async function finishedUser(id: number){
        await api.patch(`/users/${id}`)
        loadUsers()
    }

    async function deleteUser(id: number){
        await api.delete(`/users/${id}`)
        loadUsers()
    }

    return (
        
        <div className="container">
            <br />
            <div className="user-header">
                <h1>Todos os Usuários</h1>
                <Button variant="dark" size="sm" onClick={newUser}>Novo Usuário</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Usuário</th>
                    <th>Especialidade</th>
                    <th>Função</th>
                    <th>Data de Atualização</th>
                    <th>Status</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.user}</td>
                                <td>{user.info.specialty}</td>
                                <td>{user.role}</td>
                                <td>{formatDate(user.updated_at)}</td>
                                <td>{user.status ? "Ativo" : "Inativo"}</td>
                                <td>
                                    <Button size="sm" disabled={!user.status} variant="primary" onClick={() => editUser(user.id)}>Editar</Button>{' '}
                                    <Button size="sm" disabled={!user.status} variant="success" onClick={() => finishedUser(user.id)}>Iniativar</Button>{' '}
                                    <Button size="sm" variant="warning" onClick={() => viewUser(user.id)}>Visualizar</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => deleteUser(user.id)}>Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}
 
export default Users;
