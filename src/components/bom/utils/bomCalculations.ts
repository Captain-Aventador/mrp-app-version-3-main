export const getPartsData = (bomId: string) => {
  return window.mockPartsData[bomId] || [];
};

export const calculateTotalParts = (bomId: string): number => {
  const partsData = getPartsData(bomId);
  return partsData.length;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};