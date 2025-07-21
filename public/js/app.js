// Password Toggle Functionality
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(inputId + 'Eye');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        eyeIcon.className = 'fas fa-eye';
    }
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password Validation
function isValidPassword(password) {
    const minLength = 6;
    const maxLength = 20;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return password.length >= minLength && 
           password.length <= maxLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumber;
}

// Form Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add focus effects to form inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Real-time validation feedback
        input.addEventListener('input', function() {
            const errorElement = this.parentElement.querySelector('.form-error');
            if (errorElement && errorElement.textContent) {
                errorElement.textContent = '';
            }
        });
    });

    // Add loading state to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitButton.disabled = true;
                
                // Re-enable button after 5 seconds as fallback
                setTimeout(() => {
                    submitButton.disabled = false;
                    const originalText = submitButton.dataset.originalText || 'Submit';
                    submitButton.innerHTML = originalText;
                }, 5000);
            }
        });
    });

    // Store original button text
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        button.dataset.originalText = button.innerHTML;
    });

    // Add smooth transitions to dashboard cards
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn, .action-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals or go back
        if (e.key === 'Escape') {
            const alerts = document.querySelectorAll('.alert');
            alerts.forEach(alert => alert.remove());
        }
        
        // Enter key to submit forms
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            const form = e.target.closest('form');
            if (form) {
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton && !submitButton.disabled) {
                    form.requestSubmit();
                }
            }
        }
    });

    // Add session timeout warning
    let sessionTimer;
    const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
    const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before timeout
    
    function resetSessionTimer() {
        clearTimeout(sessionTimer);
        sessionTimer = setTimeout(() => {
            showSessionWarning();
        }, SESSION_TIMEOUT - WARNING_TIME);
    }
    
    function showSessionWarning() {
        const warning = document.createElement('div');
        warning.className = 'alert alert-warning session-warning';
        warning.innerHTML = `
            <i class="fas fa-clock"></i>
            Your session will expire in 5 minutes. Click anywhere to extend.
        `;
        warning.style.position = 'fixed';
        warning.style.top = '20px';
        warning.style.right = '20px';
        warning.style.zIndex = '9999';
        warning.style.maxWidth = '300px';
        
        document.body.appendChild(warning);
        
        // Remove warning after 30 seconds or on user interaction
        setTimeout(() => {
            if (warning.parentNode) {
                warning.remove();
            }
        }, 30000);
        
        // Extend session on any user interaction
        const extendSession = () => {
            warning.remove();
            resetSessionTimer();
            document.removeEventListener('click', extendSession);
            document.removeEventListener('keydown', extendSession);
        };
        
        document.addEventListener('click', extendSession);
        document.addEventListener('keydown', extendSession);
    }
    
    // Initialize session timer if user is logged in
    if (window.location.pathname === '/dashboard') {
        resetSessionTimer();
        
        // Reset timer on user activity
        ['click', 'keydown', 'mousemove', 'scroll'].forEach(event => {
            document.addEventListener(event, resetSessionTimer);
        });
    }
});

// Utility Functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
        ${message}
    `;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.maxWidth = '400px';
    notification.style.animation = 'slideInRight 0.3s ease-out';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add CSS for ripple effect and animations
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .session-warning {
        animation: slideInRight 0.3s ease-out;
    }
    
    .notification {
        animation: slideInRight 0.3s ease-out;
    }
`;
document.head.appendChild(style);
