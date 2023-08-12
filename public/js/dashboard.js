const dashboardForm = document.querySelector('.dashboard');
const titleInput = document.querySelector('#title');
const contentInput = document.querySelector('#content');

const handleFormSubmit = async (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title && content) {
    const response = await fetch('/addpost', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the dashboard page after adding a new post
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add a new post.');
    }
  }
};

dashboardForm.addEventListener('submit', handleFormSubmit);

document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.delete-post');

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', async (event) => {
      event.preventDefault();
      
      const postId = deleteButton.getAttribute('data-post-id');
      const response = await fetch(`/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload('/dashboard');
      } else {
        alert('Failed to delete post.');
      }
    });
  });
});