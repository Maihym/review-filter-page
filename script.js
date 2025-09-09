// Configuration is now loaded from config.js
// Access configuration values using CONFIG object

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

// Configuration Application
function applyConfig() {
    // Apply page content
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    const feedbackTitle = document.getElementById('feedbackTitle');
    const feedbackLabel = document.getElementById('feedbackLabel');
    const emailLabel = document.getElementById('emailLabel');
    const submitButton = document.getElementById('submitButton');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const skipReview = document.getElementById('skipReview');
    const footerText = document.getElementById('footerText');
    const ratingText = document.getElementById('ratingText');
    
    if (pageTitle) pageTitle.textContent = CONFIG.content.title;
    if (pageSubtitle) pageSubtitle.textContent = CONFIG.content.subtitle;
    if (feedbackTitle) feedbackTitle.textContent = CONFIG.content.feedbackTitle;
    if (feedbackLabel) feedbackLabel.textContent = CONFIG.content.feedbackLabel;
    if (emailLabel) emailLabel.textContent = CONFIG.content.emailLabel;
    if (submitButton) submitButton.textContent = CONFIG.content.submitButtonText;
    if (modalTitle) modalTitle.textContent = CONFIG.content.modalTitle;
    if (modalMessage) modalMessage.textContent = CONFIG.content.modalMessage;
    if (skipReview) skipReview.textContent = CONFIG.content.skipButtonText;
    if (footerText) footerText.textContent = CONFIG.content.footerText;
    if (ratingText) ratingText.textContent = CONFIG.content.starRatingPrompt;
    
    // Apply form placeholders
    const feedbackTextarea = document.getElementById('feedback');
    const emailInput = document.getElementById('email');
    if (feedbackTextarea) feedbackTextarea.placeholder = CONFIG.content.feedbackPlaceholder;
    if (emailInput) emailInput.placeholder = CONFIG.content.emailPlaceholder;
    
    // Apply theme styling
    applyTheme();
}

function applyTheme() {
    // Apply background
    document.body.style.background = CONFIG.theme.background;
    
    // Apply CSS custom properties for theme
    document.documentElement.style.setProperty('--primary-color', CONFIG.theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', CONFIG.theme.secondaryColor);
    document.documentElement.style.setProperty('--success-color', CONFIG.theme.successColor);
    document.documentElement.style.setProperty('--error-color', CONFIG.theme.errorColor);
    document.documentElement.style.setProperty('--warning-color', CONFIG.theme.warningColor);
    document.documentElement.style.setProperty('--logo-max-height', CONFIG.theme.logoMaxHeight);
    document.documentElement.style.setProperty('--logo-max-width', CONFIG.theme.logoMaxWidth);
    
    // Update submit button background to use config colors
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.style.background = `linear-gradient(135deg, ${CONFIG.theme.primaryColor} 0%, ${CONFIG.theme.secondaryColor} 100%)`;
    }
}


// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    applyConfig();
    initializeStars();
    initializeModal();
    initializeForm();
    applyButtonBackgrounds();
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
        ratingText.textContent = CONFIG.content.starRatingPrompt;
        ratingText.className = 'rating-text';
    } else {
        ratingText.textContent = CONFIG.ratingMessages[rating];
        ratingText.className = `rating-text ${rating >= 4 ? 'positive' : 'negative'}`;
    }
}

function handleRatingAction(rating) {
    if (rating < 5 && CONFIG.features.enableFeedbackForm) {
        // Show feedback form for ratings less than 5
        showFeedbackForm();
    } else if (rating === 5 && CONFIG.features.enableReviewModal) {
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
    if (CONFIG.features.enableSuccessMessages) {
        showSuccessMessage(CONFIG.content.successMessage);
    }
    
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
    
    CONFIG.reviewLinks.forEach((link, index) => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.rel = 'noopener noreferrer';
        linkElement.className = 'review-link';
        linkElement.setAttribute('data-platform', link.name.toLowerCase().replace(/\s+/g, '-'));
        linkElement.innerHTML = `
            <span class="icon">${link.icon}</span>
            <span>${link.description}</span>
        `;
        
        // Add click tracking
        if (CONFIG.features.enableAnalytics) {
            linkElement.addEventListener('click', () => {
                trackEvent('review_link_clicked', {
                    linkName: link.name,
                    linkUrl: link.url,
                    timestamp: new Date().toISOString()
                });
            });
        }
        
        reviewLinks.appendChild(linkElement);
    });
    
    // Apply background images to review links
    applyReviewButtonBackgrounds();
}

// Button Background Functions
function applyButtonBackgrounds() {
    if (!CONFIG.features.enableTouchOptimization) return;
    
    // Apply submit button background
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn && CONFIG.images.buttonBackgrounds.submitButton) {
        submitBtn.classList.add('button-with-image');
        submitBtn.style.backgroundImage = `url(${CONFIG.images.buttonBackgrounds.submitButton})`;
        submitBtn.style.background = `url(${CONFIG.images.buttonBackgrounds.submitButton}), linear-gradient(135deg, ${CONFIG.images.fallbackColors.submitButton} 0%, ${CONFIG.theme.secondaryColor} 100%)`;
    }
    
    // Apply skip button background
    const skipBtn = document.querySelector('.skip-btn');
    if (skipBtn && CONFIG.images.buttonBackgrounds.skipButton) {
        skipBtn.classList.add('button-with-image');
        skipBtn.style.backgroundImage = `url(${CONFIG.images.buttonBackgrounds.skipButton})`;
        skipBtn.style.background = `url(${CONFIG.images.buttonBackgrounds.skipButton}), ${CONFIG.images.fallbackColors.skipButton}`;
    }
}

function applyReviewButtonBackgrounds() {
    if (!CONFIG.features.enableTouchOptimization) return;
    
    const reviewLinks = document.querySelectorAll('.review-link');
    
    reviewLinks.forEach((link, index) => {
        // Get the corresponding review link config
        const reviewConfig = CONFIG.reviewLinks[index];
        
        if (reviewConfig) {
            // Apply individual background image if available
            if (reviewConfig.image) {
                link.classList.add('button-with-image');
                // Set CSS custom property for the background image
                link.style.setProperty('--bg-image', `url(${reviewConfig.image})`);
                link.style.setProperty('--bg-color', reviewConfig.fallbackColor);
                
                // Debug: Test if image loads
                const testImg = new Image();
                testImg.onload = () => console.log(`✅ Image loaded: ${reviewConfig.image}`);
                testImg.onerror = () => console.log(`❌ Image failed to load: ${reviewConfig.image}`);
                testImg.src = reviewConfig.image;
            } else {
                // Apply fallback color if no image
                link.style.setProperty('background', reviewConfig.fallbackColor, 'important');
            }
        }
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
    if (!CONFIG.features.enableAnalytics) return;
    
    console.log(`Event: ${eventName}`, data);
    
    // Here you could integrate with Google Analytics, Mixpanel, etc.
    if (CONFIG.analytics.googleAnalyticsId) {
        // Google Analytics integration would go here
        // gtag('event', eventName, data);
    }
    
    if (CONFIG.analytics.mixpanelToken) {
        // Mixpanel integration would go here
        // mixpanel.track(eventName, data);
    }
}

// Initialize analytics tracking
if (CONFIG.features.enableAnalytics) {
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
}
