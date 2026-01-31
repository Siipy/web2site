// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const icon = type === 'success' ? 'check-circle' : 'alert-circle';
    const color = type === 'success' ? 'text-[#00D1FF]' : 'text-red-400';
    
    toast.className = `
        glass-panel px-4 py-3 rounded-lg flex items-center gap-3 
        transform translate-x-full opacity-0 transition-all duration-300
        pointer-events-auto min-w-[200px]
    `;
    
    toast.innerHTML = `
        <i data-feather="${icon}" class="w-5 h-5 ${color}"></i>
        <span class="text-sm font-medium text-white">${message}</span>
    `;

    container.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
    });

    // Update feather icons
    if (window.feather) {
        feather.replace(toast);
    }

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Clipboard Utility
async function copyToClipboard(text, label = 'Item') {
    try {
        await navigator.clipboard.writeText(text);
        showToast(`${label} copied to clipboard`);
        return true;
    } catch (err) {
        showToast('Failed to copy', 'error');
        return false;
    }
}

// Loading Overlay Controller
window.PaymentPortal = {
    showLoading: function() {
        const overlay = document.querySelector('loading-overlay');
        if (overlay) overlay.show();
    },
    
    hideLoading: function() {
        const overlay = document.querySelector('loading-overlay');
        if (overlay) overlay.hide();
    }
};

// Expose copy function globally for components
window.copyBankDetail = copyToClipboard;

// Initialize animations on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Add intersection observer for fade-in elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all section elements
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('opacity-0'); // Start hidden
        observer.observe(section);
    });
});

// Handle security policy for new windows
function secureRedirect(url) {
    // Open immediately to avoid popup blockers
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // If blocked, show message
        showToast('Please allow popups for this site', 'error');
        // Fallback: redirect current window after confirmation
        if (confirm('Payment window blocked. Open in current tab?')) {
            window.location.href = url;
        }
    }
    
    return newWindow;
}

// Expose for components
window.secureRedirect = secureRedirect;