// --- Quick Exit Functionality ---
// This function redirects the user to a neutral page (Google)
// It's designed to not leave the current site in the browser history.
function quickExit() {
    // Using location.replace to avoid adding to browser history
    window.location.replace('https://www.google.com');
}

// Global Quick Exit via Escape Key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        quickExit();
    }
});


// --- Copy to Clipboard Functionality ---
function copyText(buttonElement) {
    const preElement = buttonElement.previousElementSibling;
    const textToCopy = preElement.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
        // Success!
        buttonElement.innerText = 'Copied!';
        setTimeout(() => {
            buttonElement.innerText = 'Copy';
        }, 2000); // Reset button text after 2 seconds
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// --- State Search Filter Functionality ---
function filterStates() {
    // Get input value and convert to uppercase for case-insensitive search
    const input = document.getElementById('state-search');
    const filter = input.value.toUpperCase();

    // Get the container for the state cards
    const stateList = document.getElementById('state-list');
    const states = stateList.getElementsByClassName('state-card');

    // Loop through all state cards, and hide those who don't match the search query
    for (let i = 0; i < states.length; i++) {
        const h4 = states[i].getElementsByTagName("h4")[0];
        const txtValue = h4.textContent || h4.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            states[i].style.display = "";
        } else {
            states[i].style.display = "none";
        }
    }
}

// --- Progress Tracker Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.tracker-checkbox');
    if (checkboxes.length > 0) {
        // Load saved state from localStorage
        checkboxes.forEach(checkbox => {
            const savedState = localStorage.getItem(checkbox.id);
            if (savedState === 'true') {
                checkbox.checked = true;
            }
            
            // Listen for changes and save to localStorage
            checkbox.addEventListener('change', function() {
                localStorage.setItem(this.id, this.checked);
            });
        });
    }
});