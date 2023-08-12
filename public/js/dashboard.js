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
  const editButtons = document.querySelectorAll('.edit-post');
  const editForms = document.querySelectorAll('.edit-form');

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const postId = deleteButton.getAttribute('data-post-id');
      const response = await fetch(`/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete post.');
      }
    });
  });

  editButtons.forEach((editButton, index) => {
    editButton.addEventListener('click', async (event) => {
      event.preventDefault();

      editForms[index].style.display = 'block';

      const titleElement = editButton.parentElement.querySelector('h3');
      const contentElement = editButton.parentElement.querySelector('p');
      const editedTitleInput = editForms[index].querySelector('#editedTitle');
      const editedContentTextarea = editForms[index].querySelector('#editedContent');
      const saveButton = editForms[index].querySelector('.save-edit');

      editedTitleInput.value = titleElement.textContent;
      editedContentTextarea.value = contentElement.textContent;

      const postId = saveButton.getAttribute('data-post-id');
      saveButton.addEventListener('click', async (event) => {
          const editedTitle = editedTitleInput.value.trim();
          const editedContent = editedContentTextarea.value.trim();
          const response = await fetch(`/edit/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title: editedTitle, content: editedContent }),
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok) {
            document.location.reload('/dashboard');
          } else {
            alert('Failed to edit post.');
          }
        
      })
    });
  });
});

