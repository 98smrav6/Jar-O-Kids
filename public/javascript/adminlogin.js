async function loginFormHandler(event) {
    event.preventDefault();
  
    console.log("clicked loginForm");
    const username = document.querySelector('#admin-user').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/admins/admin', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/adminDash');
      } else {
        alert(response.statusText);
      };
    }
  };
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);