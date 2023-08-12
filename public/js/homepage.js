// this javascript basically work for comment section in the homepage. 
document.addEventListener('DOMContentLoaded', () => {
  const commentButtons = document.querySelectorAll('.commentbtn');
  const commentLabels = document.querySelectorAll('.commentlabel');
  const commentTextareas = document.querySelectorAll('#comment');
  const submitButtons = document.querySelectorAll('.submit-comment');
  // when user hit the comment button, comment form will be appear and there's include textarea and comment button.
  commentButtons.forEach((commentButton, index) => {
    commentButton.addEventListener('click', (event) => {
      event.preventDefault();

      commentLabels[index].style.display = "block";
      commentTextareas[index].style.display = "block";
      submitButtons[index].style.display = "block";
    });
  });

  submitButtons.forEach((submitButton, index) => {
    submitButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const postId = submitButton.getAttribute('data-post-id');
      const comment = commentTextareas[index].value.trim();
      const response = await fetch(`/addcomment/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ comments: comment }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to submit comment.');
      }

    });
  });
});
