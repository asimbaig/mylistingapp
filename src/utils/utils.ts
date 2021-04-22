// import { Task } from '../features/calendar/types';

export const formatCountDownTime = (time: any) => {
  return `${time.hours}  :  ${time.minutes}  :  ${time.seconds}`;
};
export const formatStopwatchTime = (timer: number) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = Math.floor(timer / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours}  :  ${getMinutes}  :  ${getSeconds}`;
};
export const TotalHours = Array.from(Array(24).keys());
export const multiply = (num1: number, num2: number) => {
  return num1 * num2;
};
export const rangeArray = (start: number, end: number) => {
  let temp: number[] = [];
  for (let i = start; i <= end; i++) {
    temp.push(i);
  }
  return temp;
};
export const lastDayOfMonth = function (y: number, m: number) {
  return new Date(y, m, 0).getDate();
};
export const DateOutTime = (dateTime: any) => {
  var date = new Date(dateTime.getTime());
  date.setHours(0, 0, 0, 0);
  return date;
};
export const months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUEST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];
export const rows = [1, 2, 3, 4, 5, 6];
export const dayColumns = [
  { index: 1, weekday: "MONDAY" },
  { index: 2, weekday: "TUESDAY" },
  { index: 3, weekday: "WEDNESDAY" },
  { index: 4, weekday: "THURSDAY" },
  { index: 5, weekday: "FRIDAY" },
  { index: 6, weekday: "SATURDAY" },
  { index: 7, weekday: "SUNDAY" },
];
export const daysInMonth = (Year: number, Month: number) => {
  return new Date(Year, Month, 0).getDate();
};
export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};
export const percentage = (num: number, per: number) => {
  return (num / 100) * per;
};
export const updateObject = (oldObject: any, updatedProperties: any) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
