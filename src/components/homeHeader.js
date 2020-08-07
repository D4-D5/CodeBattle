import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/header.css'

function HomeHeader() {
  return (
    <div class="container mainHeader">
      <div class="header text-white">
        <h1 className="pb-2">A New Way To Learn And Earn</h1>
        <p>CodeBattle is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.</p>
        <button class="btn text-white mt-2">Create Account <span class="text-white">{'>'}</span></button>
      </div>
    </div>
  );
}

export default HomeHeader;