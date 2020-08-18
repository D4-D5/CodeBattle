import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Editor from '../pages/editor';
import PageVisibility from 'react-page-visibility';
import {useHistory} from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';
import { END_CONTEST_USER } from '../constants';

function handleVisibilityChange(isVisible) {
    //alert(isVisible)
}
function FullScreenComponent() {
    const handle = useFullScreenHandle();
    const param = useParams();
    const history = useHistory();

    const [showPopup, setShowPopup] = useState(false)

    function allowFullScreen(){
        handle.enter()
        setShowPopup(false)
    }
    function onFullScreenChange(state){
        if(!state){
            setShowPopup(false)
        }
    }

    function endContest(){
        var targetUrl = END_CONTEST_USER

        var data = JSON.stringify({
            "codeBattleId": localStorage.getItem("codeBattleId"),
            "roomId": param.room_id
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem("tokenKey")
            },
            body: data

        };


        fetch(targetUrl, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    history.push("/home")
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    return (
        <div>
            <PageVisibility onChange={handleVisibilityChange} />
            {/* <button onClick={handle.enter}>
                Enter fullscreen
            </button> */}
            <Modal show={showPopup} onHide={()=>console.log("sdhbdhb")} centered>

                <Modal.Header className="justify-content-center border-bottom-0 pb-0">
                    <Modal.Title className="text-center">Action Needed
                            <p className="text-center">Please allow to Full screen.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pb-0">

                <Button className="mb-2" variant="primary" onClick={()=>allowFullScreen()} >
                    Enter Fullscreen
                </Button>
                <Button className="mb-2" variant="primary" onClick={()=>endContest()} >
                    End Contest
                </Button>

                </Modal.Body>
            </Modal>
            <FullScreen handle={handle} onChange={(state)=>onFullScreenChange(state)} >
                <Editor room_id={param.room_id} />
            </FullScreen>
        </div>
    );
}

export default FullScreenComponent;