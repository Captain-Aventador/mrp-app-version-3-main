export const calculateTotalPrice = (quantity: number, pricePerUnit: number): number => {
  return quantity * pricePerUnit;
};

export const calculateDiscountAmount = (totalPrice: number, discountPercentage: number): number => {
  return (totalPrice * discountPercentage) / 100;
};

export const calculateFinalPrice = (totalPrice: number, discountAmount: number): number => {
  return totalPrice - discountAmount;
};