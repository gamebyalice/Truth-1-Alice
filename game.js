
const truths = [
      // Friendly
      "What's your favorite memory with your best friend?",
      "If you could go anywhere with a friend, where would it be?",
      "Who do you call first when you get great news?",
      "Which friend makes you laugh the most?",
      "Who’s the most trustworthy person you know?",
      "Have you ever helped a friend with a secret task?",
      "Do you remember your first friend? What were they like?",

      // Emotional
      "Have you ever cried during a movie?",
      "What makes you feel truly happy?",
      "What do you miss most about childhood?",
      "Have you ever written someone a heartfelt letter?",
      "What song makes you emotional?",
      "Do you forgive easily or hold grudges?",
      "When was the last time you felt deeply proud of yourself?",

      // Funny
      "What’s the most ridiculous thing you believed as a kid?",
      "If animals could talk, which would be the rudest?",
      "Have you ever talked to yourself in public accidentally?",
      "What’s the funniest dream you've ever had?",
      "What’s your weirdest talent?",
      "If you were a food, what would you be and why?",
      "What’s the dumbest way you’ve gotten injured?",

      // Nonsense but not stupid
      "Would you rather fight 1 duck-sized horse or 10 horse-sized ducks?",
      "If your life was a meme, what would the caption be?",
      "What’s your theme song if you entered a room?",
      "If you could be a fruit, which one and why?",
      "If aliens came today, what would you show them first?",
      "Would you rather time travel or pause time?",
      "If you could have any cartoon ability, what would it be?",

      // More
      "Have you ever kept a diary or journal?",
      "What’s something silly you’re secretly good at?",
      "What’s your most used emoji?",
      "If you opened a store, what would you sell?",
      "What fictional character do you relate to most?",
      "Have you ever sung in the shower like you're on stage?",
      "What’s the most bizarre thing you've googled?",
      "What’s your go-to comfort food?",
      "What’s a song you secretly love but never admit?",
      "If your life was a video game, what level are you on?",
      "What’s a superstition you still believe in?",
      "If you could rename yourself, what would it be?",
      "Have you ever made up a word?",
      "If you had a warning label, what would it say?"
    ];

    const dares = [
      "Try to say a tongue twister 3 times fast.",
      "Do 5 jumping jacks and 5 squats!",
      "Say the alphabet backward.",
      "Pretend to be your favorite animal for 30 seconds.",
      "Sing your favorite childhood song.",
      "Do your best evil laugh!",
      "Balance a spoon on your nose.",
      "Speak in a robot voice for the next round.",
      "Tell a joke so bad it's good.",
      "Mimic a celebrity until someone guesses who it is.",
      "Walk like a model down a pretend runway.",
      "Act like you’re stuck in slow motion.",
      "Say something nice about everyone in the room.",
      "Try to juggle 2 items right now.",
      "Create a new handshake and show it to someone.",
      "Try to do a backbend (or fake it!).",
      "Invent a new word and define it.",
      "Make a face that no one else in the room can copy.",
      "Pretend you’re a newscaster reporting from Mars.",
      "Do an impression of your favorite cartoon character.",
      "Act out a scene from your favorite movie.",
      "Try to touch your nose with your tongue.",
      "Make a silly sound and don’t stop until someone laughs.",
      "Say something in a dramatic opera voice.",
      "Use a funny accent to introduce yourself."
    ];


    let players = [], currentPlayer = '', scores = {}, round = 1, currentQuestion = '', currentMode = 'computer';

    function startGame() {
      document.getElementById('welcomeScreen').style.display = 'none';
      document.getElementById('gameScreen').style.display = 'block';
      updatePlayerOptions();
    }

    function updatePlayerOptions() {
      const mode = document.getElementById('modeSelect').value;
      currentMode = mode;
      if (mode === 'friends') {
        document.getElementById('playerSelection').style.display = 'block';
        document.getElementById('playerNameInputComputer').style.display = 'none';
        document.getElementById('startGameBtnContainerComputer').style.display = 'none';
      } else {
        document.getElementById('playerSelection').style.display = 'none';
        document.getElementById('playerNameInputComputer').style.display = 'block';
        document.getElementById('startGameBtnContainerComputer').style.display = 'block';
      }
    }

    function showPlayerInputs() {
      const num = parseInt(document.getElementById('numPlayers').value);
      const container = document.getElementById('playerNames');
      container.innerHTML = '';
      for (let i = 1; i <= num; i++) {
        container.innerHTML += `<label>Player ${i} Name:</label><br><input type="text" id="player${i}" placeholder="Enter name or leave empty" />`;
      }
    }

    function startSelectedGame() {
      if (currentMode === 'friends') {
        players = [];
        const num = parseInt(document.getElementById('numPlayers').value);
        for (let i = 1; i <= num; i++) {
          let name = document.getElementById(`player${i}`).value.trim();
          players.push(name || `Player ${i}`);
        }
      } else {
        const customName = document.getElementById('customPlayerName').value.trim();
        const playerName = customName || 'You';
        players = [playerName, 'Computer'];
      }

      scores = {};
      players.forEach(p => scores[p] = 0);

      document.getElementById('gameScreen').style.display = 'none';
      document.getElementById('gameActions').style.display = 'block';

      spinWheel();  // Start the game by spinning the wheel first
    }

    function spinWheel() {
      const spinner = document.getElementById('spinnerText');
      spinner.style.display = 'block';
      spinner.textContent = 'Spinning...';
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * players.length);
        currentPlayer = players[randomIndex];
        spinner.textContent = `${currentPlayer === 'You' ? "Your" : currentPlayer}'s turn!`;  // Display player's turn (handling 'You')

        ask('truth');  // Ask the question after the wheel spin is complete
      }, 2000); // Wait for 2 seconds to simulate wheel spin
    }

    function ask(type) {
      const list = type === 'truth' ? truths : dares;
      currentQuestion = list[Math.floor(Math.random() * list.length)];
      document.getElementById('questionBox').textContent = `${currentPlayer === 'You' ? "Your" : currentPlayer}'s ${type.toUpperCase()} is: ${currentQuestion}`; // Consistent format

      if (currentPlayer === 'Computer') {
        const autoAnswer = computerAnswers[type][Math.floor(Math.random() * computerAnswers[type].length)];
        setTimeout(() => {
          alert(`Computer's ${type.toUpperCase()} answer: ${autoAnswer}`);
          scores[currentPlayer]++;
          round++;
          updateScoreboard();
          document.getElementById('roundInfo').textContent = `Round ${round}`;
          document.getElementById('nextRoundBtnContainer').style.display = 'block';
          document.getElementById('restartGameBtnContainer').style.display = 'block';
        }, 2000);
      }
    }

    function submitReply() {
      const reply = document.getElementById('replyInput').value.trim();
      if (!reply) return alert('Please type a reply.');
      alert(`${currentPlayer === 'You' ? "Your" : currentPlayer} answered: ${reply}`);
      scores[currentPlayer]++;
      round++;
      document.getElementById('replyInput').value = '';
      updateScoreboard();
      document.getElementById('roundInfo').textContent = `Round ${round}`;
      document.getElementById('nextRoundBtnContainer').style.display = 'block';
      document.getElementById('restartGameBtnContainer').style.display = 'block';
    }

    function nextRound() {
      spinWheel(); // Ensure the wheel spins when moving to the next round
    }

    function restartGame() {
      round = 1;
      players = [];
      scores = {};
      document.getElementById('gameActions').style.display = 'none';
      document.getElementById('welcomeScreen').style.display = 'block';
    }

    function updateScoreboard() {
      const scoreboard = document.getElementById('scoreboard');
      scoreboard.innerHTML = '<h2>Scoreboard</h2>';
      for (const player in scores) {
        scoreboard.innerHTML += `<p>${player}: ${scores[player]}</p>`;
      }
    }
