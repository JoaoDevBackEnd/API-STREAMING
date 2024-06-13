import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ApiRoutes } from "../../services/apiRoute";
import APIService from "../../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';  

const WorksManager = () => {
    const { id } = useParams();
    const isNew = !id;
    const message = isNew ? 'Novo' : 'Editar';
    const apiService = new APIService();
    const [model, setModel] = useState({ title: '', synopsis: '', genderId: '', categoryId: '', directorId: ''});
    const navigate = useNavigate();
    const [Category, setCategories] = useState([]);
    const [Genders, setGender] = useState([]);
    const [Director, setDirector] = useState([]);
    useEffect(() => {
        if (!isNew) {
            const loadData = async () => {
                try {
                    const route = `${ApiRoutes.works}/${id}`;
                    const response = await apiService.getData(route);
                    setModel(response);
                } catch (error) {
                    alert('Erro ao carregar dados do ator');
                }
            };
            loadData();
        }
        loadActors();
        loadGenders();
        loadCategories();
        loadDirector();
    }, []);

    const loadActors = async () => {
        try {
            const data = await apiService.getData(ApiRoutes.actor);
            setActor(data);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };

    const loadCategories = async () => {
        try {
            const data = await apiService.getData(ApiRoutes.category);
            setCategories(data);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };

    const loadGenders = async () => {
        try {
            const data = await apiService.getData(ApiRoutes.gender);
            setGender(data);
        } catch (error) {
            console.error('Erro ao carregar gêneros:', error);
        }
    };

    const loadDirector = async () => {
        try {
            const data = await apiService.getData(ApiRoutes.director);
            setDirector(data);
        } catch (error) {
            console.error('Erro ao carregar diretores:', error);
        }
    };

    const saveClick = async (event) => {
        event.preventDefault();
        try {
            const route = ApiRoutes.works;
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
        navigate('/works');
    };

    return (
        <Container>
            <div className="d-flex align-items-center mb-3">
                <Button variant="link" className="p-0 me-2" onClick={backPage}>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </Button>
                <h3 className="mb-0">{message} WORKS </h3>
            </div>
            <Form onSubmit={saveClick}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Título da Obra</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Categoria exmplo: Série"
                        value={model.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSynopsis">
                    <Form.Label>SINOPSE</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="synopsis"
                        placeholder="Sinopse do filme"
                        value={model.synopsis}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGender">
                    <Form.Label>Gênero</Form.Label>
                    <Form.Select
                        name="genderId"
                        value={model.genderId}
                        onChange={handleChange}
                    >
                        <option value="">Selecione um gênero</option>
                        {Genders.map(gender => (
                            <option key={gender.id} value={gender.id}>
                                {gender.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select
                        name="categoryId"
                        value={model.categoryId}
                        onChange={handleChange}
                    >
                        <option value="">Selecione uma categoria</option>
                        {Category.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formActors">
                    <Form.Label>Actors</Form.Label>
                    <Form.Select
                        name="actors"
                        value={model.actors}
                        onChange={handleChange}
                    >
                        <option value="">Selecione um Ator</option>
                        {Actor.map(actor => (
                            <option key={actor.id} value={actor.id}>
                                {actor.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>  */}
                <Form.Group className="mb-3" controlId="formDirector">
                    <Form.Label>DIRETOR</Form.Label>
                    <Form.Select
                        name="directorId"
                        value={model.directorId}
                        onChange={handleChange}
                    >
                        <option value="">Selecione um diretor</option>
                        {Director.map(director => (
                            <option key={director.id} value={director.id}>
                                {director.name}
                            </option>
                        ))}
                        
                    </Form.Select>
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
export default WorksManager;
