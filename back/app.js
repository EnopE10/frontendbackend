document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');

    const inputField = document.createElement('textarea');
    inputField.placeholder = 'Enter JSON data';
    app.appendChild(inputField);

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    app.appendChild(submitButton);

    const dropdown = document.createElement('select');
    dropdown.multiple = true;
    const options = ['Alphabets', 'Numbers', 'Highest alphabet'];
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.toLowerCase().replace(' ', '_');
        opt.innerText = option;
        dropdown.appendChild(opt);
    });
    app.appendChild(dropdown);

    const resultDiv = document.createElement('div');
    app.appendChild(resultDiv);

    submitButton.addEventListener('click', async () => {
        try {
            const jsonInput = JSON.parse(inputField.value);
            const response = await fetch('https://ramansingh1204.github.io/Bajaj-Task-Final/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonInput)
            });
            const data = await response.json();
            resultDiv.innerHTML = '';

            const selectedOptions = Array.from(dropdown.selectedOptions).map(opt => opt.value);

            selectedOptions.forEach(option => {
                const resultItem = document.createElement('p');
                resultItem.innerText = `${option.replace('_', ' ')}: ${data[option]}`;
                resultDiv.appendChild(resultItem);
            });
        } catch (error) {
            resultDiv.innerText = 'Invalid JSON input or API error';
        }
    });
});