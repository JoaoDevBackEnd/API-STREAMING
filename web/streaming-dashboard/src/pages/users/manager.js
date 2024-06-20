import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ApiRoutes } from "../../services/apiRoute";
import APIService from "../../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';  

const UsersManage = () => {
    const { id } = useParams();
    const isNew = !id;
    const message = isNew ? 'Novo' : 'Editar';
    const apiService = new APIService();
    const [model, setModel] = useState({email:'', password:'',name:'',birthDate:''});

    const navigate = useNavigate();

    useEffect(() => {
        if (!isNew) {
            const loadData = async () => {
                try {
                    const route = `${ApiRoutes.users}/${id}`;
                    const response = await apiService.getData(route);
                    setModel(response);
                } catch (error) {
                    alert('Erro ao carregar dados do ator');
                }
            };
            loadData();
        }
    }, []);

    const saveClick = async (event) => {
        event.preventDefault();
        try {
            const route = ApiRoutes.users;
            if (isNew) {
                await apiService.postData(route, model);
            } else {
                await apiService.putData(`${route}/${id}`, model);
            }

            backPage();
        } catch (error) {
            console.log(error);
            alert('Erro ao salvar');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setModel(prevModel => ({ ...prevModel, [name]: value }));
    };

    const backPage = () => {
        navigate('/users');

    }
    return (
        <Container>
            <div className="d-flex align-items-center mb-3">
                <Button variant="link" className="p-0 me-2" onClick={() => backPage()}>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </Button>
                <h3 className="mb-0">{message} USUÁRIOS </h3>
            </div>
            <Form onSubmit={saveClick}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
            
                        value={model.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={model.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>SENHA</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={model.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>DATA DE NASCIMENTO</Form.Label>
                    <Form.Control
                        type="date"
                        name="birthDate"     
                        value={model.birthDate}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Salvar 
                </Button>
                <Button variant="secondary" className="ms-2" onClick={backPage}>
                    Cancelar
                </Button>
            </Form>
        </Container>
    );
};
 
export default UsersManage;