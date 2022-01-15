async function signupFormHandler(event) {
    event.preventDefault();
  
    const parent_name = document.querySelector('#parent-name-signup').value.trim();
    const phone = document.querySelector('#phone-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (email && password && parent_name && phone) {
      const response = await fetch('/api/parents', {
        method: 'post',
        body: JSON.stringify({
          parent_name,
          phone,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok && response_two.ok) {
        document.location.replace('/parents/');
      } else {
        alert(response.statusText);
      }
    }
  }

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);