const app = document.getElementById("app");

let score = localStorage.getItem("mk_score")
  ? parseInt(localStorage.getItem("mk_score"))
  : 0;
  
let maxRange = localStorage.getItem("mk_range")
  ? parseInt(localStorage.getItem("mk_range"))
  : 3;

let unlockedRange = localStorage.getItem("mk_unlocked")
  ? parseInt(localStorage.getItem("mk_unlocked"))
  : 3;

function saveRange() {
  localStorage.setItem("mk_range", maxRange);
  localStorage.setItem("mk_unlocked", unlockedRange);
}


function saveScore() {
  localStorage.setItem("mk_score", score);
}

/* ===========================
   MODAL PERSONALIZADO
=========================== */

function showModal(message, correctAnswer = null) {
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.background = "rgba(0,0,0,0.5)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = 999;

  const box = document.createElement("div");
  box.style.background = "white";
  box.style.padding = "30px";
  box.style.borderRadius = "20px";
  box.style.textAlign = "center";
  box.style.maxWidth = "400px";

  box.innerHTML = `<h2>${message}</h2>`;

  if (correctAnswer !== null) {
    const showBtn = document.createElement("button");
    showBtn.textContent = "Ver respuesta correcta";
    showBtn.onclick = () => {
      showBtn.remove();
      const ans = document.createElement("p");
      ans.innerHTML = `<strong>Respuesta: ${correctAnswer}</strong>`;
      box.appendChild(ans);
    };
    box.appendChild(showBtn);
  }

  const okBtn = document.createElement("button");
  okBtn.textContent = "Aceptar";
  okBtn.onclick = () => modal.remove();

  box.appendChild(document.createElement("br"));
  box.appendChild(okBtn);
  modal.appendChild(box);
  document.body.appendChild(modal);
}

/* ===========================
   MENU PRINCIPAL
=========================== */

function showMenu() {
  app.innerHTML = `
    <div class="title">🎉 MultiplicaKids v2 🎉</div>

    <div class="menu-grid">
      <button class="menu-btn" onclick="startPractice()">
        <span class="icon">🧠</span>
        Practicar
      </button>

      <button class="menu-btn" onclick="showReview()">
        <span class="icon">📚</span>
        Repaso Visual
      </button>

      <button class="menu-btn" onclick="showGames()">
        <span class="icon">🎮</span>
        Juegos
      </button>

      <button class="menu-btn" onclick="showStats()">
        <span class="icon">🏆</span>
        Progreso
      </button>
    </div>
  `;
}

/* ===========================
   PRACTICAR MEJORADO
=========================== */

let correctCount = 0;
let wrongCount = 0;
let totalQuestions = 10;
let currentQuestion = 0;

function startPractice() {
  correctCount = 0;
  wrongCount = 0;
  currentQuestion = 0;
  nextQuestion();
}

function nextQuestion() {
  if (currentQuestion >= totalQuestions) {
    showPracticeResults();
    return;
  }

  currentQuestion++;

	const a = Math.floor(Math.random() * maxRange) + 1;
	const b = Math.floor(Math.random() * maxRange) + 1;


  app.innerHTML = `
    <div class="title">🧠 Practicar</div>

    <div style="margin:20px;font-size:1.2rem;">
      Pregunta ${currentQuestion} de ${totalQuestions}
    </div>

    <div style="margin:10px;">
      <div style="background:#ddd;border-radius:20px;height:20px;">
        <div style="
          background:linear-gradient(90deg,#4ade80,#22c55e);
          width:${(currentQuestion-1)/totalQuestions*100}%;
          height:100%;
          border-radius:20px;">
        </div>
      </div>
    </div>

    <div style="margin:20px;font-size:2.5rem;font-weight:bold;">
      ${a} × ${b} = ?
    </div>

    <input 
      type="number" 
      id="answer" 
      style="
        font-size:2rem;
        padding:15px;
        border-radius:15px;
        border:3px solid #4f46e5;
        width:150px;
        text-align:center;
      "
      autofocus
    />

    <br><br>

    <button class="menu-btn" 
      style="background:#4f46e5;color:white;"
      onclick="checkAnswer(${a},${b})">
      Responder
    </button>

    <div style="margin-top:30px;font-size:1.2rem;">
      ✅ Aciertos: <strong style="color:#16a34a">${correctCount}</strong>
      &nbsp;&nbsp;&nbsp;
      ❌ Errores: <strong style="color:#dc2626">${wrongCount}</strong>
    </div>

    <br>
    <button class="menu-btn" onclick="showMenu()">⬅ Salir</button>
  `;
}

function checkAnswer(a, b) {

  const input = document.getElementById("answer");
  if (!input) return;

  const value = parseInt(input.value);

  if (isNaN(value)) return;

  if (value === a * b) {

    correctCount++;
    score += 10;
    saveScore();

    setTimeout(() => {
      nextQuestion();
    }, 200);

  } else {

    wrongCount++;
    showFriendlyError(a * b);
  }
}



function showFriendlyError(correctAnswer) {
  const modal = document.createElement("div");

  modal.style.position = "fixed";
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.background = "rgba(0,0,0,0.5)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = 999;

  const box = document.createElement("div");
  box.style.background = "#fff";
  box.style.padding = "40px";
  box.style.borderRadius = "25px";
  box.style.textAlign = "center";
  box.style.maxWidth = "350px";
  box.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";

  box.innerHTML = `
    <div style="font-size:3rem;">😅</div>
    <h2 style="color:#dc2626;">Ups... Inténtalo otra vez</h2>
  `;

  const showBtn = document.createElement("button");
  showBtn.className = "menu-btn";
  showBtn.style.background = "#f59e0b";
  showBtn.textContent = "Ver respuesta correcta";
  showBtn.onclick = () => {
    showBtn.remove();
    const ans = document.createElement("h3");
    ans.style.color = "#2563eb";
    ans.innerText = `La respuesta es ${correctAnswer}`;
    box.appendChild(ans);
  };

  const okBtn = document.createElement("button");
  okBtn.className = "menu-btn";
  okBtn.style.background = "#4f46e5";
  okBtn.textContent = "Intentar otra vez";
  okBtn.onclick = () => {
    modal.remove();
  };

  box.appendChild(showBtn);
  box.appendChild(document.createElement("br"));
  box.appendChild(document.createElement("br"));
  box.appendChild(okBtn);

  modal.appendChild(box);
  document.body.appendChild(modal);
}

function showPracticeResults() {
  app.innerHTML = `
    <div class="title">🎉 Resultado Final</div>

    <h2>✅ Aciertos: ${correctCount}</h2>
    <h2>❌ Errores: ${wrongCount}</h2>

    <h3>Puntos ganados: ${correctCount * 10}</h3>

    <button class="menu-btn" onclick="startPractice()">Repetir</button>
    <button class="menu-btn" onclick="showMenu()">Menú Principal</button>
  `;
}

/* ===========================
   REPASO VISUAL REAL
=========================== */

let selectedTable = 1;
let selectedMode = "accumulative";

function showReview() {
  app.innerHTML = `
    <div class="title">📚 Repaso Visual</div>

    <div class="selection-group">
      <div class="selection-title">Selecciona la Tabla</div>
      <div class="selection-buttons" id="tableButtons">
        ${[...Array(10)].map((_, i) =>
          `<button class="select-btn ${i+1===selectedTable?'active':''}" 
            onclick="selectTable(${i+1})">${i+1}</button>`
        ).join("")}
      </div>
    </div>

    <div class="selection-group">
      <div class="selection-title">Modo de Visualización</div>
      <div class="selection-buttons">
        <button class="select-btn ${selectedMode==='accumulative'?'active':''}" 
          onclick="selectMode('accumulative')">
          Acumulativo
        </button>
        <button class="select-btn ${selectedMode==='matrix'?'active':''}" 
          onclick="selectMode('matrix')">
          Matriz
        </button>
      </div>
    </div>

    <button class="menu-btn" onclick="generateReviewImproved()">Mostrar</button>
    <button class="menu-btn" onclick="showMenu()">⬅ Volver</button>

    <div id="reviewContent"></div>
  `;
}

function selectTable(num){
  selectedTable = num;
  showReview();
}

function selectMode(mode){
  selectedMode = mode;
  showReview();
}

function generateReviewImproved() {

  const container = document.getElementById("reviewContent");
  container.innerHTML = "";

  for (let i = 1; i <= 10; i++) {

    const card = document.createElement("div");
    card.className = "review-card";

    const equation = document.createElement("div");
    equation.className = "review-equation";
    equation.textContent = `${selectedTable} × ${i} = ${selectedTable * i}`;

    const grid = document.createElement("div");
    grid.className = "visual-grid";

    if (selectedMode === "matrix") {
      grid.style.gridTemplateColumns = `repeat(${i}, 40px)`;

      for (let r = 0; r < selectedTable; r++) {
        for (let c = 0; c < i; c++) {
          const item = document.createElement("div");
          item.textContent = "🟦";
          item.style.fontSize = "24px";
          grid.appendChild(item);
        }
      }
    } else {
      grid.style.gridTemplateColumns = `repeat(${selectedTable}, 40px)`;

      for (let n = 0; n < selectedTable * i; n++) {
        const item = document.createElement("div");
        item.textContent = "⭐";
        item.style.fontSize = "24px";
        grid.appendChild(item);
      }
    }

    card.appendChild(equation);
    card.appendChild(grid);
    container.appendChild(card);
  }
}

/* ===========================
   JUEGOS
=========================== */

function renderRangeSelector() {
  return `
    <div class="selection-group">
      <div class="selection-title">Rango de dificultad</div>
      <div class="selection-buttons">
        ${[...Array(10)].map((_, i) => {
          const num = i + 1;
          const locked = num > unlockedRange;
          return `
            <button 
              class="select-btn ${num===maxRange?'active':''}" 
              ${locked?'disabled':''}
              onclick="setRange(${num})">
              ${locked ? '🔒' : num}
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function setRange(num) {
  if (num <= unlockedRange) {
    maxRange = num;
    saveRange();
    showGames();
  }
}

function unlockNextRange() {
  if (unlockedRange < 10) {
    unlockedRange++;
    saveRange();
  }
}

function showGames() {
  app.innerHTML = `
    <div class="title">🎮 Juegos Rápidos</div>

    ${renderRangeSelector()}

    <button class="menu-btn" onclick="startShootGame()">
      🎯 Dispara el Resultado
    </button>

    <button class="menu-btn" onclick="startRaceGame()">
      🏁 Carrera de Respuestas
    </button>

    <button class="menu-btn" onclick="start60sMode()">
      ⏱️ Reto 60 Segundos
    </button>

    <button class="menu-btn" onclick="startMemoryGame()">
      🧠 Memoria Matemática
    </button>

    <button class="menu-btn" onclick="showMenu()">⬅ Volver</button>
  `;
}


/* ===========================
   PROGRESO
=========================== */

function showStats() {
  app.innerHTML = `
    <div class="title">🏆 Progreso</div>
    <h2>Puntos: ${score}</h2>
    <button class="menu-btn" onclick="resetScore()">Reiniciar</button>
    <button class="menu-btn" onclick="showMenu()">⬅ Volver</button>
  `;
}

function resetScore() {
  score = 0;
  saveScore();
  showStats();
}

/* ===========================
   INICIO
=========================== */

showMenu();

let shootCorrect = 0;
let shootWrong = 0;

function startShootGame() {

	const a = Math.floor(Math.random() * maxRange) + 1;
	const b = Math.floor(Math.random() * maxRange) + 1;

  const correctAnswer = a * b;

  let options = [correctAnswer];

  while (options.length < 4) {
    let random = Math.floor(Math.random() * 81) + 1;
    if (!options.includes(random)) options.push(random);
  }

  options.sort(() => Math.random() - 0.5);

  app.innerHTML = `
    <div class="title">🎯 Dispara el Resultado</div>

	<div class="score-container">
	  <div class="score-box correct-box">
		<div class="score-number">${shootCorrect}</div>
		<div class="score-label">Aciertos</div>
	  </div>

	  <div class="score-box wrong-box">
		<div class="score-number">${shootWrong}</div>
		<div class="score-label">Errores</div>
	  </div>
	</div>

	<div class="shoot-question">
	  ${a} × ${b}
	</div>

    <div class="game-grid">
      ${options.map(o =>
        `<button class="menu-btn shoot-btn" onclick="checkShoot(this, ${o}, ${correctAnswer})">${o}</button>`
      ).join("")}
    </div>

    <div id="shootFeedback" class="feedback-large"></div>

    <button class="menu-btn" onclick="showGames()">⬅ Volver</button>
  `;
}

function checkShoot(button, value, correctAnswer) {

  const feedback = document.getElementById("shootFeedback");

	if (value === correctAnswer) {

	  if (shootCorrect % 5 === 0) unlockNextRange();

	  button.style.backgroundColor = "#4CAF50";

	  feedback.innerHTML = `
		<div class="feedback-success">
		  🎉 ¡SÚPER BIEN!
		</div>
	  `;

	  setTimeout(() => {
		startShootGame();
	  }, 1200);

	} else {

	  shootWrong++;

	  button.style.backgroundColor = "#ff4d4d";
	  button.disabled = true;

	  feedback.innerHTML = `
		<div class="feedback-error">
		  😅 ¡Ups! Intenta otra vez
		</div>
	  `;
	}
}

let raceScore = 0;

function startRaceGame() {

  let correct = 0;
  let errors = 0;
  let position = 0;
  const goal = 5;

  function renderQuestion() {

	const a = Math.floor(Math.random() * maxRange) + 1;
	const b = Math.floor(Math.random() * maxRange) + 1;

    const result = a * b;

    document.getElementById("app").innerHTML = `
      
      <div class="game-header">
        🏎️ Carrera de Respuestas
      </div>

      <div class="game-container">

        <div class="score-board">
          <div class="score-card correct">
            <div class="score-number">${correct}</div>
            <div class="score-label">Aciertos</div>
          </div>
          <div class="score-card error">
            <div class="score-number">${errors}</div>
            <div class="score-label">Errores</div>
          </div>
        </div>

        <div class="shoot-question">
          ${a} × ${b}
        </div>

        <div class="race-track">
          <div class="race-progress" style="width:${(position/goal)*100}%"></div>
        </div>

        <div class="race-input-container">
          <input type="number" id="raceAnswer" class="race-input" placeholder="?" />
          <button class="btn-primary" onclick="checkRaceAnswer(${result})">
            Responder
          </button>
        </div>

        <div id="raceMessage"></div>

		<button class="btn-secondary" onclick="showMenu()">
		  ⬅ Volver
		</button>

      </div>
    `;

	window.checkRaceAnswer = function(correctResult) {
	  const userAnswer = parseInt(document.getElementById("raceAnswer").value);

	  if (userAnswer === correctResult) {

		correct++;
		position++;

		if (position >= goal) {
		  renderQuestion();
		  setTimeout(() => {
			document.getElementById("raceMessage").innerHTML =
			  `<div class="success-message big">🎉 ¡Ganaste la carrera!</div>`;
		  }, 100);
		  return;
		}

		renderQuestion();

	  } else {

		errors++;

		// 🔥 Volvemos a renderizar para actualizar el score
		renderQuestion();

		setTimeout(() => {
		  document.getElementById("raceMessage").innerHTML =
			`<div class="error-message big">😅 Intenta otra vez</div>`;
		}, 100);
	  }
	};
  }

  renderQuestion();
}

function checkRace(a, b) {
  const value = parseInt(document.getElementById("raceAnswer").value);

  if (value === a * b) {
    raceScore++;

    if (raceScore >= 5) {
      showWin("🏁 ¡Ganaste la carrera!");
    } else {
      nextRace();
    }
  } else {
    showError("Fallaste 😅 intenta de nuevo");
  }
}

let timeLeft = 60;
let timer;
let score60 = 0;

function start60sMode() {
  score60 = 0;
  timeLeft = 60;

  timer = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showWin(`⏱️ Tiempo terminado! Puntos: ${score60}`);
    }

    const timerElement = document.getElementById("timer");
    if (timerElement) {
      timerElement.innerText = `⏳ ${timeLeft}s`;
    }
  }, 1000);

  next60();
}

function next60() {
	const a = Math.floor(Math.random() * maxRange) + 1;
	const b = Math.floor(Math.random() * maxRange) + 1;


  app.innerHTML = `
    <div id="timer">⏳ ${timeLeft}s</div>
    <div class="score">Puntos: ${score60}</div>

    <div class="question">${a} × ${b}</div>

    <input id="answer60" class="input-answer" type="number"/>

    <button class="menu-btn" onclick="check60(${a}, ${b})">
      Responder
    </button>
  `;
}

function check60(a, b) {
  const value = parseInt(document.getElementById("answer60").value);

  if (value === a * b) {
    score60++;
  }

  next60();
}

let flippedCards = [];

function startMemoryGame() {
  flippedCards = [];

  const pairs = [];

  for (let i = 0; i < 4; i++) {
	const a = Math.floor(Math.random() * maxRange) + 1;
	const b = Math.floor(Math.random() * maxRange) + 1;


    pairs.push({ text: `${a}×${b}`, value: a * b });
    pairs.push({ text: `${a * b}`, value: a * b });
  }

  pairs.sort(() => Math.random() - 0.5);

  app.innerHTML = `
    <div class="title">🧠 Encuentra las parejas</div>

    <div class="memory-grid">
      ${pairs.map((p, i) =>
        `<div class="memory-card" onclick="flipCard(this, '${p.value}')">?</div>`
      ).join("")}
    </div>

    <button class="menu-btn" onclick="showGames()">⬅ Volver</button>
  `;
}

function flipCard(card, value) {
  if (flippedCards.length < 2 && !card.classList.contains("done")) {
    card.innerText = value;
    flippedCards.push({ card, value });

    if (flippedCards.length === 2) {

      if (flippedCards[0].value === flippedCards[1].value) {
        flippedCards[0].card.classList.add("done");
        flippedCards[1].card.classList.add("done");
      } else {
        setTimeout(() => {
          flippedCards[0].card.innerText = "?";
          flippedCards[1].card.innerText = "?";
        }, 800);
      }

      flippedCards = [];
    }
  }
}
