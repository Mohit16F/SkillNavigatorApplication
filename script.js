function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function updateProfile() {
    const name = document.getElementById('name').value;
    const skill = document.getElementById('skill').value;

    document.getElementById('userName').innerText = name ? name : 'User';
    document.getElementById('skillLevel').innerText = skill ? skill : 'Not Set';
    document.getElementById('skillProgress').style.width = skill ? '60%' : '0%';

    alert('Profile updated successfully!');
    showSection('dashboard');
}

function submitAssessment() {
    const selectedLevel = document.querySelector('input[name="skillLevel"]:checked');
    if (selectedLevel) {
        let progress;
        if (selectedLevel.value === 'Beginner') {
            progress = '25%';
        } else if (selectedLevel.value === 'Intermediate') {
            progress = '50%';
        } else if (selectedLevel.value === 'Advanced') {
            progress = '75%';
        }
        document.getElementById('skillLevel').innerText = selectedLevel.value;
        document.getElementById('skillProgress').style.width = progress;

        alert('Skill assessment submitted successfully!');
        showSection('dashboard');
    } else {
        alert('Please select a skill level.');
    }
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = chatbot.style.display === 'none' ? 'block' : 'none';
}

function handleChat(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        if (message) {
            const chatbotBody = document.getElementById('chatbot-body');
            chatbotBody.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
            input.value = '';

            // Simulate AI response
            setTimeout(() => {
                chatbotBody.innerHTML += `<p><strong>AI:</strong> I'm here to help you with your skills!</p>`;
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
            }, 1000);
        }
    }
}

showSection('dashboard');
toggleChatbot(); // Automatically opens the chatbot


// Placeholder for AI-powered chatbot functions
// Use this file to implement real AI API calls or additional chatbot logic

async function fetchAIResponse(query) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({
            prompt: query,
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.choices[0].text.trim();
}

async function handleChat(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        if (message) {
            const chatbotBody = document.getElementById('chatbot-body');
            chatbotBody.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
            input.value = '';

            // Fetch AI response
            const aiResponse = await fetchAIResponse(message);
            chatbotBody.innerHTML += `<p><strong>AI:</strong> ${aiResponse}</p>`;
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }
    }
}
