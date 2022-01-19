async function loginFormHandler(event) {
  event.preventDefault();

  console.log("clicked loginForm");
  const parent_email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (parent_email && password) {
    const response = await fetch('/api/parents/login', {
      method: 'POST',
      body: JSON.stringify({
        parent_email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/parentDash');
    } else {
      alert(response.statusText);
    };
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);