const commentsButtonElement = document.getElementById("comments-button");
const commentSectionElement = document.getElementById("comments-section");
const commentsParagraphElement = document.getElementById("comments-desc");

function commentsList(comments) {
  const unOrderedListElement = document.createElement("ul");

  for (let comment of comments) {
    const commentListElement = document.createElement("li");
    commentListElement.innerHTML = `<p>${comment.comment}</p>`;

    unOrderedListElement.append(commentListElement);
    commentSectionElement.appendChild(unOrderedListElement);
  }
}

async function fetchComments() {
  const bookId = commentsButtonElement.dataset.bookid;
  const response = await fetch(`/share/${bookId}/comments`);
  const responseData = await response.json();

  if (!responseData || responseData.length === 0) {
    commentsParagraphElement.textContent =
      "This post has no comments - Maybe add one?";
  }

  commentsList(responseData);
  console.log(responseData);
}

commentsButtonElement.addEventListener("click", fetchComments);
