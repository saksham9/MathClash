let columnSize = 6;
let rowSize = 6;

let currentSum = 0;
let score = 0;

let target;

let grid = [];

const initTarget = () => {
  target = 10 + Math.ceil(Math.random() * 50);
  document.getElementById("target").innerHTML = target;
};

const updateScore = (score) => {
  document.getElementById("score").innerHTML = "SCORE : " + score;
};

const addCells = () => {
  let arr = [];
  for (let i = 0; i < columnSize; i++) {
    let obj = {};
    obj.value = Math.ceil(Math.random() * 9);
    obj.selected = false;
    arr.push(obj);
  }

  grid.unshift(arr);
};

const getId = (i, j) => {
  return i.toString() + j.toString();
};

let updateBoard = () => {
  console.log("Rendered for " + grid.length);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const el = document.getElementById(getId(i, j));
      el.innerHTML = grid[i][j].value;
      if (grid[i][j].selected === true) {
        el.classList.add("selected");
      } else if (el.classList.contains("selected")) {
        el.classList.remove("selected");
      }
    }
  }
};

let gameOver = () => {
  console.log("After " + grid.length);

  if (grid.length !== rowSize) {
    return false;
  }

  for (let i = 0; i < columnSize; i++) {
    if (grid[rowSize - 1][i].value !== "") {
      return true;
    }
  }

  return false;
};

let startTimer = () => {
  let id = setInterval(() => {
    addCells();
    console.log("Before " + grid.length);
    console.log("Interval id " + id);
    updateBoard();

    if (gameOver()) {
      
      console.log(id);
      const scoreset=document.getElementById("score-popup");
      scoreset.innerHTML=score;
      console.log(score);
      fire();
      const popup=document.getElementById("popup-1");
      popup.classList.toggle("active");
      clearInterval(id);
      return;
    }
  }, 5000);
};

const initBoard = () => {
  let board = document.getElementById("board");
  let cellContainer = document.createElement("div");
  cellContainer.setAttribute("id", "cell-container");
  for (let i = 0; i < rowSize; i++) {
    let rowEl = document.createElement("div");
    rowEl.className = "row";

    for (let j = 0; j < columnSize; j++) {
      let cellEl = document.createElement("div");
      cellEl.setAttribute("id", getId(i, j));
      cellEl.className = "cell center";
      cellEl.addEventListener("click", () => handleClick(cellEl, i, j));
      rowEl.appendChild(cellEl);
    }
    cellContainer.appendChild(rowEl);
  }

  board.appendChild(cellContainer);

  initTarget();
  updateScore(0);
};

const startGame=()=>{
  const disable=document.getElementById("start");
  disable.setAttribute("disabled","true");
initBoard();
startTimer();
}

const deselectAllSelected = () => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].selected = false;
    }
  }
};

const removeAllSelected = () => {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].selected) {
        count++;
        grid[i][j].value = "";
        grid[i][j].selected = false;
      }
    }
  }
  return count;
};

const handleClick = (cell, i, j) => {
  if (grid[i][j] === "") {
    return;
  }

  grid[i][j].selected = !grid[i][j].selected;

  if (grid[i][j].selected) {
    currentSum += grid[i][j].value;
  } else {
    currentSum -= grid[i][j].value;
  }

  if (currentSum > target) {
    currentSum = 0;
    deselectAllSelected();
  } 
  else if (currentSum === target) {
    let noOfCellsRemoved = removeAllSelected();
    score += noOfCellsRemoved;
    initTarget();
    updateScore(score);
    currentSum=0;
  }

  document.getElementById("currentSum").innerHTML = currentSum;
  updateBoard();
};

const fire=()=>{
  const content=document.getElementById("firework-content");
  for(let i=1;i<4;i++){
    const firework=document.createElement("div");
    firework.classList.add("firework");
    firework.id=["firework1","firework2","firework3"][i];
    for(let i=1;i<13;i++){
      const explosion=document.createElement("div");
      explosion.classList.add("explosion");
      firework.appendChild(explosion);
    }
    content.appendChild(firework);
  }
  console.log(content);
}