//functions to add student via an add student form/button that will be present on the /parent view  Also determine how to add parent id to the post

async function addStudentHandler(event) {
    event.preventDefault();
  
    const student_firstname = document.querySelector('#student-firstname-signup').value.trim();
    const student_lastname = document.querySelector('#student-lastname-signup').value.trim();
    const student_grade = document.querySelector('#student-grade-signup').value.trim();
    const address = document.querySelector('#address-signup').value.trim();
  
    if (student_firstname && student_lastname && student_grade && address) {
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
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    }
}

document.querySelector('.add-student-btn').addEventListener('click', addStudentHandler);