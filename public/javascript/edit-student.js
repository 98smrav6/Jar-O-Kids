//functions to edit student status via admin function
async function editFormHandler(event) {
    event.preventDefault();
  
    const student_status = document.querySelector('input[name="student-status"]').value.trim();
    
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        student_status
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);