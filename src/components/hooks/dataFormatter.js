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
export function formatProducts(products) {
  return products.map((product) => ({
    no: Number(product.ID),
    stock: Number(product.STOCK) || 0,
    product: product.Product,
    price: Number(product.Price),
    description: product.Description,
    image: product.Image,
    imgAlt: product.ImageAlt,
    review: Number(product.Reviews),
    rateTotal: Number(product.Rating),
    condition: product.Condition,
    category: product.Category,
    color: product.Color,
    occasion: product.Occasion
      ? product.Occasion.split(",").map((item) => item.trim())
      : [],
  }));
}

export function formatCartDisplay(data) {
  return data.map((setting) => ({
    delFee: setting.DeliveryFee,
    taxRate: setting.TaxRate,
  }));
}
