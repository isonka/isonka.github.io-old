function replaceText() {
    try {
        // Try to access iframe content
        const iframes = document.getElementsByTagName('iframe');
        for (let iframe of iframes) {
            if (iframe.contentDocument && iframe.contentDocument.body) {
                const h1Elements = iframe.contentDocument.querySelectorAll('h1');
                h1Elements.forEach(element => {
                    if (element.textContent.includes('Find a Class')) {
                        element.textContent = 'Group Class';
                    }
                });
            }
        }
    } catch (e) {
        console.log('Waiting for iframe to be accessible...');
    }
}

// Check periodically for iframe content
function startChecking() {
    // Check every 500ms for 30 seconds (60 attempts)
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
document.addEventListener('DOMContentLoaded', startChecking);

// Also check when MindBody widgets finish loading
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'healcode-widget-loaded') {
        setTimeout(startChecking, 1000);
    }
});
