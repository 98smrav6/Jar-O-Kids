async function signupFormHandler(event) {
    event.preventDefault();
  
    const parent_name = document.querySelector('#parent-name').value.trim();
    const parent_phone = document.querySelector('#phone-number').value.trim();
    const parent_email = document.querySelector('#email-input').value.trim();
    const password = document.querySelector('#pass-word').value.trim();
  
    if ( parent_name && parent_phone && parent_email && password ) {
      const response = await fetch('api/parents', {
        method: 'POST',
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
        document.location.replace('/parentDash');
      } else {
        alert(response.statusText);
      }
    }
  }

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);