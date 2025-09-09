// Configuration file for First Electric Review Filter Page
// Easy to modify review links, messages, and customization settings

const CONFIG = {
    // Company Information
    company: {
        name: "First Electric",
        website: "https://www.firstelectric.pro",
        email: "contact@firstelectric.pro",
        phone: "(657) 239-6331"
    },

    // Review Links Configuration
    reviewLinks: [
        {
            name: 'Google Reviews',
            url: 'https://g.page/r/Cf8jN7M5sbJsEBM/review',
            icon: '',
            description: '',
            image: 'images/google.svg', // Path to background image (e.g., 'images/google-bg.svg')
            fallbackColor: '' // Google blue
        },
        {
            name: 'Yelp',
            url: 'https://www.yelp.com/biz/first-electric-la-mirada-4',
            icon: '',
            description: '',
            image: 'images/yelp.svg', // Path to background image (e.g., 'images/yelp-bg.webp')
            fallbackColor: '#ff1a1a' // Yelp red
        }
    ],

    // Rating Messages
    ratingMessages: {
        1: 'We\'re sorry to hear that. Please help us improve.',
        2: 'We appreciate your feedback. Let\'s make it better.',
        3: 'Thank you for your feedback. We can do better.',
        4: 'Good to hear! We\'re almost there.',
        5: 'Excellent! Thank you for the 5-star rating!'
    },

    // Page Content
    content: {
        title: 'How was your experience?',
        subtitle: 'Your feedback helps us improve our service',
        feedbackTitle: 'Help us improve',
        feedbackPlaceholder: 'Please share your feedback...',
        emailPlaceholder: 'your@email.com',
        submitButtonText: 'Submit Feedback',
        modalTitle: 'Thank you for the 5-star rating! 🌟',
        modalMessage: 'We\'d love it if you could share your experience with others!',
        skipButtonText: 'Skip for now',
        successMessage: 'Thank you for your feedback! We\'ll use it to improve our service.',
        footerText: '© 2025 First Electric. All rights reserved.',
        // Star rating text
        starRatingPrompt: 'Tap a star to rate',
        // Form labels
        feedbackLabel: 'What could we do better?',
        emailLabel: 'Email (optional)'
    },

    // Form Configuration
    form: {
        requireEmail: false,
        requireFeedback: true,
        maxFeedbackLength: 1000,
        maxEmailLength: 100
    },

    // Analytics Configuration
    analytics: {
        enabled: true,
        trackEvents: true,
        // Add your analytics tracking ID here
        googleAnalyticsId: null,
        // Add other analytics services as needed
        mixpanelToken: null
    },

    // Theme Configuration
    theme: {
        // Main colors - change these to customize your website
        primaryColor: '#667eea',        // Main brand color (buttons, links)
        secondaryColor: '#764ba2',      // Secondary brand color (gradients)
        successColor: '#28a745',        // Success messages (green)
        errorColor: '#dc3545',          // Error messages (red)
        warningColor: '#ffc107',        // Warning messages (yellow)
        
        // Background - you can use gradients, solid colors, or images
        background: '#8b7b4f',
        // Alternative backgrounds you can try:
        // background: '#667eea',  // Solid color
        // background: 'url("images/background.jpg") center/cover no-repeat',  // Image
        
        // Logo sizing
        logoMaxHeight: '300px',
        logoMaxWidth: '300px',
        
        // Typography
        titleFontSize: '2.5rem',
        subtitleFontSize: '1.1rem',
        
        // Layout
        containerMaxWidth: '600px',
        mainContentMaxWidth: '500px'
    },

    // Image Configuration
    images: {
        // Button background images (supports SVG, WebP, PNG, JPG)
        buttonBackgrounds: {
            submitButton: null, // Path to image file (e.g., 'images/button-bg.svg')
            reviewButton: null, // Path to image file for review buttons
            skipButton: null    // Path to image file for skip button
        },
        // Fallback colors if images are not provided
        fallbackColors: {
            submitButton: '#667eea',
            reviewButton: '#f8f9fa',
            skipButton: 'transparent'
        }
    },

    // Touch Target Configuration (Mobile Optimization)
    touchTargets: {
        // Minimum touch target size (44px recommended by Apple, 48px by Google)
        minSize: '48px',
        // Touch target sizes for different elements
        starSize: '60px',        // Large stars for easy tapping
        buttonHeight: '56px',    // Tall buttons for easy tapping
        reviewLinkHeight: '56px', // Tall review links
        closeButtonSize: '48px',  // Close button size
        // Spacing between touch targets
        minSpacing: '8px'
    },

    // Feature Flags
    features: {
        enableFeedbackForm: true,
        enableReviewModal: true,
        enableAnalytics: true,
        enableSuccessMessages: true,
        enableKeyboardNavigation: true,
        enableTouchOptimization: true
    },

    // API Configuration (for future backend integration)
    api: {
        baseUrl: null, // Set this when you have a backend
        endpoints: {
            submitFeedback: '/api/feedback',
            trackEvent: '/api/analytics'
        },
        timeout: 5000
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
