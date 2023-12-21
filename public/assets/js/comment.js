const ratingCommentHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment-input').value.trim();
    const rating = document.querySelector('#rating-input').value.trim();

    if (comment && rating) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, rating }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }}};