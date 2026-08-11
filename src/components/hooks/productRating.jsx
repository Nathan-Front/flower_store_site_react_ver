export function displayProductRating(product) {
  return (
    <>
      {getProductRatings(product.rateTotal)}
      <span>({product.review})</span>
    </>
  );
}

function getProductRatings(rating) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<i key={i} className="fa-solid fa-star active" />);
    } else if (rating >= i - 0.5) {
      stars.push(<i key={i} className="fa-solid fa-star-half-stroke active" />);
    } else {
      stars.push(<i key={i} className="fa-regular fa-star" />);
    }
  }

  return stars;
}
