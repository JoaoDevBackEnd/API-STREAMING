import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../services/apiRoute";
import APIService from "../../services/api";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const WorksList = () => {
    const [Works, setWorks] = useState([]);
    const [Category, setCategories] = useState([]);
    const [Genders, setGender] = useState([]);

    useEffect(() => {
        loadData();
        loadCategories();
        loadGenders();
    }, []);

    const formatDate = (createdAt) => {
        const date = new Date(createdAt);
        return date.toISOString().split('T')[0];
    };
    const getNameCategoryId =(categoryId) =>{
        const category = Category.find(cat => cat.id === categoryId);
        return category ? category.name : 'Categoria não encontrada';
    }
    const getNameGenderId= (genderId) =>{
        const gender=Genders.find(gender =>gender.id ===genderId);
        return gender ? gender.name : 'Gênero não encontrado';
    }
    const loadData = async () => {
        try {
            const apiService = new APIService();
            const data = await apiService.getData(ApiRoutes.works);

            setWorks(data);
        } catch (error) {
            console.error('Erro ao carregar atores:', error);
        }
    };
    const loadCategories = async () => {
        try {
            const apiService = new APIService();
            const data = await apiService.getData(ApiRoutes.category);
            setCategories(data);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };
    const loadGenders =async() =>{
        try{
            const apiService = new APIService();
            const data=await apiService.getData(ApiRoutes.gender);
            setGender(data);
        }catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    }
    const deleteActorClick = async (id) => {
        var confirm = window.confirm('Deseja excluir este registro?');
        if (confirm) {
            const apiService = new APIService();
            await apiService.deleteData(`${ApiRoutes.works}/${id}`);

            loadData();
        }
    };
    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <h3>SÉRIES E FILMES CADASTRADOS</h3>
                <Link to={`/works/gerenciar`}>
                    <Button color="primary">Novo</Button>
                </Link>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Gênero</th>
                        <th>Categoria</th>
                        <th style={{ width: "200px" }}>EDITAR/EXCLUIR</th>
                        <th>DATA DE CRIAÇÃO</th>
                    </tr>
                </thead>
                <tbody>
                    {Works.map((works) => (
                        <tr key={works.id}>
                            <td className="text-right">{works.id}</td>
                            <td className="text-right">{works.title}</td>
                            <td className="text-right">{getNameGenderId(works.genderId)}</td>
                            <td>{getNameCategoryId(works.categoryId)}</td>
                            <td className="text-center">
                                <Link to={`/works/gerenciar/${works.id}`}>
                                    <Badge bg="primary" pill>
                                        <MdEdit />
                                    </Badge>
                                </Link>
                                &nbsp;|&nbsp;
                                <Badge bg="danger" pill onClick={() => deleteActorClick(works.id)} >
                                    <MdDeleteOutline />
                                </Badge>
                                
                            </td>
                            <td>{formatDate(works.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
 
export default WorksList;