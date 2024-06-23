export const convertToLocalBDT = (dateString) => {
  const options = {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleString("en-US", options);
};
