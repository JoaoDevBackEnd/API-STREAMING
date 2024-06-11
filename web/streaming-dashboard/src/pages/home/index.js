// Filename - pages/index.js

import React from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import lotrImage from '../../images/lotr_sociedadeAnel.jpg';
const HomePage = () => {
	return (
		<Container>
			<div>
				<h1>STREAMING API</h1>
			</div>
			<Card style={{ width: '18rem' }}>
				<Card.Img variant="top" src={lotrImage} />
				<Card.Body>
					<Card.Title>Card Title</Card.Title>
					<Card.Text>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</Card.Text>
					<Button variant="primary">Go somewhere</Button>
				</Card.Body>
			</Card>
		</Container>
	);
};
export default HomePage;
