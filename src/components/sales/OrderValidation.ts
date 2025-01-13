export const validateOrderForm = (
  customerName: string,
  billingAddress: string,
  rows: any[],
  touchedRows: Set<number>
) => {
  const errors: string[] = [];

  if (!customerName.trim()) {
    errors.push("Please select a customer");
  }

  if (!billingAddress.trim()) {
    errors.push("Please enter a billing address");
  }

  // No validation for items not shipped section
  
  return errors;
};