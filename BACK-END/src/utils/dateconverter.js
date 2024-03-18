function formatDateTimeToIso(dateTimeString) {
  // Parse the original string into a Date object
  const dateObject = new Date(dateTimeString);

  // Get the date and time components
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");

  // Construct the ISO 8601 formatted string
  const isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;

  return isoDateString;
}
module.exports = formatDateTimeToIso;
