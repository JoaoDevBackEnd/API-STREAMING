import React, { useEffect, useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
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
    }
    const getImagePath = (id) => {
        return `/images/${id}.jpg`;
    };
     const adventureMovies = works.filter(work =>getNameGenderId(work.genderId) === 'Fantasia');
     const HorrorMovies = works.filter(work =>(work.genderId) === 'Horror');

    return (
        <Container>   
            <br />
            <div>
                <h1>FILMES DE FANTASIA</h1>
            </div>
            <div className="d-flex flex-wrap">
                {adventureMovies.map(adventure => (
                    <Card key={adventure.id} style={{ width: '18rem', margin: '1rem' }}>
                        <Card.Img variant="top" src={getImagePath(adventure.id)}  />
                        <Card.Body>
                            <Card.Title>{adventure.title}</Card.Title>
                            <Card.Text>
                                {adventure.synopsis}
                            </Card.Text>
                            <Button variant="primary">ASSISTA JÁ</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <br />
            <div>
                <h1>FILMES DE HORROR</h1>
            </div>
            <div className="d-flex flex-wrap">
                {HorrorMovies.map(HorrorMovies => (
                    <Card key={HorrorMovies.id} style={{ width: '18rem', margin: '1rem' }}>
                        <Card.Img variant="top" src={getImagePath(HorrorMovies.id)}  />
                        <Card.Body>
                            <Card.Title>{HorrorMovies.title}</Card.Title>
                            <Card.Text>
                                {HorrorMovies.synopsis}
                            </Card.Text>
                            <Button variant="primary">ASSISTA JÁ</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};
export default HomePage;