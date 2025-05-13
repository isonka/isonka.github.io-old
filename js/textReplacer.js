function replaceText() {
    try {
        // Get all h1 elements in the document
        const elements = document.querySelectorAll('h1, h2, h3, a, span, div');
        elements.forEach(element => {
            if (element.textContent && element.textContent.includes('Find a Class')) {
                element.textContent = element.textContent.replace('Find a Class', 'Book Group Class');
            }
            // Also check for text without spaces
            if (element.textContent && element.textContent.includes('FindaClass')) {
                element.textContent = element.textContent.replace('FindaClass', 'Book Group Class');
            }
        });
    } catch (e) {
        console.log('Error replacing text:', e);
    }
}

// Function to start checking for text to replace
function startChecking() {
    // Initial check
    replaceText();
    
    // Keep checking every 500ms for 30 seconds
    let attempts = 0;
    const checkInterval = setInterval(() => {
        replaceText();
        attempts++;
        
        // Stop checking after 30 seconds
        if (attempts >= 60) {
            clearInterval(checkInterval);
        }
    }, 500);
}

// Start checking when page loads
document.addEventListener('DOMContentLoaded', () => {
    startChecking();
});

// Also check when MindBody widgets finish loading
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'healcode-widget-loaded') {
        setTimeout(startChecking, 1000);
    }
});

// Check after any dynamic content loads
document.addEventListener('load', function() {
    setTimeout(replaceText, 1000);
}, true);

// Additional check for dynamic content changes
const observer = new MutationObserver(() => {
    replaceText();
});

// Start observing the document body for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});
