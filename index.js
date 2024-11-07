const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

const headerLogoContainer = document.querySelector('.header__logo-container')

headerLogoContainer.addEventListener('click', () => {
  location.href = 'index.html'
})


// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Get references to the email input and form
const emailInput = document.getElementById('email');
const emailError = document.createElement('span');
emailError.classList.add('contact__form-error');

// Insert the error message span after the email input
emailInput.parentNode.insertBefore(emailError, emailInput.nextSibling);

// Real-time email validation
emailInput.addEventListener('input', () => {
  const email = emailInput.value;
  if (!emailRegex.test(email)) {
    emailError.textContent = 'Please enter a valid email address.';
  } else {
    emailError.textContent = '';
  }
});

// Handle form submission
const form = document.getElementById('myForm');
form.addEventListener('submit', (e) => {
  // Prevent form submission if email is invalid
  if (!emailRegex.test(emailInput.value)) {
    e.preventDefault();
    emailError.textContent = 'Please enter a valid email address.';
  } else {
    emailError.textContent = '';
  }

  // Ensure all form fields are filled correctly
  const formData = new FormData(form);
  let formValid = true;

  for (const [key, value] of formData.entries()) {
    if (!value.trim()) {
      formValid = false;
      alert(`Please fill out the ${key} field.`);
      e.preventDefault();
      break;
    }
  }

  if (formValid) {
    // Form is valid, allow submission
    console.log('Form data:', Object.fromEntries(formData));
  }
});