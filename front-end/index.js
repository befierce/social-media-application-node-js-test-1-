const postForm = document.getElementById('postForm');
const postContainer = document.getElementById('postContainer');

postForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const postLink = document.getElementById('postLink').value;
    const postDescription = document.getElementById('postDescription').value;

    const dataToSendToServer = {
        postLink: postLink,
        postDescription: postDescription
    }

    try {
        const response = await axios.post(`http://localhost:3000/`, dataToSendToServer);
        const imageUrl = response.data.imagePath; 
        console.log(response.data.imagePath);

        const newPost = createPostElement(postLink, postDescription, imageUrl);
        postContainer.appendChild(newPost);
    } catch (error) {
        console.error('Error fetching image:', error);
    }
    
    // Clear the form fields
    document.getElementById('postLink').value = '';
    document.getElementById('postDescription').value = '';
});

function createPostElement(link, description, imageUrl) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.style.height = '200px'
    postElement.style.width = '200px'
    const titleElement = document.createElement('h2');
    titleElement.textContent = link;
    postElement.appendChild(titleElement);

    // Create an image element and set its source
    if (imageUrl) {
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = 'Post Image';
         imageElement.style.height = '120px'
         imageElement.style.width = '120px'
        postElement.appendChild(imageElement);
    }

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    postElement.appendChild(descriptionElement);

    const commentSection = document.createElement('div');
    commentSection.classList.add('comment-section');

    const commentForm = document.createElement('form');
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment...';
    const commentButton = document.createElement('button');
    commentButton.type = 'button';
    commentButton.textContent = 'Comment';

    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentButton);
    commentSection.appendChild(commentForm);

    postElement.appendChild(commentSection);

    commentButton.addEventListener('click', function() {
        const commentText = commentInput.value;
        if (commentText) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            const commentParagraph = document.createElement('p');
            commentParagraph.textContent = commentText;
            commentElement.appendChild(commentParagraph);
            commentSection.appendChild(commentElement);
            commentInput.value = '';
        }
    });

    return postElement;
}
