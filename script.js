// Utility functions
const animateElement = (element, animation, duration = 300) => {
    element.classList.add(animation);
    setTimeout(() => element.classList.remove(animation), duration);
  };
  
  const revealSection = (section) => {
    section.style.opacity = '1';
    section.style.visibility = 'visible';
    section.style.maxHeight = '1000px';
  };
  
  // Typing animation utility
  const typeWriter = (element, text, speed = 50, callback = null) => {
    let i = 0;
    element.innerHTML = ""; // Clear existing content
    element.classList.add('typing-active'); // Add cursor styling
  
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
        element.classList.remove('typing-active');
        if (callback) callback();
      }
    }, speed);
  };
  
  // Game 1: Guess the Number
  let remainingGuesses = 5;
  const secretNumber = Math.floor(Math.random() * 10) + 1;
  const game1Elements = {
    input: document.getElementById("guess-input"),
    button: document.getElementById("guess-button"),
    result: document.getElementById("game1-result"),
    nextSection: document.getElementById("game2-section")
  };
  
  game1Elements.button.addEventListener("click", () => {
    const userGuess = parseInt(game1Elements.input.value);
  
    if (!userGuess || userGuess < 1 || userGuess > 10) {
      typeWriter(game1Elements.result, "⚠️ Please enter a number between 1-10", 30);
      animateElement(game1Elements.result, 'shake');
      return;
    }
  
    remainingGuesses--;
  
    if (userGuess === secretNumber) {
      typeWriter(game1Elements.result, "🎉 Correct! Unlocking Game 2...", 30, () => {
        setTimeout(() => {
          revealSection(game1Elements.nextSection);
          animateElement(game1Elements.nextSection, 'fadeInUp');
        }, 1000);
      });
    } else {
      typeWriter(game1Elements.result, `❌ Try again! ${remainingGuesses} guesses left`, 30);
      animateElement(game1Elements.input, 'shake');
  
      if (remainingGuesses <= 0) {
        game1Elements.button.disabled = true;
        typeWriter(game1Elements.result, `💀 Game Over! The number was ${secretNumber}`, 30);
      }
    }
  });
  
  // Game 2: Trivia
  const game2Elements = {
    input: document.getElementById("trivia-input"),
    button: document.getElementById("trivia-button"),
    result: document.getElementById("game2-result"),
    nextSection: document.getElementById("game3-section")
  };
  
  game2Elements.button.addEventListener("click", () => {
    const userAnswer = game2Elements.input.value.trim().toLowerCase();
  
    if (!userAnswer) {
      animateElement(game2Elements.input, 'shake');
      return;
    }
  
    if (userAnswer === "black") {
      typeWriter(game2Elements.result, "🎉 Correct! Unlocking Game 3...", 30, () => {
        setTimeout(() => {
          revealSection(game2Elements.nextSection);
          animateElement(game2Elements.nextSection, 'fadeInUp');
        }, 1000);
      });
    } else {
      typeWriter(game2Elements.result, "❌ Incorrect! Hint: Think dark...", 30);
      animateElement(game2Elements.input, 'shake');
    }
  });
  
  // Game 3: Memory Game
  const memoryGame = {
    buttons: [...document.querySelectorAll("#game3-section button")],
    result: document.getElementById("game3-result"),
    nextSection: document.getElementById("game4-section"),
    sequence: [1, 2, 3],
    userInput: []
  };
  
  memoryGame.buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      animateElement(btn, 'pulse');
      memoryGame.userInput.push(index + 1);
  
      if (memoryGame.userInput.length === memoryGame.sequence.length) {
        if (JSON.stringify(memoryGame.userInput) === JSON.stringify(memoryGame.sequence)) {
          typeWriter(memoryGame.result, "🎉 Perfect! Unlocking Game 4...", 30, () => {
            setTimeout(() => {
              revealSection(memoryGame.nextSection);
              animateElement(memoryGame.nextSection, 'fadeInUp');
            }, 1000);
          });
        } else {
          typeWriter(memoryGame.result, "❌ Wrong sequence! Try again", 30);
          animateElement(memoryGame.buttons[0].parentElement, 'shake');
          memoryGame.userInput = [];
        }
      }
    });
  });
  
  // Game 4: Alfonzo Trivia
  const finalTrivia = {
    buttons: [...document.querySelectorAll("#game4-section button")],
    result: document.getElementById("game4-result"),
    nextSection: document.getElementById("game5-section") // Unlocks Game 5
  };
  
  finalTrivia.buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.id === "option1") {
        typeWriter(finalTrivia.result, "🎉 Correct! Alfonzo is great at art! Unlocking Game 5...", 30, () => {
          btn.classList.add('correct');
          animateElement(btn, 'bounce');
          setTimeout(() => {
            revealSection(finalTrivia.nextSection);
            animateElement(finalTrivia.nextSection, 'fadeInUp');
          }, 1000);
        });
      } else {
        typeWriter(finalTrivia.result, "❌ Try again!", 30);
        animateElement(btn, 'shake');
      }
    });
  });
  
  // Game 5: Xristoforos Trivia
  const game5Elements = {
    buttons: [
      document.getElementById("xristo-option1"),
      document.getElementById("xristo-option2"),
      document.getElementById("xristo-option3"),
    ],
    result: document.getElementById("game5-result"),
    nextSection: document.getElementById("message-section") // Unlocks the final message
  };
  
  game5Elements.buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id === "xristo-option2") {
        typeWriter(game5Elements.result, "🎉 Correct! Xristoforos would definitely do that! Unlocking the final message...", 30, () => {
          button.classList.add('correct');
          animateElement(button, 'bounce');
          setTimeout(() => {
            revealSection(game5Elements.nextSection);
            animateElement(game5Elements.nextSection, 'fadeInUp');
            voiceMessage.play();
          }, 1000);
        });
      } else {
        typeWriter(game5Elements.result, "❌ Wrong! Try again!", 30);
        animateElement(button, 'shake');
      }
    });
  });
  
  // Audio System
  const voiceMessage = new Howl({
    src: ["audio/birthday.mp3"],
    html5: true,
    volume: 0.8,
    onplay: () => {
      document.getElementById("play-button").classList.add("hidden");
      document.getElementById("pause-button").classList.remove("hidden");
      animateElement(document.querySelector("#voice-message audio"), 'pulse');
    },
    onpause: () => {
      document.getElementById("play-button").classList.remove("hidden");
      document.getElementById("pause-button").classList.add("hidden");
    },
    onend: () => {
      document.getElementById("play-button").classList.remove("hidden");
      document.getElementById("pause-button").classList.add("hidden");
    }
  });
  
  document.getElementById("play-button").addEventListener("click", () => {
    voiceMessage.play();
    animateElement(document.getElementById("pause-button"), 'pulse');
  });
  
  document.getElementById("pause-button").addEventListener("click", () => {
    voiceMessage.pause();
    animateElement(document.getElementById("play-button"), 'pulse');
  });
  
  // Initialize animations
  document.querySelectorAll('.game-section').forEach(section => {
    section.style.transition = 'all 0.4s ease';
  });