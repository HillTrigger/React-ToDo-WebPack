export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const options = {
    month: "short", // Jul
    day: "numeric", // 20
    year: "numeric", // 2023
    hour: "numeric", // 9
    minute: "2-digit", // 00
    hour12: true, // AM/PM формат
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  const time = formattedDate.split(", ").pop(); // Вытягиваем время

  // Объединяем результат
  return `${formattedDate.replace(`, ${time}`, "")} at ${time}`;
};
