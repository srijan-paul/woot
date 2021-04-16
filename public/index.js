const btn = document.querySelector("#make-tweet");
const tweetContents = document.querySelector("#tweet-content");

btn.addEventListener("click", (e) => {
  fetch("/tweet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: tweetContents.value }),
  });
});
