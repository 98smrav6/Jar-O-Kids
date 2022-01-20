async function editFormHandler(event) {
    event.preventDefault();
    console.log("edit form submitted");

    const student_firstname = document.querySelector('input[name="student-first-name"]').value.trim();
    const student_lastname = document.querySelector('input[name="student-last-name"]').value.trim();
    const student_address = document.querySelector('input[name="student-address"]').value.trim();
    const student_grade = document.querySelector('input[name="student-grade"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
        student_firstname,
        student_lastname,
        student_grade,
        student_address
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/parentDash/');
    } else {
        alert(response.statusText);
    }
}
  
document.querySelector('.edit-student-form').addEventListener('submit', editFormHandler);