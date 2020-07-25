import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const HomeCard = (props) => {
    const { routeChange, header, title, content, img, btnState } = props;
    // history = useHistory();
    return (
        <Card style={{padding:"0px",width:"100%"}} className="my-1 col-sm-3">
            <Card.Header>{header}</Card.Header>

            <Card.Img variant="top" src={img} style={{ width: "100%", height: "100%px" }} />
            <Card.Body>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text>
                    {content}
                </Card.Text>
            </Card.Body>
            {/* <input type="text" id="join-id" className="form-control" placeholder="Enter Joining ID" />
                            <Button variant="primary">Join</Button>
                            <div>OR</div> */}

            <Button variant="primary" onClick={routeChange} disabled={btnState}>Start</Button>
        </Card>
    )
}

export default HomeCard;
