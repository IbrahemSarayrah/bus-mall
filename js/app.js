'use strict';
//////////////// global

let allMallImg = [];
let allName = [];
let itemVote = [];
let itemSeen = [];

let leftImgIndex;
let midImgIndex;
let rightImgIndex;

let leftImgElement = document.getElementById('leftImg');
let midImgElement = document.getElementById('midImg');
let rightImgElement = document.getElementById('rightImg');
let imagesSection = document.getElementById('imagesSection');

/////////////////////////////// constructor

function BussImages (name , source) {
  this.name =name;
  this.source =source;
  this.vote =0;
  this.seen=0;
  allMallImg.push(this);
  allName.push(this.name);
}

new BussImages ('bag' , 'img/bag.jpg');
new BussImages ('banana' , 'img/banana.jpg');
new BussImages ('bathroom' , 'img/bathroom.jpg');
new BussImages ('boots' , 'img/boots.jpg');
new BussImages ('breakfast' , 'img/breakfast.jpg');
new BussImages ('bubblegum' , 'img/bubblegum.jpg');
new BussImages ('chair' , 'img/chair.jpg');
new BussImages ('cthulhu' , 'img/cthulhu.jpg');
new BussImages ('dog-duck' , 'img/dog-duck.jpg');
new BussImages ('dragon' , 'img/dragon.jpg');
new BussImages ('pen' , 'img/pen.jpg');
new BussImages ('pet-sweep' , 'img/pet-sweep.jpg');
new BussImages ('scissors' , 'img/scissors.jpg');
new BussImages ('shark' , 'img/shark.jpg');
new BussImages ('sweep' , 'img/sweep.png');
new BussImages ('tauntaun' , 'img/tauntaun.jpg');
new BussImages ('unicorn' , 'img/unicorn.jpg');
new BussImages ('water-can' , 'img/water-can.jpg');
new BussImages ('wine-glass' , 'img/wine-glass.jpg');

///////////////////// log array
// console.log(allMallImg);


////////////////////////////// random number for images
function randomIndex (){
  return Math.floor(Math.random() * allMallImg.length);
}

///////////////////////////// log random index
// console.log(randomIndex());
let firstSet = [];
function renderThreeImg (){
  leftImgIndex = randomIndex();
  midImgIndex = randomIndex();
  rightImgIndex = randomIndex();

  while (leftImgIndex === midImgIndex) {
    midImgIndex = randomIndex();
  }

  while (leftImgIndex === rightImgIndex) {
    rightImgIndex = randomIndex();
  }

  while (midImgIndex === rightImgIndex) {
    rightImgIndex = randomIndex();
  }
  if (firstSet.includes(leftImgIndex) || firstSet.includes(midImgIndex) || firstSet.includes(rightImgIndex)) {
    renderThreeImg();
  }
  firstSet = [];
  firstSet.push(leftImgIndex);
  firstSet.push(midImgIndex);
  firstSet.push(rightImgIndex);
  console.log(firstSet);

  //   console.log('left ' + leftImgIndex);
  //   console.log('mid ' + midImgIndex);
  //   console.log('right ' + rightImgIndex);

  leftImgElement.src = allMallImg [leftImgIndex].source;
  allMallImg[leftImgIndex].seen++;
  midImgElement.src = allMallImg [midImgIndex].source;
  allMallImg[midImgIndex].seen++;
  rightImgElement.src = allMallImg [rightImgIndex].source;
  allMallImg[rightImgIndex].seen++;

}

renderThreeImg();

let maxAttempt = 25;
let userAttempt = 0;

imagesSection.addEventListener('click', userClick );


function userClick (event){
  userAttempt = userAttempt +1;

  // console.log (userAttempt);

  if (userAttempt <= maxAttempt) {
    console.log (userAttempt);

    if (event.target.id === 'leftImg'){
      allMallImg[leftImgIndex].vote = allMallImg[leftImgIndex].vote + 1;
    }else if (event.target.id === 'midImg'){
      allMallImg[midImgIndex].vote = allMallImg[midImgIndex].vote + 1;
    }else {
      allMallImg[rightImgIndex].vote = allMallImg[rightImgIndex].vote + 1 ;
    }

    renderThreeImg();

  }else {
    imagesSection.removeEventListener('click' , userClick);
    let list = document.getElementById('result');
    let li;
    for (let i = 0; i < allMallImg.length; i++){
      li = document.createElement ('li');
      list.appendChild(li);
      li.textContent = `${allMallImg[i].name} had ${allMallImg[i].vote} votes, and was seen ${allMallImg[i].seen} times`;
      itemVote.push(allMallImg[i].vote);
      itemSeen.push(allMallImg[i].seen);
      console.log(itemSeen);
    }
    chart();
  }
}

console.log(allMallImg);

/////////// button hide/show

// eslint-disable-next-line no-unused-vars
function hideDiv () {
  let btn = document.getElementById('result');
  let btn2 = document.getElementById('chart');
  if (btn.style.display === 'block' || btn2.style.display === 'block') {
    btn.style = 'none';
    btn2.style = 'none';
  }else {
    btn.style.display = 'block';
    btn2.style.display = 'block';
  }
}

///////////////////// chart
function chart(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: allName,
      datasets: [
        {
          label: '# of Votes',
          data: itemVote,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',

          ],
          borderWidth: 1
        },
        {
          label: '# of Seen',
          data: itemSeen,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
