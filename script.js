
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const countdownScreen = document.getElementById('countdown-screen');
  const countdownNumber = document.getElementById('countdown-number');
  const matrixCanvas = document.getElementById('matrix-canvas');
  const catAnimation = document.getElementById('cat-animation');
  const cardContainer = document.getElementById('card-container');
  const card = document.querySelector('.card');
  const music = document.getElementById('background-music');
  const quoteScreen = document.getElementById('quote-screen');

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    countdownScreen.classList.remove('hidden');
    startCountdown();
  }, 3000);

  function startCountdown() {
    let count = 3;
    const interval = setInterval(() => {
      countdownNumber.textContent = count;
      if (count === 1) {
        clearInterval(interval);
        setTimeout(() => {
          countdownScreen.classList.add('hidden');
          matrixCanvas.classList.remove('hidden');
          runMatrixAnimation();
        }, 1000);
      }
      count--;
    }, 1000);
  }

  function runMatrixAnimation() {
    const canvas = matrixCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'SORRY';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const targetText = "SORRY SHAHANA JI 💗";
    let revealedText = "";
    let textIndex = 0;

    function draw() {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff69b4';
      ctx.font = `${fontSize}px 'Segoe UI', cursive`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      if (textIndex < targetText.length) {
        revealedText += targetText[textIndex];
        textIndex++;
      }

      ctx.fillStyle = '#ff1493';
      ctx.font = 'bold 4vw "Dancing Script", cursive';
      const textWidth = ctx.measureText(revealedText).width;
      ctx.fillText(revealedText, (canvas.width - textWidth) / 2, canvas.height / 2);
    }

    const matrixInterval = setInterval(draw, 50);

    setTimeout(() => {
      clearInterval(matrixInterval);
      matrixCanvas.classList.add('hidden');
      catAnimation.classList.remove('hidden');

      setTimeout(() => {
        catAnimation.classList.add('hidden');
        quoteScreen.classList.remove('hidden');

        setTimeout(() => {
          quoteScreen.classList.add('hidden');
          cardContainer.classList.remove('hidden');
        }, 4000);
      }, 5000);
    }, 10000);
  }

  // Updated 3-face card flip logic
  if (card) {
    let faceIndex = 1;
    card.classList.add('face-1');

    card.addEventListener('click', () => {
      faceIndex++;
      if (faceIndex > 3) faceIndex = 1;

      card.classList.remove('face-1', 'face-2', 'face-3');
      card.classList.add(`face-${faceIndex}`);
    });
  }

  function createHearts() {
    const heartsContainer = document.querySelector('.hearts');
    for (let i = 0; i < 30; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.textContent = '💖';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${3 + Math.random() * 5}s`;
      heart.style.fontSize = `${1 + Math.random() * 2}em`;
      heart.style.top = `${Math.random() * 100}vh`;
      heartsContainer.appendChild(heart);
    }
  }

  createHearts();
});

// Music play function
function playMusic() {
  const audio = document.getElementById("background-music");
  if (audio) {
    audio.play().catch((e) => {
      console.log("Playback error:", e);
    });
  }
}
