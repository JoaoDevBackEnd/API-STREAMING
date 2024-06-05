import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../services/apiRoute";
import APIService from "../../services/api";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const GenderList = () => {
    const [Genders, setGender] = useState([]);

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
            const data = await apiService.getData(ApiRoutes.gender);

            setGender(data);
        } catch (error) {
            console.error('Erro ao carregar atores:', error);
        }
    };

    const deleteActorClick = async (id) => {
        var confirm = window.confirm('Deseja excluir este registro?');
        if (confirm) {
            const apiService = new APIService();
            await apiService.deleteData(`${ApiRoutes.gender}/${id}`);

            loadData();
        }
    };
    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
                <h3>LISTA DE GENÊROS</h3>
                <Link to={`/generos/gerenciar`}>
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
                    {Genders.map((gender) => (
                        <tr key={gender.id}>
                            <td className="text-right">{gender.id}</td>
                            <td>{gender.name}</td>
                            <td className="text-center">
                                <Link to={`/generos/gerenciar/${gender.id}`}>
                                    <Badge bg="primary" pill>
                                        <MdEdit />
                                    </Badge>
                                </Link>
                                &nbsp;|&nbsp;
                                <Badge bg="danger" pill onClick={() => deleteActorClick(gender.id)} >
                                    <MdDeleteOutline />
                                </Badge>
                                
                            </td>
                            <td>{formatDate(gender.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
 
export default GenderList;