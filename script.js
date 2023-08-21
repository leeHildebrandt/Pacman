var world = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 2, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 2, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 2, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 2, 1, 1, 2, 1, 1, 2],
  [2, 1, 1, 2, 2, 2, 2, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

var score = 0;

var lives = 3;

var hearts = [
  { x: 210, y: 50 },
  { x: 270, y: 50 },
  { x: 330, y: 50 },
];

var pacman = {
  x: 1,
  y: 1,
};

var pacmanGhost1 = {
  x: 5,
  y: 5,
};
var pacmanGhost2 = {
  x: 7,
  y: 7,
};
var cherries = {
  x: 8,
  y: 8,
};

function displayWorld() {
  var output = "";

  for (var i = 0; i < world.length; i++) {
    output += "<div class='row'>";
    for (var j = 0; j < world[i].length; j++) {
      if (world[i][j] == 2) output += "<div class='brick'></div>";
      else if (world[i][j] == 1) output += "<div class='coin'></div>";
      if (world[i][j] == 0) output += "<div class='empty'></div>";
    }
    output += "</div>";
  }
  // console.log(output);
  document.getElementById("world").innerHTML = output;
}
function displayPacman() {
  document.getElementById("pacman").style.top = pacman.y * 20 + "px";
  document.getElementById("pacman").style.left = pacman.x * 20 + "px";
}
function displayScore() {
  document.getElementById("score").innerHTML = score;
}
function displayPacmanGhost1() {
  document.getElementById("pacmanGhost1").style.top =
    pacmanGhost1.y * 20 + "px";
  document.getElementById("pacmanGhost1").style.left =
    pacmanGhost1.x * 20 + "px";
}
function displayPacmanGhost2() {
  document.getElementById("pacmanGhost2").style.top =
    pacmanGhost2.y * 20 + "px";
  document.getElementById("pacmanGhost2").style.left =
    pacmanGhost2.x * 20 + "px";
}
function displayCherries() {
  document.getElementById("cherries").style.top = cherries.y * 20 + "px";
  document.getElementById("cherries").style.left = cherries.x * 20 + "px";
}
function displayHearts() {
  var output = "";
  for (var i = 0; i < hearts.length; i++) {
    output += '<div id="lives1"></div>';
  }
}
displayWorld();
displayPacman();
displayScore();
displayPacmanGhost1();
displayPacmanGhost2();
displayCherries();
displayHearts();

document.onkeydown = function (e) {
  var newPacmanX = pacman.x;
  var newPacmanY = pacman.y;
  var pacmanDirection = document.getElementById("pacman");

  if (e.keyCode == 37) {
    // Left arrow key
    newPacmanX--;
    pacmanDirection.style.transform = "rotate(180deg)";
  } else if (e.keyCode == 39) {
    // Right arrow key
    newPacmanX++;
    pacmanDirection.style.transform = "rotate(0deg)";
  } else if (e.keyCode == 38) {
    // Up arrow key
    newPacmanY--;
    pacmanDirection.style.transform = "rotate(270deg)";
  } else if (e.keyCode == 40) {
    // Down arrow key
    newPacmanY++;
    pacmanDirection.style.transform = "rotate(90deg)";
  }

  // Check for collisions with walls
  if (world[newPacmanY][newPacmanX] != 2) {
    pacman.x = newPacmanX;
    pacman.y = newPacmanY;
    // Check for collisions with ghosts
    if (
      (newPacmanX === pacmanGhost1.x && newPacmanY === pacmanGhost1.y) ||
      (newPacmanX === pacmanGhost2.x && newPacmanY === pacmanGhost2.y)
    ) {
      lives--;
      if (lives === 0) {
        alert("Game Over");
        generateNewMaze();
        return;
      }
      // Remove a heart element
      var heartElement = document.getElementById("lives" + (lives + 1));
      if (heartElement) {
        heartElement.parentNode.removeChild(heartElement);
      }
      // Reset Pacman's position
      pacman.x = 1;
      pacman.y = 1;
    } else {
      pacman.x = newPacmanX;
      pacman.y = newPacmanY;
    }
    // Check if Pacman ate a coin
    if (world[pacman.y][pacman.x] == 1) {
      world[pacman.y][pacman.x] = 0;
      score += 10;
      displayWorld();
      displayScore();
    }
    // Update the game display
    displayPacman();
  }
};
// Function to move pacmanGhost1 randomly
function movePacmanGhost1() {
  var possibleMoves = [];

  // Check available moves
  if (world[pacmanGhost1.y][pacmanGhost1.x - 1] !== 2) {
    possibleMoves.push({ x: -1, y: 0 });
  }
  if (world[pacmanGhost1.y][pacmanGhost1.x + 1] !== 2) {
    possibleMoves.push({ x: 1, y: 0 });
  }
  if (world[pacmanGhost1.y - 1][pacmanGhost1.x] !== 2) {
    possibleMoves.push({ x: 0, y: -1 });
  }
  if (world[pacmanGhost1.y + 1][pacmanGhost1.x] !== 2) {
    possibleMoves.push({ x: 0, y: 1 });
  }

  // Randomly select a move from possible moves
  var randomMove =
    possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

  // Update ghost's position
  pacmanGhost1.x += randomMove.x;
  pacmanGhost1.y += randomMove.y;

  // Update the game display
  displayPacmanGhost1();
}
// Function to move pacmanGhost2 randomly
function movePacmanGhost2() {
  var possibleMoves = [];

  // Check available moves
  if (world[pacmanGhost2.y][pacmanGhost2.x - 1] !== 2) {
    possibleMoves.push({ x: -1, y: 0 });
  }
  if (world[pacmanGhost2.y][pacmanGhost2.x + 1] !== 2) {
    possibleMoves.push({ x: 1, y: 0 });
  }
  if (world[pacmanGhost2.y - 1][pacmanGhost2.x] !== 2) {
    possibleMoves.push({ x: 0, y: -1 });
  }
  if (world[pacmanGhost2.y + 1][pacmanGhost2.x] !== 2) {
    possibleMoves.push({ x: 0, y: 1 });
  }
  // Randomly select a move from possible moves
  var randomMove =
    possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  // Update ghost's position
  pacmanGhost2.x += randomMove.x;
  pacmanGhost2.y += randomMove.y;
  // Update the game display
  displayPacmanGhost2();
}
// Function to move cherries randomly
function moveCherries() {
  var possibleMoves = [];

  // Check available moves
  if (world[cherries.y][cherries.x - 1] !== 2) {
    possibleMoves.push({ x: -1, y: 0 });
  }
  if (world[cherries.y][cherries.x + 1] !== 2) {
    possibleMoves.push({ x: 1, y: 0 });
  }
  if (world[cherries.y - 1][cherries.x] !== 2) {
    possibleMoves.push({ x: 0, y: -1 });
  }
  if (world[cherries.y + 1][cherries.x] !== 2) {
    possibleMoves.push({ x: 0, y: 1 });
  }
  // Randomly select a move from possible moves
  var randomMove =
    possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

  // Update cherries position
  cherries.x += randomMove.x;
  cherries.y += randomMove.y;

  // Update the game display
  displayCherries();
}

function areAllCoinsGone() {
  for (var i = 0; i < world.length; i++) {
    for (var j = 0; j < world[i].length; j++) {
      if (world[i][j] === 1) {
        return false; // There is at least one coin remaining
      }
    }
  }
  return true; // All coins are gone
}
function generateNewMaze() {
  // Update the world to a new maze layout (modify the array as needed)
  world = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 2, 2, 2, 1, 1, 2],
    [2, 1, 1, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 2, 2, 1, 1, 1, 2],
    [2, 1, 1, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 2, 2, 2, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];

  // Reset Pacman and ghosts positions
  pacman.x = 1;
  pacman.y = 1;
  pacmanGhost1.x = 5;
  pacmanGhost1.y = 5;
  pacmanGhost2.x = 7;
  pacmanGhost2.y = 7;
  cherries.x = 8;
  cherries.y = 8;

  // Update the game display
  displayWorld();
  displayPacman();
  displayPacmanGhost1();
  displayPacmanGhost2();
  displaycherries();
  displayScore();
  // displayHearts();
}
// Add a game loop to move ghosts periodically
function gameLoop() {
  moveCherries();
  movePacmanGhost1();
  movePacmanGhost2();
  displayHearts();
  if (areAllCoinsGone()) {
    // All coins are gone, update the world or change level here
    // For example, you can call a function to generate a new maze layout
    generateNewMaze();
  }
  setTimeout(gameLoop, 1000); // Move ghosts every 1 second
}
// Start the game loop
gameLoop();
