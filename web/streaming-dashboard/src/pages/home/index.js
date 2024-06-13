import React, { useEffect, useState } from "react";
import { Container, Button, Card, Carousel } from "react-bootstrap";
import { ApiRoutes } from "../../services/apiRoute";
import APIService from "../../services/api";

const HomePage = () => {
    const [works, setWorks] = useState([]);
    const [Genders, setGenders] = useState([]);

    useEffect(() => {
        loadWorksData();
        loadGendersData();
    }, []);

    const loadWorksData = async () => {
        try {
            const apiService = new APIService();
            const data = await apiService.getData(ApiRoutes.works);
            setWorks(data);
        } catch (error) {
            console.error('Erro ao carregar obras:', error);
        }
    };

    const loadGendersData = async () => {
        try {
            const apiService = new APIService();
            const data = await apiService.getData(ApiRoutes.gender);
            setGenders(data);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };

    const getNameGenderId= (genderId) =>{
        const gender=Genders.find(gender =>gender.id ===genderId);
        return gender?.name;
    };

    const getImagePath = (id) => {
        return `/images/${id}.jpg`;
    };

    return (
        <Container style={{ backgroundColor: "#000000"}}>
            <br />
            <div>
                <h1>FILMES DE FANTASIA</h1>
            </div>
            <Carousel>
                {works.map(movie => {
                    if (getNameGenderId(movie.genderId) === 'Fantasia') {
                        return (
                            <Carousel.Item key={movie.id}>
                                <div className="d-flex justify-content-around">
                                    <Card style={{ width: '18rem', margin: '1rem' }}>
                                        <Card.Img variant="top" src={getImagePath(movie.id)}  />
                                        <Card.Body>
                                            <Card.Title>{movie.title}</Card.Title>
                                            <Card.Text>
                                                {movie.synopsis}
                                            </Card.Text>
                                            <Button variant="primary">ASSISTA JÁ</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Carousel.Item>
                        );
                    }
                    return null;
                })}
            </Carousel>

            <br />
            <div>
                <h1>FILMES DE HORROR</h1>
            </div>
            <Carousel>
                {works.map(movie => {
                    if (getNameGenderId(movie.genderId) === 'Horror') {
                        return (
                            <Carousel.Item key={movie.id}>
                                <div className="d-flex justify-content-around">
                                    <Card style={{ width: '18rem', margin: '1rem' }}>
                                        <Card.Img variant="top" src={getImagePath(movie.id)}  />
                                        <Card.Body>
                                            <Card.Title>{movie.title}</Card.Title>
                                            <Card.Text>
                                                {movie.synopsis}
                                            </Card.Text>
                                            <Button variant="primary">ASSISTA JÁ</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Carousel.Item>
                        );
                    }
                    return null;
                })}
            </Carousel>
        </Container>
    );
};

export default HomePage;
