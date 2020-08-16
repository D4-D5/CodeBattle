import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Editor from '../pages/editor';
import PageVisibility from 'react-page-visibility';

function handleVisibilityChange(isVisible){
    alert(isVisible)
}
function FullScreenComponent() {
    const handle = useFullScreenHandle();
    const param = useParams();
    
    const tempFun = ()=>{
        
    }

    return (
        <div>
            <PageVisibility onChange={handleVisibilityChange}/>
            {/* <button onClick={handle.enter}>
                Enter fullscreen
            </button> */}
            <FullScreen handle={handle}  >
                <Editor roomId={param.roomId}/>
            </FullScreen>
        </div>
    );
}

export default FullScreenComponent;