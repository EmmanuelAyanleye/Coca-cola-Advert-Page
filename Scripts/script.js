let comments = [];
let likeCount = 0;
let dislikeCount = 0;

// Function to post a comment
function postComment() {
    const usernameInput = document.getElementById("usernameInput");
    const commentInput = document.getElementById("commentInput");
    const username = usernameInput.value.trim();
    const commentText = commentInput.value.trim();

    if (username === "" || commentText === "") return;

    const timestamp = new Date();
    const comment = {
        username: username,
        text: commentText,
        likes: 0,
        dislikes: 0,
        replies: [],
        timestamp: timestamp.toLocaleString(),
    };
    comments.push(comment);
    displayComments();
    usernameInput.value = "";
    commentInput.value = "";
}

// Function to display comments and replies
function displayComments() {
    const commentsContainer = document.getElementById("commentsContainer");
    commentsContainer.innerHTML = "";

    comments.forEach((comment, index) => {
        const commentElement = document.createElement("div");
        commentElement.className = "comment";

        commentElement.innerHTML = `
            <strong>${comment.username}</strong> <span class="comment-timestamp">${comment.timestamp}</span>
            <p>${comment.text}</p>
            <div class="comment-buttons">
                <button class="btn btn-sm btn-outline-primary" onclick="likeComment(${index})">Like (${comment.likes})</button>
                <button class="btn btn-sm btn-outline-secondary" onclick="dislikeComment(${index})">Dislike (${comment.dislikes})</button>
                <button class="btn btn-sm btn-outline-info" onclick="toggleReplyForm(${index})">Reply</button>
            </div>
            <div class="reply-section" id="replySection${index}">
                ${comment.replies.map(reply => `<div><strong>${reply.username}</strong> <span class="comment-timestamp">${reply.timestamp}</span><p>${reply.text}</p></div>`).join('')}
            </div>
            <div class="reply-form mt-2" id="replyForm${index}" style="display: none;">
                <input type="text" id="replyUsername${index}" class="form-control" placeholder="Enter your name" />
                <textarea id="replyText${index}" class="form-control mt-2" rows="2" placeholder="Write a reply..."></textarea>
                <button class="btn btn-primary mt-2" onclick="postReply(${index})">Post Reply</button>
            </div>
        `;

        commentsContainer.appendChild(commentElement);
    });
}

// Function to toggle reply form visibility
function toggleReplyForm(index) {
    const replyForm = document.getElementById(`replyForm${index}`);
    replyForm.style.display = replyForm.style.display === "none" ? "block" : "none";
}

// Function to post a reply
function postReply(index) {
    const replyUsernameInput = document.getElementById(`replyUsername${index}`);
    const replyTextInput = document.getElementById(`replyText${index}`);
    const replyUsername = replyUsernameInput.value.trim();
    const replyText = replyTextInput.value.trim();

    if (replyUsername === "" || replyText === "") return;

    const timestamp = new Date();
    comments[index].replies.push({
        username: replyUsername,
        text: replyText,
        timestamp: timestamp.toLocaleString(),
    });

    displayComments();
}

// Advert Like and Dislike Functionality
function likeAdvert() {
    likeCount++;
    document.getElementById("likeCount").textContent = likeCount;
}

function dislikeAdvert() {
    dislikeCount++;
    document.getElementById("dislikeCount").textContent = dislikeCount;
}

// Share button functionality
function shareAdvert() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => {
            alert("Page URL copied to clipboard!");
        })
        .catch((error) => {
            console.error("Could not copy URL: ", error);
        });
}

// Like and dislike functions for individual comments
function likeComment(index) {
    comments[index].likes++;
    displayComments();
}

function dislikeComment(index) {
    comments[index].dislikes++;
    displayComments();
}
