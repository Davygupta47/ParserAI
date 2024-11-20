const resultBtn = document.getElementById('resultBtn');
const browseBtn = document.getElementById('browseBtn');
const previewArea = document.getElementById('previewArea');
const previewText = document.getElementById('previewText');
const magnifier = document.querySelector('.magnifier');

let selectedFile = null;

// Browse Button Logic
browseBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.pdf,.doc,.docx';
    input.onchange = (e) => {
        selectedFile = e.target.files[0];
        browseBtn.textContent = selectedFile.name; // Update the button text
        resultBtn.disabled = false; // Enable Result button
        previewText.textContent = 'File selected. Click "Result" to parse.';
    };
    input.click();
});

// Result Button Logic
resultBtn.addEventListener('click', () => {
    if (selectedFile) {
        // Mock parsing logic, update this when actual parsing is added
        previewText.textContent = `Parsed content of ${selectedFile.name}`;
    }
});

// Magnifier Logic
previewArea.addEventListener('mousemove', (e) => {
    const rect = previewArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    magnifier.style.left = `${x - 50}px`; // Center the magnifier
    magnifier.style.top = `${y - 50}px`;
    magnifier.style.opacity = '1';
});

previewArea.addEventListener('mouseleave', () => {
    magnifier.style.opacity = '0'; // Hide magnifier
});
