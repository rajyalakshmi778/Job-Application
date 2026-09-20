const API_URL = "https://5v1w0r706k.execute-api.ap-south-1.amazonaws.com/prod/apply";

document.getElementById('jobApplicationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const responseMessage = document.getElementById('responseMessage');
    
    // UI state change
    submitBtn.innerText = "Submitting...";
    submitBtn.disabled = true;
    responseMessage.classList.add('hidden');

    // Extract values
    const payload = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phoneNumber: document.getElementById('phoneNumber').value.trim(),
        qualification: document.getElementById('qualification').value.trim(),
        experience: document.getElementById('experience').value,
        skills: document.getElementById('skills').value.trim(),
        coverLetter: document.getElementById('coverLetter').value.trim()
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            responseMessage.className = "success";
            responseMessage.innerText = `Success! Application ID: ${data.applicationId}`;
            document.getElementById('jobApplicationForm').reset();
        } else {
            throw new Error(data.error || "Something went wrong.");
        }
    } catch (error) {
        responseMessage.className = "error";
        responseMessage.innerText = `Error: ${error.message}`;
    } finally {
        submitBtn.innerText = "Apply Now";
        submitBtn.disabled = false;
        responseMessage.classList.remove('hidden');
    }
});
