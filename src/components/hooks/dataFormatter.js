export function formatBestSellers(data) {
  return data.map((card) => ({
    no: Number(card.No),
    product: card.product,
    price: Number(card.price),
    description: card.description,
    image: card.image,
    imageAlt: card.imageAlt,
    review: card.review,
    rate: card.rateTotal,
    condition: card.condition,
  }));
}
export function formatFilterCards(data) {
  return data.map((card) => ({
    no: Number(card.No),
    filterValue: card.FilterValue,
    mainImage: card.MainImage,
    circleImage: card.CircleImage,
    cardTitle: card.CardTitle,
    cardText: card.CardText,
  }));
}
export function formatWhyUsCards(data) {
  return data.map((card) => ({
    no: Number(card.No),
    mainImage: card.MainImage,
    mainImageAlt: card.MainImageAlt,
    cardTitle: card.CardTitle,
    cardText: card.CardText,
  }));
}
