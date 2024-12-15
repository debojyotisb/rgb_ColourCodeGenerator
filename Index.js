// import html2canvas from 'html2canvas';

const button1 = document.querySelector('button#B1');
const button2 = document.querySelector('button#B2');
const button3 = document.querySelector('button#downloadScreenshot')
const historyList = document.getElementById('history');
const h1 = document.querySelector('h1');

const audio = new Audio('media/click-sound.mp3');


// Initialize
let colorHistory = [];



const makeRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `RGB(${r}, ${g}, ${b})`;
};

// Function to generate a random gradient
const makeRandomGradient = () => {
    const color1 = makeRandomColor();
    const color2 = makeRandomColor();
    const angle = Math.floor(Math.random() * 360); // Random angle for the gradient
    return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
};

// Render Color History
const renderHistory = () => {
    historyList.innerHTML = '';
    colorHistory.forEach(color => {
        const li = document.createElement('li');
        li.style.background = color;
        li.title = color; // Optional: show the color code on hover
        li.addEventListener('click', () => {
            document.body.style.background = color;
           
            h1.innerText = color;
        });
        historyList.appendChild(li);
    });
};



// Change BG
button1.addEventListener('click', () => {
    let newBackground;
        // Randomly decide: plain color or gradient
        const isGradient = Math.random() < 0.5; // 50% chance for gradient or plain color

        if (isGradient) {
            newBackground = makeRandomGradient();
        } else {
            newBackground = makeRandomColor();
        }

    document.body.style.background = newBackground;
    h1.innerText = newBackground;
    // console.log("clicked")

    // Enable "Copy RGB Code" Button
    button2.style.display = "inline-block";
    button3.style.display = "inline-block";

    // Add click-to-copy functionality
    h1.addEventListener('click', () => {
        navigator.clipboard.writeText(newColor);
        alert(`Copied ${newColor} to clipboard!`);
    });

    // Add to history
    colorHistory.unshift(newBackground);
    if (colorHistory.length > 10 ) colorHistory.pop(); // Keep only last 5 colors
    renderHistory();
    
     // Play Audio
    audio.play().catch(error => {
        console.warn("Audio playback failed:", error);
    });
});

// Copy RGB Code
button2.addEventListener('click', () => {
    const color = h1.innerText;
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
});



// Download Screenshot
button3.addEventListener('click', () => {
    html2canvas(document.body).then(canvas => {
        const link = document.createElement('a');
        link.download = 'color-palette.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});