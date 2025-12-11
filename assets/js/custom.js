document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('customContactForm');
    const resultContainer = document.getElementById('formResultContainer');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect Data
            const formData = {
                name: document.getElementById('name').value || "Not provided",
                surname: document.getElementById('surname').value || "Not provided",
                email: document.getElementById('email').value || "Not provided",
                phone: document.getElementById('phone').value || "Not provided",
                address: document.getElementById('address').value || "Not provided",
                // Ensure ratings are numbers (default to 0 if empty)
                rating1: Number(document.getElementById('rating1').value) || 0,
                rating2: Number(document.getElementById('rating2').value) || 0,
                rating3: Number(document.getElementById('rating3').value) || 0
            };

            // Calculate Average
            const average = (formData.rating1 + formData.rating2 + formData.rating3) / 3;
            const averageFormatted = average.toFixed(1);

            // Determine Color
            let color = '#28a745'; // Green
            if (average < 4) color = '#dc3545'; // Red
            else if (average < 7) color = '#fd7e14'; // Orange

            // Display Results
            resultContainer.style.display = 'block';
            resultContainer.innerHTML = `
                <div class="result-box">
                    <h4>Submission Results</h4>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Surname:</strong> ${formData.surname}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <p><strong>Phone:</strong> ${formData.phone}</p>
                    <p><strong>Address:</strong> ${formData.address}</p>
                    <hr style="border-color: rgba(255,255,255,0.1);">
                    <p>
                        <strong>${formData.name} ${formData.surname}:</strong> 
                        <span style="color: ${color}; font-size: 1.4rem; font-weight: bold;">
                            ${averageFormatted}
                        </span>
                    </p>
                </div>
            `;
            
            // Show Popup
            alert("Form submitted successfully!"); 
            // Note: You can swap 'alert' for the custom popup code if you prefer that animation.
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
   * CONTACT FORM LOGIC (your existing functionality)
   * --------------------------------------------------------- */
  const form = document.getElementById('customContactForm');
  const resultContainer = document.getElementById('formResultContainer');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Stop page reload

      const r1 = document.getElementById('rating1') ? document.getElementById('rating1').value : 0;
      const r2 = document.getElementById('rating2') ? document.getElementById('rating2').value : 0;
      const r3 = document.getElementById('rating3') ? document.getElementById('rating3').value : 0;

      const formData = {
        name: document.getElementById('name').value || "Not provided",
        surname: document.getElementById('surname').value || "Not provided",
        email: document.getElementById('email').value || "Not provided",
        phone: document.getElementById('phone').value || "Not provided",
        address: document.getElementById('address').value || "Not provided",
        rating1: Number(r1),
        rating2: Number(r2),
        rating3: Number(r3)
      };

      console.log('Form Data:', formData);

      const average = (formData.rating1 + formData.rating2 + formData.rating3) / 3;

      let averageFormatted = "0.0";
      if (!isNaN(average)) {
        averageFormatted = average.toFixed(1);
      } else {
        console.error("Calculation Error: Result is NaN. Check input IDs.");
      }

      let color = '#28a745'; // Green
      if (average < 4) {
        color = '#dc3545'; // Red
      } else if (average >= 4 && average < 7) {
        color = '#fd7e14'; // Orange
      }

      resultContainer.style.display = 'block';
      resultContainer.innerHTML = `
        <div class="result-box">
          <h4>Submission Results</h4>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Surname:</strong> ${formData.surname}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone number:</strong> ${formData.phone}</p>
          <p><strong>Address:</strong> ${formData.address}</p>
          <hr style="border-color: rgba(255,255,255,0.1);">
          <p class="avg-rating">
            <strong>${formData.name} ${formData.surname}:</strong>
            <span style="color: ${color}; font-size: 1.5rem; font-weight: bold;">
              ${averageFormatted}
            </span>
          </p>
        </div>
      `;

      showCustomPopup();
      form.reset();
    });
  }

  function showCustomPopup() {
    let popup = document.querySelector('.custom-popup');
    if (!popup) {
      popup = document.createElement('div');
      popup.className = 'custom-popup';
      document.body.appendChild(popup);
    }

    popup.innerHTML = '<i class="bi bi-check-circle-fill"></i> Form submitted successfully!';

    requestAnimationFrame(() => {
      popup.classList.add('show');
    });

    setTimeout(() => {
      popup.classList.remove('show');
    }, 3000);
  }

  /* -----------------------------------------------------------
   * MEMORY GAME LOGIC
   * --------------------------------------------------------- */

  const memoryBoard = document.getElementById('memoryBoard');
  const difficultySelect = document.getElementById('memoryDifficulty');
  const movesEl = document.getElementById('memoryMoves');
  const matchesEl = document.getElementById('memoryMatches');
  const winMessageEl = document.getElementById('memoryWinMessage');
  const startBtn = document.getElementById('memoryStart');
  const restartBtn = document.getElementById('memoryRestart');
  const timerEl = document.getElementById('memoryTimer');
  const bestEasyEl = document.getElementById('memoryBestEasy');
  const bestHardEl = document.getElementById('memoryBestHard');

  // Only run game setup if the elements exist on this page
  if (memoryBoard && difficultySelect && movesEl && matchesEl) {

    // Base dataset: at least 6 unique items, we use 12
    const memoryItems = [
      '🐍', '🤖', '⚽', '🧠', '📊', '💡',
      '📚', '🚀', '🎧', '🧮', '🧪', '💻'
    ];

    const DIFFICULTY_CONFIG = {
      easy: { cols: 4, rows: 3, pairs: 6 },
      hard: { cols: 6, rows: 4, pairs: 12 }
    };

    let currentDifficulty = 'easy';
    let lockBoard = false;
    let firstCard = null;
    let secondCard = null;
    let moves = 0;
    let matches = 0;
    let totalPairs = DIFFICULTY_CONFIG[currentDifficulty].pairs;
    let gameStarted = false;

    // Timer
    let timerInterval = null;
    let secondsElapsed = 0;

    // Best results from localStorage
    let bestEasy = null;
    let bestHard = null;

    initMemoryGame();

    function initMemoryGame() {
      loadBestResults();
      setDifficulty(currentDifficulty);
      resetGameState(false);
      buildBoard();
      updateStatsDisplay();
    }

    function setDifficulty(level) {
      currentDifficulty = level in DIFFICULTY_CONFIG ? level : 'easy';
      totalPairs = DIFFICULTY_CONFIG[currentDifficulty].pairs;

      memoryBoard.classList.remove('memory-board-easy', 'memory-board-hard');
      memoryBoard.classList.add(
        currentDifficulty === 'easy' ? 'memory-board-easy' : 'memory-board-hard'
      );
    }

    function resetGameState(keepDifficulty) {
      lockBoard = false;
      firstCard = null;
      secondCard = null;
      moves = 0;
      matches = 0;
      gameStarted = false;
      stopTimer();
      secondsElapsed = 0;
      updateTimerDisplay();
      winMessageEl.textContent = '';

      if (!keepDifficulty) {
        // ensures difficulty matches selector on first init
        setDifficulty(difficultySelect.value);
      }

      updateStatsDisplay();
    }

    function buildBoard() {
      memoryBoard.innerHTML = '';

      const config = DIFFICULTY_CONFIG[currentDifficulty];
      const pairCount = config.pairs;

      const itemsForGame = memoryItems.slice(0, pairCount);
      const cardSymbols = shuffleArray([...itemsForGame, ...itemsForGame]);

      cardSymbols.forEach(symbol => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'memory-card';
        card.setAttribute('data-symbol', symbol);
        card.setAttribute('aria-label', 'Memory card');
        card.innerHTML = `
          <div class="memory-card-inner">
            <div class="memory-card-front">?</div>
            <div class="memory-card-back">${symbol}</div>
          </div>
        `;
        card.addEventListener('click', () => handleCardClick(card));
        memoryBoard.appendChild(card);
      });
    }

    function handleCardClick(card) {
      if (!gameStarted) return;
      if (lockBoard) return;
      if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

      card.classList.add('flipped');

      if (!firstCard) {
        firstCard = card;
        return;
      }

      secondCard = card;
      lockBoard = true;
      moves++;
      updateStatsDisplay();

      const firstSymbol = firstCard.getAttribute('data-symbol');
      const secondSymbol = secondCard.getAttribute('data-symbol');

      if (firstSymbol === secondSymbol) {
        handleMatch();
      } else {
        handleNoMatch();
      }
    }

    function handleMatch() {
      if (firstCard) firstCard.classList.add('matched', 'disabled');
      if (secondCard) secondCard.classList.add('matched', 'disabled');

      matches++;
      updateStatsDisplay();
      resetFlippedState();

      if (matches === totalPairs) {
        handleWin();
      }
    }

    function handleNoMatch() {
      setTimeout(() => {
        if (firstCard) firstCard.classList.remove('flipped');
        if (secondCard) secondCard.classList.remove('flipped');
        resetFlippedState();
      }, 1000);
    }

    function resetFlippedState() {
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }

    function handleWin() {
      gameStarted = false;
      stopTimer();
      winMessageEl.textContent = `Well done! You matched all ${totalPairs} pairs in ${moves} moves and ${formatTime(secondsElapsed)}.`;

      // Update best result
      if (currentDifficulty === 'easy') {
        if (bestEasy === null || moves < bestEasy) {
          bestEasy = moves;
          localStorage.setItem('memoryBest_easy', String(bestEasy));
        }
      } else {
        if (bestHard === null || moves < bestHard) {
          bestHard = moves;
          localStorage.setItem('memoryBest_hard', String(bestHard));
        }
      }

      updateBestDisplay();
    }

    function updateStatsDisplay() {
      movesEl.textContent = moves;
      matchesEl.textContent = `${matches}/${totalPairs}`;
    }

    /* ------------------ Timer ------------------ */

    function startTimer() {
      stopTimer();
      secondsElapsed = 0;
      updateTimerDisplay();
      timerInterval = setInterval(() => {
        secondsElapsed++;
        updateTimerDisplay();
      }, 1000);
    }

    function stopTimer() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }

    function updateTimerDisplay() {
      timerEl.textContent = formatTime(secondsElapsed);
    }

    function formatTime(totalSeconds) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const m = minutes.toString().padStart(2, '0');
      const s = seconds.toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    /* ------------------ Best scores (localStorage) ------------------ */

    function loadBestResults() {
      const easy = localStorage.getItem('memoryBest_easy');
      const hard = localStorage.getItem('memoryBest_hard');
      bestEasy = easy !== null ? Number(easy) : null;
      bestHard = hard !== null ? Number(hard) : null;
      updateBestDisplay();
    }

    function updateBestDisplay() {
      bestEasyEl.textContent = bestEasy !== null ? bestEasy : '–';
      bestHardEl.textContent = bestHard !== null ? bestHard : '–';
    }

    /* ------------------ Utility ------------------ */

    function shuffleArray(array) {
      const arr = array.slice();
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    /* ------------------ Event Listeners ------------------ */

    difficultySelect.addEventListener('change', function () {
      setDifficulty(this.value);
      resetGameState(true);
      buildBoard();
    });

    startBtn.addEventListener('click', function () {
      if (!gameStarted) {
        gameStarted = true;
        secondsElapsed = 0;
        startTimer();
        winMessageEl.textContent = '';
      }
    });

    restartBtn.addEventListener('click', function () {
      resetGameState(true);
      buildBoard();
      // Auto start new game on restart
      gameStarted = true;
      startTimer();
    });
  }
});
