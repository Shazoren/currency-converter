<template>
    <div>
      <h1>Mentions Légales</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab quis, ipsam nulla corporis possimus aut dolorem repellendus ad totam non neque modi pariatur voluptates quia sapiente unde dolor laborum?</p>
    </div>
    <div class="sun">
      <div class="moon">
      </div>
    </div>
</template>

 <style>
    body{
      background: #282a36;
      /*overflow: hidden;*/
      animation: skyBG 10s infinite linear;
    }

    .sun{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      height: 200px;
      width: 200px;
      background: orange;
      box-shadow: 0 0 10px orange, 0 0 60px orange, 0 0 200px yellow, inset 0 0 80px yellow;
    }

    .moon{
      position: absolute;
      top: 1px;
      left: 10px;
      border-radius: 50%;
      height: 200px;
      width: 200px;
      background: #B2B2B2; /*0e0f10 B2B2B2
      box-shadow: inset 0 0 50px rgba(150, 150, 150, 0.2);*/
      box-shadow: 5px 0 10px 3px rgba(229,229,229,0.3),
              0 0 10px 2px rgba(229,229,229,0.3),
              5px 0 10px 3px rgba(229,229,229,0.3),
               0px 0 3px 2px rgba(229,229,229,0.3);
      animation: eclipse 10s infinite linear;
      transform-origin: 50% 150%;
    }

    .moon::after{
      content: "";
      background-color: rgba(162, 162, 162, 0.81);
      position: absolute;
      left:  120px;
      top:  50px;
      width: 40px;
      height: 40px;
      border-radius:50%;
      box-shadow: 3px 0 0 1px rgba(98, 98, 98, 0.51),
                    7px 45px 0 -5px rgba(162, 162, 162, 0.9),
                    9px 45px 0 -5px rgba(100, 100, 100, 0.51),
                   35px 20px 0 -10px rgba(162, 162, 162, 0.9),
                   37px 20px 0 -10px rgba(100, 100, 100, 0.51);
    }

    @keyframes skyBG {
      
      30% {
        background-color: black;
      }
      70% {
        background-color: #6a99b6;
      }
      
    }

    @keyframes eclipse {
      0% {
        transform: rotate(-60deg);
      }
      90% {
        transform: rotate(30deg);
      }
      100% {
        transform: rotate(300deg);
      }
    }
  </style>
  