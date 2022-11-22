// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', () => {
    console.log('pointtoo JS imported successfully!');
});

const loginbtn = document.getElementById('login');
const homebtn = document.getElementById('home');
const signupbtn = document.getElementById('signup');
const profilebtn = document.getElementById('profile');

const currentURL = window.location.href;

if (currentURL.includes('login')) {
    homebtn.classList.remove('active');
    signupbtn && signupbtn.classList.remove('active');
    loginbtn && loginbtn.classList.add('active');
    profilebtn && profilebtn.classList.remove('active');
} else if (currentURL.includes('signup')) {
    homebtn.classList.remove('active');
    signupbtn && signupbtn.classList.add('active');
    loginbtn && loginbtn.classList.remove('active');
    profilebtn && profilebtn.classList.remove('active');
} else if (currentURL.includes('profile')) {
    profilebtn && profilebtn.classList.add('active');
    homebtn.classList.remove('active');
    signupbtn && signupbtn.classList.remove('active');
    loginbtn && loginbtn.classList.remove('active');
} else if (currentURL === 'http://localhost:3000/') {
    homebtn.classList.add('active');
    signupbtn && signupbtn.classList.remove('active');
    loginbtn && loginbtn.classList.remove('active');
    profilebtn && profilebtn.classList.remove('active');
} else {
    homebtn.classList.remove('active');
    signupbtn && signupbtn.classList.remove('active');
    loginbtn && loginbtn.classList.remove('active');
    profilebtn && profilebtn.classList.remove('active');
}
