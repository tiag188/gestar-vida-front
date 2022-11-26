import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import './index.css';
import { useHistory, useParams } from 'react-router-dom';
 
interface IUser{
    title: string;
    description: string;
}
 
const Users: React.FC = () => {
    
    const history = useHistory()
    const { id } = useParams<{ id: string }>()
 
    const [model, setModel] = useState<IUser>({
        title: '',
        description: ''
    })
 
    useEffect(() => {
        console.log(id)
        if (id !== undefined) {
            findUser(id)
        }
    }, [id])
 
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }
 
    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()
 
        if (id !== undefined) {
            const response = await api.put(`/users/${id}`, model)
            console.log('response', response)
        }
        else{
            const response = await api.post('/users', model)
            console.log('response', response)
        }
        back()
    }
 
    function back(){
        history.goBack()
    }
 
    async function findUser(id: string){
        const response = await api.get(`users/${id}`)
        console.log(response)
        setModel({
            title: response.data.title,
            description: response.data.description
        })
    }
 
    return (
        
        <div className="container">
            <br />
            <div className="user-header">
                <h1>Nova Tarefa</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={model.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>
 
                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={model.description}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>
                    <br />
                    <Button variant="dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
    );
}
 
export default Users;
