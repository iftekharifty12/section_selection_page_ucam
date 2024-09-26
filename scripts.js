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

// Handle selecting a course section (Updated)
document.querySelectorAll('.course-body').forEach(courseBody => {
  let currentlySelectedRow = null;

  courseBody.querySelectorAll('.select-btn').forEach(button => {
    const isConflicted = button.closest('tr').getAttribute('data-conflict') === 'true';

    // Set the conflict button to red initially if there's a conflict
    if (isConflicted) {
      button.classList.add('conflicted');
    }

    button.addEventListener('click', function () {
      const row = this.closest('tr'); // Get the selected row
      const courseHeader = this.closest('.course').querySelector('.course-header'); // Get the course header

      // Check if this button is currently in "Remove" mode (already selected)
      if (this.classList.contains('remove')) {
        // Deselect the current section
        if (currentlySelectedRow) {
          // Re-enable the button, change text back to "Take/Change," and remove the red color
          currentlySelectedRow.querySelector('.select-btn').textContent = 'Take/Change';
          currentlySelectedRow.querySelector('.select-btn').classList.remove('remove', 'conflicted');
        }

        // Remove the selected section details
        const selectedInfo = courseHeader.querySelector('.selected-details');
        if (selectedInfo) {
          selectedInfo.remove(); // Remove the section details
        }

        // Show "No section selected" message again after removal
        const noSectionInfo = document.createElement('p');
        noSectionInfo.classList.add('selected-section-info');
        noSectionInfo.textContent = "No Section Selected";
        courseHeader.appendChild(noSectionInfo); // Append "No Section Selected"

        // Clear the currently selected row
        currentlySelectedRow = null;
        return;
      }

      // If a row was already selected, deselect it
      if (currentlySelectedRow) {
        currentlySelectedRow.querySelector('.select-btn').textContent = 'Take/Change';
        currentlySelectedRow.querySelector('.select-btn').classList.remove('remove', 'conflicted');
      }

      // Select the new row
      const section = row.querySelector('[data-label="Sec"]').textContent;
      const date = row.querySelector('[data-label="Date"]').textContent;
      const time = row.querySelector('[data-label="Time"]').textContent;
      const faculty = row.querySelector('[data-label="Faculty"]').textContent;

      // Remove the "No section selected" info
      const noSectionInfo = courseHeader.querySelector('.selected-section-info');
      if (noSectionInfo) {
        noSectionInfo.remove();
      }

      // Remove the old section info if it exists
      const selectedInfo = courseHeader.querySelector('.selected-details');
      if (selectedInfo) {
        selectedInfo.remove(); // Remove the previous section details
      }

      // Create new section info div and insert it above the toggle
      const sectionInfo = document.createElement('div');
      sectionInfo.innerHTML = `
          <p><strong>Section:</strong> ${section}</p>
          <p><strong>Date/Time:</strong> ${date} - ${time}</p>
          <p><strong>Faculty:</strong> ${faculty}</p>
      `;
      sectionInfo.classList.add('selected-details');
      courseHeader.insertBefore(sectionInfo, courseHeader.querySelector('.toggle')); // Insert above toggle

      // Set the button to red and mark it as "remove"
      this.textContent = 'Remove';
      this.classList.add('remove', 'conflicted');

      // Set the currently selected row to this one
      currentlySelectedRow = row;
    });
  });
});
