export const add5Hours = (dateTime) => {
  const dateToday = dateTime.split(" ")[0];
  const month = dateToday.split("-")[0];
  const date = dateToday.split("-")[1];
  const year = dateToday.split("-")[2];

  const time = dateTime.split(" ")[1];
  const hour = time.split(":")[0];
  const minute = time.split(":")[1].slice(0, 2);
  const ampm = time.split(":")[1].slice(2, 4);

  const monthsDays = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  let newHour = parseInt(hour) + 5;
  let newMinute = minute;
  let newAmpm = ampm;
  let newDate = parseInt(date);
  let newMonth = parseInt(month);
  let newYear = parseInt(year);

  if (newHour > 12) {
    newHour = newHour - 12;
    newAmpm = ampm === "AM" ? "PM" : "AM";
  }

  if (newHour === 12) {
    newAmpm = ampm === "AM" ? "PM" : "AM";
  }

  if (newHour === 0) {
    newHour = 12;
  }

  if (newHour === 12 && newAmpm === "AM") {
    newDate = newDate + 1;
  }

  if (newDate > monthsDays[newMonth]) {
    newDate = 1;
    newMonth = newMonth + 1;
  }

  if (newMonth > 12) {
    newMonth = 1;
    newYear = newYear + 1;
  }

  return `${newMonth}-${newDate}-${newYear} ${newHour}:${newMinute}${newAmpm}`;
};
