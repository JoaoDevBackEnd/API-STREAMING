import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../services/apiRoute";
import APIService from "../../services/api";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const CategoryList = () => {
    const [Category, setCategory] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const formatDate = (createdAt) => {
        const date = new Date(createdAt);
        return date.toISOString().split('T')[0];
    };
    const loadData = async () => {
        try {
            const apiService = new APIService();
            const data = await apiService.getData(ApiRoutes.category);

            setCategory(data);
        } catch (error) {
            console.error('Erro ao carregar atores:', error);
        }
    };

    const deleteActorClick = async (id) => {
        var confirm = window.confirm('Deseja excluir este registro?');
        if (confirm) {
            const apiService = new APIService();
            await apiService.deleteData(`${ApiRoutes.category}/${id}`);

            loadData();
        }
    };
    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <h3>LISTA DE CATEGORIAS</h3>
                <Link to={`/categorias/gerenciar`}>
                    <Button color="primary">Novo</Button>
                </Link>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th style={{ width: "200px" }}>Ações</th>
                        <th>DATA DE CRIAÇÃO</th>
                    </tr>
                </thead>
                <tbody>
                    {Category.map((category) => (
                        <tr key={category.id}>
                            <td className="text-right">{category.id}</td>
                            <td>{category.name}</td>
                            <td className="text-center">
                                <Link to={`/categorias/gerenciar/${category.id}`}>
                                    <Badge bg="primary" pill>
                                        <MdEdit />
                                    </Badge>
                                </Link>
                                &nbsp;|&nbsp;
                                <Badge bg="danger" pill onClick={() => deleteActorClick(category.id)} >
                                    <MdDeleteOutline />
                                </Badge>
                                
                            </td>
                            <td>{formatDate(category.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default CategoryList;