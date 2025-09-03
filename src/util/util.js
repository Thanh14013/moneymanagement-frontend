export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return "";

  const numStr = num.toString();
  const parts = numStr.split('.');
  let integerPart = parts[0];
  let fractionalPart = parts[1];

  // Format with dots as thousands separators (Vietnamese style)
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  // Add the Vietnamese đồng symbol
  return fractionalPart ? `${integerPart},${fractionalPart}đ` : `${integerPart}đ`;
}
