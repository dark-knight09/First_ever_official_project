 const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    const emojiBox = document.getElementById('emoji');

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = star.getAttribute('data-value');
        ratingInput.value = value;

        // reset and set selected stars
        stars.forEach(s => s.style.color = "#555");
        for (let i = 0; i < value; i++) {
          stars[i].style.color = "gold";
        }
      });
    });

    function submitReview(e) {
      e.preventDefault();
      const review = document.getElementById('reviewText').value;
      const rating = ratingInput.value;

      if (rating == 0) {
        alert("Please select a star rating before submitting!");
        return;
      }

      // Pick emoji based on rating
      let emoji = "";
      switch (parseInt(rating)) {
        case 1: emoji = "😡"; break;
        case 2: emoji = "😕"; break;
        case 3: emoji = "😐"; break;
        case 4: emoji = "😊"; break;
        case 5: emoji = "🤩"; break;
      }

      emojiBox.textContent = emoji;
      emojiBox.style.display = "block";

      alert(`Thanks for your feedback!\nRating: ${rating} Stars\nReview: ${review}`);
    }