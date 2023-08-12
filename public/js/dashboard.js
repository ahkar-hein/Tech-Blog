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
