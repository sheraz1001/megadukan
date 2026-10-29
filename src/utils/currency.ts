/**
 * Currency utility for MegaDukan.com (PKR / Pakistani Rupee)
 */

export const formatPKR = (amount: number): string => {
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
};

export const formatPKRCompact = (amount: number): string => {
  if (amount >= 1000000) {
    return `Rs. ${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 100000) {
    return `Rs. ${(amount / 100000).toFixed(1)} Lakh`;
  }
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
};
