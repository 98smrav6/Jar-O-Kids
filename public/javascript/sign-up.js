async function signupFormHandler(event) {
    event.preventDefault();
  
    const parent_name = document.querySelector('#parent-name-signup').value.trim();
    const parent_phone = document.querySelector('#phone-signup').value.trim();
    const parent_email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if ( parent_name && parent_phone && parent_email && password ) {
      const response = await fetch('api/parents', {
        method: 'post',
        body: JSON.stringify({
          parent_name,
          parent_phone,
          parent_email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        console.log('success');
        document.location.replace('/parentDash/');
      } else {
        alert(response.statusText);
      }
    }
  }

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);