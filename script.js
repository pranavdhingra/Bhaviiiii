// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    // Set initial page
    showPage('welcome');
});

// ===================================
// FLOATING HEARTS BACKGROUND
// ===================================
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💓'];
    
    // Create 15 floating hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
            container.appendChild(heart);
        }, i * 200);
    }
    
    // Continuously add new hearts
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 2000);
}

// ===================================
// PAGE NAVIGATION
// ===================================
function showPage(pageId) {
    // Remove active class from all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.classList.contains('active')) {
            page.classList.add('page-transition-exit');
            setTimeout(() => {
                page.classList.remove('active', 'page-transition-exit');
            }, 600);
        }
    });
    
    // Show new page with animation
    setTimeout(() => {
        const newPage = document.getElementById(pageId);
        newPage.classList.add('active');
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 600);
}

function startJourney() {
    showPage('chapter1');
}

function nextChapter(chapterNumber) {
    if (chapterNumber <= 5) {
        showPage('chapter' + chapterNumber);
    } else {
        showPage('proposal');
    }
}

// ===================================
// PROPOSAL PAGE INTERACTIONS
// ===================================
function handleYes() {
    // Create celebration effect
    createConfetti();
    
    // Show celebration page
    setTimeout(() => {
        showPage('celebration');
        
        // Continue confetti on celebration page
        setInterval(() => {
            createConfetti();
        }, 500);
    }, 800);
}

function handleNo() {
    const message = document.getElementById('playfulMessage');
    message.classList.add('show');
    
    // Shake the "No" button
    const noButton = document.querySelector('.btn-no');
    noButton.style.animation = 'shake 0.5s';
    
    setTimeout(() => {
        noButton.style.animation = '';
    }, 500);
    
    // Hide message after 3 seconds
    setTimeout(() => {
        message.classList.remove('show');
    }, 3000);
}

// Shake animation for "No" button
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ===================================
// CONFETTI ANIMATION
// ===================================
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    
    const colors = ['#FFB6C1', '#FF69B4', '#FFD700', '#FF1493', '#FFC0CB', '#DC143C'];
    const shapes = ['circle', 'square'];
    
    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 5;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 2 + 2;
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            confetti.style.background = color;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.left = left + '%';
            confetti.style.animationDuration = animationDuration + 's';
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            }
            
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, animationDuration * 1000);
        }, i * 30);
    }
}

// ===================================
// SPARKLE EFFECT ON MOUSE MOVE
// ===================================
let sparkleTimeout;
document.addEventListener('mousemove', function(e) {
    clearTimeout(sparkleTimeout);
    sparkleTimeout = setTimeout(() => {
        createSparkle(e.pageX, e.pageY);
    }, 100);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#FFD700';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkleFade 0.8s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 800);
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFade {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// ===================================
// PHOTO REPLACEMENT HELPER
// ===================================
// This function helps you easily replace placeholder images with actual photos
// Usage: Call replacePhoto(photoNumber, 'path/to/your/image.jpg') in browser console
// Or modify the HTML directly by adding <img src="your-image.jpg" alt="Memory"> inside the photo-placeholder div

function replacePhoto(photoNumber, imagePath) {
    const placeholder = document.getElementById('photo' + photoNumber);
    if (placeholder) {
        placeholder.innerHTML = `<img src="${imagePath}" alt="Our Memory">`;
    }
}

// ===================================
// STORY TEXT REPLACEMENT HELPER
// ===================================
// This function helps you easily replace placeholder stories with actual memories
// Usage: Call replaceStory(storyNumber, 'Your actual story text here') in browser console
// Or modify the HTML directly by editing the text in the story-text paragraph

function replaceStory(storyNumber, storyText) {
    const story = document.getElementById('story' + storyNumber);
    if (story) {
        story.textContent = storyText;
    }
}

// ===================================
// UTILITY: LOG INSTRUCTIONS FOR CUSTOMIZATION
// ===================================
console.log('%c💖 Welcome to Bhaviiiii\'s Love Journey! 💖', 'font-size: 20px; color: #FF69B4; font-weight: bold;');
console.log('%cCustomization Instructions:', 'font-size: 16px; color: #DC143C; font-weight: bold;');
console.log('%c1. To replace photos:', 'font-size: 14px; color: #4A4A4A;');
console.log('%c   - Edit index.html and replace the photo-placeholder div content with:', 'font-size: 12px;');
console.log('%c   <img src="path/to/your/photo.jpg" alt="Memory">', 'font-size: 12px; font-family: monospace; background: #f0f0f0; padding: 5px;');
console.log('%c2. To replace stories:', 'font-size: 14px; color: #4A4A4A;');
console.log('%c   - Edit the text inside the <p class="story-text" id="storyX"> tags in index.html', 'font-size: 12px;');
console.log('%c3. Quick test functions:', 'font-size: 14px; color: #4A4A4A;');
console.log('%c   - replacePhoto(1, "image.jpg") - Replace photo 1', 'font-size: 12px; font-family: monospace;');
console.log('%c   - replaceStory(1, "text") - Replace story 1', 'font-size: 12px; font-family: monospace;');
console.log('%c\nMade with ❤️ for Bhavika', 'font-size: 14px; color: #FF69B4; font-style: italic;');

// ===================================
// PLAYFUL 'NO' BUTTON LOGIC
// ===================================
function moveButton() {
    const noButton = document.querySelector('.btn-no');
    
    // Get viewport dimensions
    const maxWidth = window.innerWidth - noButton.offsetWidth;
    const maxHeight = window.innerHeight - noButton.offsetHeight;
    
    // Calculate random position
    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);
    
    // Apply new position
    noButton.style.position = 'fixed'; // Use fixed to move relative to viewport
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
    
    // Add a playful rotation
    const rotation = Math.random() * 20 - 10; // Random rotation between -10 and 10 degrees
    noButton.style.transform = 'rotate(' + rotation + 'deg)';
}

