window.addEventListener("DOMContentLoaded", () => {
    fetchAppointmentData();
})

const postForm = document.getElementById('postForm');
const postContainer = document.getElementById('postContainer');

postForm.addEventListener('submit', async function (event) {
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
        const postId = response.data.postId;
        console.log("postId:", postId);
        console.log("response-data  ", response.data);

        // const newPost = createPostElement(postDescription, imageUrl, postId);
        // postContainer.appendChild(newPost);
        let localPostsData = [{
            id: postId,
            postLink: postLink,
            postDescription: postDescription,
            comments: [] // Assuming no comments for the new post initially
        }];
        renderPosts(localPostsData);


    } catch (error) {
        console.error('Error fetching image:', error);
    }

    // Clear the form fields
    document.getElementById('postLink').value = '';
    document.getElementById('postDescription').value = '';
});
function createCommentElement(commentText) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    const commentParagraph = document.createElement('p');
    commentParagraph.textContent =  commentText  + '   ~anonymous';
    commentElement.appendChild(commentParagraph);
    return commentElement;
}
function createPostElement(description, imageUrl, Id) {
    const postId = Id;
    console.log("create post elemt vali postId:", postId);
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.style.height = 'fit-content'
    postElement.style.width = '300px'
    const titleElement = document.createElement('h2');

    if (imageUrl) {
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = 'Post Image';
        imageElement.style.height = '200px'
        imageElement.style.width = '200px'
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
    commentButton.addEventListener('click', async function () {
        const commentText = commentInput.value;
        if (commentText) {
            const commentElement = createCommentElement(commentText);
            commentSection.appendChild(commentElement);
            commentInput.value = '';
            console.log("comment button ke andr postid:", postId);
            try {
                await axios.post(`http://localhost:3000/comment/${postId}`, { commentText });
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        }
    });

    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentButton);
    commentSection.appendChild(commentForm);
    postElement.appendChild(commentSection);


    return postElement;
}

function fetchAppointmentData() {
    axios.get("http://localhost:3000/")
        .then((res) => {
            localPostsData = res.data; // Store fetched data locally

            const breakElement = document.createElement('br');
            renderPosts(localPostsData);
        });
}
function renderPosts(postsData) {
    // Clear the existing posts
    // postContainer.innerHTML = '';

    // Iterate through each post and render
    postsData.forEach(post => {
        const imageUrl = post.postLink;
        const description = post.postDescription;
        const postId = post.id;
        const newPost = createPostElement(description, imageUrl, postId);

        const commentSection = newPost.querySelector('.comment-section');

        for (let i = 0; i <= post.comments.length - 1; i++) {
            const commentText = post.comments[i].commentText;
            console.log(commentText);
            const commentElement = createCommentElement(commentText);
            commentSection.appendChild(commentElement);
        }

        postContainer.appendChild(newPost);
    });
}