// Handle collapsing course sections
document.querySelectorAll('.course-header').forEach(header => {
    header.addEventListener('click', function () {
      const body = this.nextElementSibling; // Get the corresponding course body
      const toggle = this.querySelector('.toggle'); // Get the toggle arrow
  
      // Toggle the display of the course body
      if (body.style.display === 'block') {
        body.style.display = 'none'; // Hide the body
        toggle.classList.remove('rotated'); // Remove rotation class to revert the arrow
      } else {
        body.style.display = 'block'; // Show the body
        toggle.classList.add('rotated'); // Add rotation class to rotate the arrow
      }
    });
  });
  
  // Disable select button if there is a conflict
  document.querySelectorAll('.course-body tr').forEach(row => {
    const conflict = row.getAttribute('data-conflict') === 'true';
    const selectBtn = row.querySelector('.select-btn');
  
    if (conflict) {
      selectBtn.classList.add('disabled');
      selectBtn.disabled = true; // Disable the button
    }
  });
  
  // Select all the select buttons
  document.querySelectorAll('.select-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Get the closest table row (tr) of the selected button
        const row = this.closest('tr');
        
        // Extract section info from the row
        const section = row.querySelector('[data-label="Sec"]').innerText;
        const date = row.querySelector('[data-label="Date"]').innerText;
        const time = row.querySelector('[data-label="Time"]').innerText;
        const room = row.querySelector('[data-label="Room"]').innerText;
        const faculty = row.querySelector('[data-label="Faculty"]').innerText;
  
        // Find the course header and title
        const courseHeader = row.closest('.course').querySelector('.course-header');
        const courseTitle = courseHeader.querySelector('h3').innerText;
  
        // Update the course header with the selected section info
        courseHeader.innerHTML = `
            <h3>${courseTitle}</h3>
            <div class="selected-section-info">
                <strong> Section:</strong> ${section}<br>
                <strong>Date:</strong> ${date} | <strong>Time:</strong> ${time} | <strong>Room:</strong> ${room}<br>
                <strong>Faculty:</strong> ${faculty}
            </div>
            <span class="toggle">▼</span>
        `;
  
        // Show the course body if it's hidden
        const courseBody = row.closest('.course').querySelector('.course-body');
        courseBody.style.display = 'block';
    });
  });
  