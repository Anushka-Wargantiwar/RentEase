// script.js
document.addEventListener("DOMContentLoaded", function() {
    const properties = [
        {
            image: "smallhouse.png",
            title: "Cozy Apartment",
            description: "A cozy apartment in the heart of the city.",
            price: "12000/month"
        },
        {
            image: "independenthouse.png",
            title: "Modern Loft",
            description: "A modern loft with stunning views.",
            price: "30000/month"
        },
        {
            image: "bungalow.png",
            title: "Spacious House",
            description: "A spacious house perfect for families.",
            price: "45000/month"
        }
    ];

    const propertyList = document.querySelector(".property-list");

    properties.forEach(property => {
        const propertyCard = document.createElement("div");
        propertyCard.classList.add("property-card");

        propertyCard.innerHTML = `
            <img src="${property.image}" alt="${property.title}">
            <h3>${property.title}</h3>
            <p>${property.description}</p>
            <p><strong>${property.price}</strong></p>
        `;

        propertyList.appendChild(propertyCard);
    });
    // Fetch properties from the backend
fetch('http://localhost:5000/api/properties')
.then(response => response.json())
.then(data => {
    const propertyList = document.querySelector('.property-list');
    data.forEach(property => {
        const propertyCard = document.createElement('div');
        propertyCard.classList.add('property-card');
        propertyCard.innerHTML = `
            <img src="${property.image}" alt="${property.title}">
            <h3>${property.title}</h3>
            <p>${property.description}</p>
            <p><strong>${property.price}</strong></p>
        `;
        propertyList.appendChild(propertyCard);
    });
})
.catch(error => console.error('Error fetching properties:', error));

// Register User
document.getElementById('register').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token); // Save token to localStorage
        alert('Registration successful!');
        window.location.href = '/'; // Redirect to home page
    } else {
        alert(data.message || 'Registration failed');
    }
});

// Login User
document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token); // Save token to localStorage
        alert('Login successful!');
        window.location.href = '/'; // Redirect to home page
    } else {
        alert(data.message || 'Login failed');
    }
});

// Check if user is logged in
const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
        console.log('User is logged in');
        // You can update the UI to show a "Logout" button
    } else {
        console.log('User is not logged in');
        // You can update the UI to show "Login" and "Register" buttons
    }
};

// Logout User
const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    alert('Logged out successfully!');
    window.location.href = '/'; // Redirect to home page
};

// Call checkAuth on page load
checkAuth();

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    const messageDiv = document.getElementById('formMessage');
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Message sent successfully!';
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = 'Failed to send message. Please try again later.';
    }
});

});