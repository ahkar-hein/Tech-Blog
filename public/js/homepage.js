document.addEventListener('DOMContentLoaded', () => {
    const commentButtons = document.querySelectorAll('.commentbtn');
    const commentLabels = document.querySelectorAll('.commentlabel');
    const commentTextareas = document.querySelectorAll('#comment');
    const submitButtons = document.querySelectorAll('.submit-comment');
  
    commentButtons.forEach((commentButton, index) => {
      commentButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission
  
        commentLabels[index].style.display = "block";
        commentTextareas[index].style.display = "block";
        submitButtons[index].style.display = "block";
      });
    });
  
    submitButtons.forEach((submitButton) => {
      submitButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent form submission
  
        const commentTextarea = submitButton.previousElementSibling;
        const comment = commentTextarea.value.trim();
        const postId = submitButton.getAttribute('data-post-id');
  
        if (comment && postId) {
          const response = await fetch('/comments', {
            method: 'POST',
            body: JSON.stringify( {comment, postId }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.reload(); // Reload the page to show the new comment
          } else {
            alert('Failed to submit comment.');
          }
        }
      });
    });
  });
  