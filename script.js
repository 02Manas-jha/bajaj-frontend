document.getElementById('submitBtn').addEventListener('click', async () => {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorContainer = document.getElementById('error');
    const responseContainer = document.getElementById('responseContainer');
    const responseContent = document.getElementById('responseContent');

    errorContainer.textContent = '';
    responseContainer.style.display = 'none';
    responseContent.innerHTML = '';

    try {
        // Validate JSON input
        const parsedInput = JSON.parse(jsonInput);

        if (!parsedInput.data) {
            errorContainer.textContent = 'Invalid JSON: "data" field is required.';
            return;
        }

        // Call the backend API
        const response = await fetch('https://bajaj-backend-4eot.onrender.com/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedInput),
        });

        if (!response.ok) {
            throw new Error('API call failed');
        }

        const data = await response.json();
        responseContainer.style.display = 'block';

        // Handle checkbox changes
        document.getElementById('alphabetsCheckbox').addEventListener('change', () => {
            renderResponse(data);
        });
        document.getElementById('numbersCheckbox').addEventListener('change', () => {
            renderResponse(data);
        });
        document.getElementById('lowercaseCheckbox').addEventListener('change', () => {
            renderResponse(data);
        });

    } catch (err) {
        errorContainer.textContent = 'Invalid JSON format or error in API call.';
    }
});

function renderResponse(data) {
    const responseContent = document.getElementById('responseContent');
    responseContent.innerHTML = '';

    const showAlphabets = document.getElementById('alphabetsCheckbox').checked;
    const showNumbers = document.getElementById('numbersCheckbox').checked;
    const showLowercase = document.getElementById('lowercaseCheckbox').checked;

    if (showAlphabets) {
        responseContent.innerHTML += `<div><strong>Alphabets:</strong> ${data.alphabets.join(', ')}</div>`;
    }

    if (showNumbers) {
        responseContent.innerHTML += `<div><strong>Numbers:</strong> ${data.numbers.join(', ')}</div>`;
    }

    if (showLowercase) {
        responseContent.innerHTML += `<div><strong>Highest Lowercase Alphabet:</strong> ${data.highest_lowercase_alphabet.join(', ')}</div>`;
    }
}