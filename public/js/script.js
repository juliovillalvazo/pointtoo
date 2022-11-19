// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', () => {
    console.log('pointtoo JS imported successfully!');
});

const loginbtn = document.getElementById('login');
const homebtn = document.getElementById('home');
const signupbtn = document.getElementById('signup');

const currentURL = window.location.href;

if (currentURL.includes('login')) {
    homebtn.classList.remove('active');
    signupbtn.classList.remove('active');
    loginbtn.classList.add('active');
} else if (currentURL.includes('signup')) {
    homebtn.classList.remove('active');
    signupbtn.classList.add('active');
    loginbtn.classList.remove('active');
} else {
    homebtn.classList.add('active');
    signupbtn.classList.remove('active');
    loginbtn.classList.remove('active');
}
