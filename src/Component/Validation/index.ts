export const InputValidation = (product: {
  price: string;
  title: string;
  description: string;
  imageURL: string;
}) => {
  const errors = {
    price: "",
    title: "",
    description: "",
    imageURL: "",
  };
  const validUrl = /^(ftb|http|https):\/\/[^ "]+$/.test(product.imageURL);
  if (
    !product.title.trim() ||
    product.title.trim().length < 10 ||
    product.title.trim().length > 90
  ) {
    errors.title = "Title must be between 10 and 90 characters";
  }
  if (
    !product.description.trim() ||
    product.description.trim().length < 10 ||
    product.description.trim().length > 900
  ) {
    errors.description = "Title must be between 10 and 900 characters";
  }
  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "the image URL cannot be empty or invalid";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Price must be a valid";
  }
  return errors;
};
