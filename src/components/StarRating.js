import { useState } from 'react';

function StarRating({ rating, onRate }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          className={`star ${star <= (hovered || rating) ? 'star--filled' : ''}`}
          onClick={() => onRate(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`Rate ${star} out of 5`}
        >
          ★
        </button>
      ))}
      {rating > 0 && (
        <span className="star-label">{rating} / 5</span>
      )}
    </div>
  );
}

export default StarRating;
