// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initApp();
});

function initApp() {
    // Add a simple welcome message to the console
    console.log('Website loaded successfully!');

    // Get the main heading
    const mainHeading = document.querySelector('h1');
    
    // Add a simple hover effect
    if (mainHeading) {
        mainHeading.addEventListener('mouseover', () => {
            mainHeading.style.color = '#007bff';
        });
        
        mainHeading.addEventListener('mouseout', () => {
            mainHeading.style.color = '#333';
        });
    }

    // Add current year to the page if there's a year span
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Update the books array with more professional details
const books = [
    {
        id: 1,
        title: "Modern JavaScript for the Impatient",
        author: "Cay S. Horstmann",
        price: 49.99,
        image: "https://via.placeholder.com/200x300",
        category: "JavaScript",
        rating: 4.5,
        isBestseller: true,
        reviews: 128
    },
    {
        id: 2,
        title: "Python Crash Course",
        author: "Eric Matthes",
        price: 39.99,
        image: "https://via.placeholder.com/200x300",
        category: "Python",
        rating: 4.8,
        isBestseller: true,
        reviews: 245
    },
    {
        id: 3,
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        price: 44.99,
        image: "https://via.placeholder.com/200x300",
        category: "Software Engineering",
        rating: 4.9,
        isBestseller: true,
        reviews: 189
    },
    {
        id: 4,
        title: "Learning React: Modern Patterns for Developing React Apps",
        author: "Alex Banks & Eve Porcello",
        price: 45.99,
        image: "https://via.placeholder.com/200x300",
        category: "React",
        rating: 4.6,
        isBestseller: false,
        reviews: 156
    }
];

// Cart functionality
let cart = [];

function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        cart.push(book);
        updateCartCount();
        showNotification('Book added to cart!');
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Slider functionality
let currentSlide = 0;
const slides = [
    {
        title: "Master Modern Web Development",
        description: "Discover the latest books on React, Node.js, and Modern JavaScript",
        image: "https://via.placeholder.com/500x300"
    },
    {
        title: "Learn Data Science",
        description: "Explore Python, R, and Machine Learning concepts",
        image: "https://via.placeholder.com/500x300"
    },
    {
        title: "Cloud Computing Excellence",
        description: "Master AWS, Azure, and Google Cloud Platform",
        image: "https://via.placeholder.com/500x300"
    }
];

function updateSlider() {
    const sliderContent = document.querySelector('.slider-content');
    if (!sliderContent) return;

    const slide = slides[currentSlide];
    sliderContent.innerHTML = `
        <div class="slide active">
            <div class="slide-content">
                <h2>${slide.title}</h2>
                <p>${slide.description}</p>
                <a href="#shop-now" class="btn">Shop Now</a>
            </div>
            <div class="slide-image">
                <img src="${slide.image}" alt="${slide.title}">
            </div>
        </div>
    `;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

// Update the populateFeaturedBooks function to include ratings and badges
function populateFeaturedBooks() {
    const bookGrid = document.querySelector('.book-grid');
    if (!bookGrid) return;

    bookGrid.innerHTML = books.map(book => `
        <div class="book-card">
            ${book.isBestseller ? '<span class="badge">Bestseller</span>' : ''}
            <img src="${book.image}" alt="${book.title}">
            <div class="rating">
                ${generateStarRating(book.rating)}
                <span class="reviews">(${book.reviews})</span>
            </div>
            <h3>${book.title}</h3>
            <p class="author">by ${book.author}</p>
            <p class="price">$${book.price.toFixed(2)}</p>
            <button class="btn" onclick="addToCart(${book.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Helper function to generate star ratings
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return `
        ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
        ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
        ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
    `;
}

// Newsletter form handling
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
        showNotification('Thank you for subscribing!');
        e.target.reset();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Update current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Initialize slider
    updateSlider();
    setInterval(nextSlide, 5000); // Auto-advance every 5 seconds

    // Add slider controls
    const prevButton = document.querySelector('.slider-controls .prev');
    const nextButton = document.querySelector('.slider-controls .next');
    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);

    // Populate featured books
    populateFeaturedBooks();

    // Initialize newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Initialize cart
    updateCartCount();
});
