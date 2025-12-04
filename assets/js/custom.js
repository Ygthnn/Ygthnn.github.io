document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('customContactForm');
    const resultContainer = document.getElementById('formResultContainer');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect Data
            const formData = {
                name: document.getElementById('name').value || "Not provided",
                surname: document.getElementById('surname').value || "Not provided",
                email: document.getElementById('email').value || "Not provided",
                phone: document.getElementById('phone').value || "Not provided",
                address: document.getElementById('address').value || "Not provided",
                // Ensure ratings are numbers (default to 0 if empty)
                rating1: Number(document.getElementById('rating1').value) || 0,
                rating2: Number(document.getElementById('rating2').value) || 0,
                rating3: Number(document.getElementById('rating3').value) || 0
            };

            // Calculate Average
            const average = (formData.rating1 + formData.rating2 + formData.rating3) / 3;
            const averageFormatted = average.toFixed(1);

            // Determine Color
            let color = '#28a745'; // Green
            if (average < 4) color = '#dc3545'; // Red
            else if (average < 7) color = '#fd7e14'; // Orange

            // Display Results
            resultContainer.style.display = 'block';
            resultContainer.innerHTML = `
                <div class="result-box">
                    <h4>Submission Results</h4>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Surname:</strong> ${formData.surname}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <p><strong>Phone:</strong> ${formData.phone}</p>
                    <p><strong>Address:</strong> ${formData.address}</p>
                    <hr style="border-color: rgba(255,255,255,0.1);">
                    <p>
                        <strong>${formData.name} ${formData.surname}:</strong> 
                        <span style="color: ${color}; font-size: 1.4rem; font-weight: bold;">
                            ${averageFormatted}
                        </span>
                    </p>
                </div>
            `;
            
            // Show Popup
            alert("Form submitted successfully!"); 
            // Note: You can swap 'alert' for the custom popup code if you prefer that animation.
        });
    }
});
