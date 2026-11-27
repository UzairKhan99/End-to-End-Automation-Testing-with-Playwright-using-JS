function formatDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError('formatDate expects a valid Date instance.');
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function getFutureHotelDates(daysFromToday = 7, stayLength = 1) {
  if (!Number.isInteger(daysFromToday) || daysFromToday < 1) {
    throw new RangeError('daysFromToday must be a positive whole number.');
  }

  if (!Number.isInteger(stayLength) || stayLength < 1) {
    throw new RangeError('stayLength must be a positive whole number.');
  }

  const checkInDate = new Date();
  checkInDate.setHours(0, 0, 0, 0);
  checkInDate.setDate(checkInDate.getDate() + daysFromToday);

  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + stayLength);

  return {
    checkIn: formatDate(checkInDate),
    checkOut: formatDate(checkOutDate)
  };
}

module.exports = { formatDate, getFutureHotelDates };
