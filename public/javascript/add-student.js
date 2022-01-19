async function addStudentHandler(event) {
    event.preventDefault();
  
    const student_firstname = document.querySelector('#student-firstname-add').value.trim();
    const student_lastname = document.querySelector('#student-lastname-add').value.trim();
    const student_grade = document.querySelector('#student-grade-add').value.trim();
    const student_address = document.querySelector('#address-add').value.trim();

    if (student_firstname && student_lastname && student_grade && student_address) {
      const response = await fetch('/api/students', {
        method: 'POST',
        body: JSON.stringify({
          student_firstname,
          student_lastname,
          student_grade,
          student_address,
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
}

document.querySelector('.add-student-btn').addEventListener('click', addStudentHandler);