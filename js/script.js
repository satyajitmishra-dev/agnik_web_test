// Get all input elements
        const redInput = document.getElementById('redInput');
        const greenInput = document.getElementById('greenInput');
        const blueInput = document.getElementById('blueInput');
        const numCirclesInput = document.getElementById('numCirclesInput');

        // Get buttons
        const submitBtn = document.getElementById('submitBtn');
        const startBtn = document.getElementById('startBtn');
        const resetBtn = document.getElementById('resetBtn');

        // Get circle rows
        const redRow = document.getElementById('redRow');
        const greenRow = document.getElementById('greenRow');
        const blueRow = document.getElementById('blueRow');

        // Get sections
        const circlesSection = document.getElementById('circlesSection');
        const controlButtons = document.getElementById('controlButtons');

        // State variables
        let timeoutIds = [];

        // Validate and create circles
        submitBtn.addEventListener('click', function() {
            const numCircles = parseInt(numCirclesInput.value);

            if (isNaN(numCircles) || numCircles < 1 || numCircles > 10) {
                alert('Please enter a number between 1 and 10');
                return;
            }

            // Clear previous circles
            redRow.innerHTML = '';
            greenRow.innerHTML = '';
            blueRow.innerHTML = '';

            // Create circles
            for (let i = 0; i < numCircles; i++) {
                const redCircle = document.createElement('div');
                redCircle.className = 'circle red show';
                redRow.appendChild(redCircle);

                const greenCircle = document.createElement('div');
                greenCircle.className = 'circle green show';
                greenRow.appendChild(greenCircle);

                const blueCircle = document.createElement('div');
                blueCircle.className = 'circle blue show';
                blueRow.appendChild(blueCircle);
            }

            // Show circles section
            circlesSection.classList.add('show');
            controlButtons.classList.add('show');

            // Enable control buttons
            startBtn.disabled = false;
            resetBtn.disabled = false;
        });

        // Start animation
        startBtn.addEventListener('click', function() {
            startBtn.disabled = true;

            const redDelay = parseInt(redInput.value) || 0;
            const greenDelay = parseInt(greenInput.value) || 0;
            const blueDelay = parseInt(blueInput.value) || 0;

            // Hide red circles after x seconds
            const redTimeout = setTimeout(function() {
                const circles = redRow.querySelectorAll('.circle');
                circles.forEach(circle => circle.style.display = 'none');
            }, redDelay * 1000);

            timeoutIds.push(redTimeout);

            // Hide green circles after x + y seconds
            const greenTimeout = setTimeout(function() {
                const circles = greenRow.querySelectorAll('.circle');
                circles.forEach(circle => circle.style.display = 'none');
            }, (redDelay + greenDelay) * 1000);

            timeoutIds.push(greenTimeout);

            // Hide blue circles after x + y + z seconds
            const blueTimeout = setTimeout(function() {
                const circles = blueRow.querySelectorAll('.circle');
                circles.forEach(circle => circle.style.display = 'none');
                startBtn.disabled = false;
            }, (redDelay + greenDelay + blueDelay) * 1000);

            timeoutIds.push(blueTimeout);
        });

        // Reset page
        resetBtn.addEventListener('click', function() {
            // Clear all timeouts
            timeoutIds.forEach(id => clearTimeout(id));
            timeoutIds = [];

            // Show all circles
            const allCircles = document.querySelectorAll('.circle');
            allCircles.forEach(circle => circle.style.display = 'block');

            // Reset inputs
            redInput.value = '2';
            greenInput.value = '2';
            blueInput.value = '2';
            numCirclesInput.value = '5';

            // Hide circles section
            circlesSection.classList.remove('show');

            // Disable buttons
            startBtn.disabled = true;
            resetBtn.disabled = true;
        });
