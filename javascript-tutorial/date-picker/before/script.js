import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  fromUnixTime,
  getUnixTime,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";

const datePickerButton = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const datePickerHeader = document.querySelector(".current-month");
const previousMonthButton = document.querySelector(".prev-month-button");
const nextMonthButton = document.querySelector(".next-month-button");
const dateGrid = document.querySelector(".date-picker-grid-dates");
let currentDate = new Date();

datePickerButton.addEventListener("click", () => {
  datePicker.classList.toggle("show");
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);

  setupDatePicker(selectedDate);
});

function setupDatePicker(selectedDate) {
  datePickerHeader.innerText = format(currentDate, "MMMM - yyyy");
  setupDates(selectedDate);
}

function setupDates(selectedDate) {
  const firstWeekStart = startOfWeek(startOfMonth(currentDate));
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate));

  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
  dateGrid.innerHTML = "";
  dates.forEach((date) => {
    const dateElement = document.createElement("button");
    dateElement.classList.add("date");
    dateElement.innerText = date.getDate();

    if (!isSameMonth(currentDate, date)) {
      dateElement.classList.add("date-picker-other-month-date");
    }

    if (isSameDay(selectedDate, date)) {
      dateElement.classList.add("selected");
    }

    dateElement.addEventListener("click", () => {
      setDate(date);
      datePicker.classList.remove("show");
    });

    dateGrid.appendChild(dateElement);
  });
}

function setDate(date) {
  datePickerButton.innerText = format(date, "MMMM dd, yyyy");
  datePickerButton.dataset.selectedDate = getUnixTime(date);
}

nextMonthButton.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  currentDate = addMonths(currentDate, 1);

  setupDatePicker(selectedDate);
});

previousMonthButton.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  currentDate = subMonths(currentDate, 1);

  setupDatePicker(selectedDate);
});

setDate(new Date());
