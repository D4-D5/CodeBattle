import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card} from 'react-bootstrap';
// import '../css/cards.css'


function MainCard(props) {
    const { img, title, content, btnState,disabled  ,routeChange} = props;
    return (  
        <Card className="homeCard">
            <div className="card_img">
                <Card.Img  variant="top" src={img}/>
                <div class="info">
                    <h1 >{title}</h1>
                    <p >{content}</p>
                </div>
            </div>
            <Card.Body className="p-0">
                <Button variant="primary" class="d-block" disabled={disabled} onClick={routeChange}>{btnState}</Button>
            </Card.Body>
        </Card>
    );
}
  
export default MainCard;