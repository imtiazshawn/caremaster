export const formatUKPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) {
    return "";
  }
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{5})(\d{3})(\d{3})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};
