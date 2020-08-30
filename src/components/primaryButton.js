import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/primaryButton.css';

function PrimaryButton({buttonContent, disabled, onClick}) {
    return (      
    <div className="primaryButton">
        <button class="btn primaryBtn" disabled={disabled} onClick={onClick}>{buttonContent}</button>
    </div>
  );
}
  
export default PrimaryButton;