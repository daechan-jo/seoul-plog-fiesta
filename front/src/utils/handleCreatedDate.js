export const handleCreatedDate = (date) => {
  const createdAtDate = new Date(date);

  const year = createdAtDate.getFullYear();
  const month = createdAtDate.getMonth() + 1;
  const day = createdAtDate.getDate();

  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`;

  return formattedDate;
};
