import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import './index.css';
import api from '../../../services/api';
import moment from 'moment';

interface IUser{
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const Detail: React.FC = () => {
 
    const history = useHistory()
    const { id } = useParams<{ id: string }>()
    const [user, setUser] = useState<IUser>()

    function back(){
        history.goBack()
    }

    async function findUser(){
        const response = await api.get<IUser>(`/users/${id}`)
        console.log(response)
        setUser(response.data)
    }

    // Quando o param "id" mudar/receber um novo valor, o useEffect será executado chamando o findUser
    useEffect(() => {
        findUser()
    }, [id])

    return (
        <div className="container">
            <br />
            <div className="user-header">
                <h1>Detalhes da Tarefa</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{user?.title}</Card.Title>
                    
                    <Card.Text>
                    {user?.description}
                    <br/>
                    {user?.finished ? "Finalizado" : "Pendente"}
                    <br />
                    <strong>Data de Cadastro: </strong>
                    {moment(user?.created_at).format('DD/MM/YYYY')}
                    <br />
                    <strong>Data de Atualização: </strong>
                    {moment(user?.updated_at).format('DD/MM/YYYY')}
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
    );
}
 
export default Detail;
