// Configuration - Easy to modify review links
const REVIEW_LINKS = [
    {
        name: 'Google Reviews',
        url: 'https://www.google.com/search?q=First+Electric+reviews',
        icon: '🔍'
    },
    {
        name: 'Yelp',
        url: 'https://www.yelp.com/biz/first-electric',
        icon: '⭐'
    },
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/firstelectric/reviews',
        icon: '📘'
    },
    {
        name: 'Better Business Bureau',
        url: 'https://www.bbb.org/profile/first-electric',
        icon: '🏆'
    },
    {
        name: 'Angie\'s List',
        url: 'https://www.angi.com/companylist/us/electrical-contractors/first-electric.htm',
        icon: '📋'
    }
];

// Rating messages
const RATING_MESSAGES = {
    1: 'We\'re sorry to hear that. Please help us improve.',
    2: 'We appreciate your feedback. Let\'s make it better.',
    3: 'Thank you for your feedback. We can do better.',
    4: 'Good to hear! We\'re almost there.',
    5: 'Excellent! Thank you for the 5-star rating!'
};

// DOM Elements
const stars = document.querySelectorAll('.star');
const ratingText = document.getElementById('ratingText');
const feedbackForm = document.getElementById('feedbackForm');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const skipReview = document.getElementById('skipReview');
const reviewLinks = document.getElementById('reviewLinks');
const improvementForm = document.getElementById('improvementForm');

// State
let currentRating = 0;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeStars();
    initializeModal();
    initializeForm();
});

// Star Rating Functionality
function initializeStars() {
    stars.forEach((star, index) => {
        star.addEventListener('click', () => handleStarClick(index + 1));
        star.addEventListener('mouseenter', () => handleStarHover(index + 1));
    });

    // Add mouse leave event to reset stars
    document.querySelector('.stars').addEventListener('mouseleave', resetStars);
}

function handleStarClick(rating) {
    currentRating = rating;
    updateStars(rating);
    updateRatingText(rating);
    handleRatingAction(rating);
}

function handleStarHover(rating) {
    updateStars(rating);
}

function resetStars() {
    if (currentRating === 0) {
        updateStars(0);
    } else {
        updateStars(currentRating);
    }
}

function updateStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function updateRatingText(rating) {
    if (rating === 0) {
        ratingText.textContent = 'Tap a star to rate';
        ratingText.className = 'rating-text';
    } else {
        ratingText.textContent = RATING_MESSAGES[rating];
        ratingText.className = `rating-text ${rating >= 4 ? 'positive' : 'negative'}`;
    }
}

function handleRatingAction(rating) {
    if (rating < 5) {
        // Show feedback form for ratings less than 5
        showFeedbackForm();
    } else {
        // Show review links modal for 5-star rating
        showReviewModal();
    }
}

// Feedback Form Functionality
function showFeedbackForm() {
    feedbackForm.style.display = 'block';
    modalOverlay.style.display = 'none';
    
    // Scroll to form
    feedbackForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function initializeForm() {
    improvementForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(improvementForm);
    const feedback = formData.get('feedback');
    const email = formData.get('email');
    
    // Here you would typically send the data to your server
    console.log('Feedback submitted:', { rating: currentRating, feedback, email });
    
    // Show success message
    showSuccessMessage('Thank you for your feedback! We\'ll use it to improve our service.');
    
    // Reset form
    improvementForm.reset();
    feedbackForm.style.display = 'none';
}

// Review Modal Functionality
function showReviewModal() {
    generateReviewLinks();
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function initializeModal() {
    closeModal.addEventListener('click', hideModal);
    skipReview.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', handleModalOverlayClick);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            hideModal();
        }
    });
}

function hideModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function handleModalOverlayClick(e) {
    if (e.target === modalOverlay) {
        hideModal();
    }
}

function generateReviewLinks() {
    reviewLinks.innerHTML = '';
    
    REVIEW_LINKS.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.rel = 'noopener noreferrer';
        linkElement.className = 'review-link';
        linkElement.innerHTML = `
            <span class="icon">${link.icon}</span>
            <span>Leave a review on ${link.name}</span>
        `;
        
        // Add click tracking
        linkElement.addEventListener('click', () => {
            console.log(`Review link clicked: ${link.name}`);
            // Here you could send analytics data
        });
        
        reviewLinks.appendChild(linkElement);
    });
}

// Utility Functions
function showSuccessMessage(message) {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #28a745;
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        font-weight: 600;
        animation: slideDown 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// Add CSS for success message animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Analytics and tracking (optional)
function trackEvent(eventName, data = {}) {
    console.log(`Event: ${eventName}`, data);
    // Here you could integrate with Google Analytics, Mixpanel, etc.
}

// Track page load
trackEvent('page_loaded', {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
});

// Track star ratings
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        trackEvent('star_rating_clicked', {
            rating: index + 1,
            timestamp: new Date().toISOString()
        });
    });
});

// Track form submissions
improvementForm.addEventListener('submit', () => {
    trackEvent('feedback_form_submitted', {
        rating: currentRating,
        timestamp: new Date().toISOString()
    });
});

// Track review link clicks
document.addEventListener('click', (e) => {
    if (e.target.closest('.review-link')) {
        const linkName = e.target.closest('.review-link').textContent.trim();
        trackEvent('review_link_clicked', {
            linkName: linkName,
            timestamp: new Date().toISOString()
        });
    }
});
