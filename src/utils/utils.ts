import { Item } from '../redux/itemType';
import { PickerColumn } from "@ionic/core";

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
export const addDays = (date: string, days: number) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};
export const createGroups = (arr: Item[], numGroups: number) => {
  const perGroup = Math.ceil(arr.length / numGroups);
  return new Array(numGroups)
    .fill("")
    .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
};
export const Categories: String[] = ["Services", "Home", "Jobs", "Property", "Pets","Electronics"];
export const DayColumn = {
  name: "Category",
  options: [
    { text: "Services", value: 0 },
    { text: "Home", value: 1 },
    { text: "Jobs", value: 2 },
    { text: "Property", value: 3 },
    { text: "Pets", value: 4 },
    { text: "Electronics", value: 5 },
  ],
} as PickerColumn;

export const SubDayColumn = [
  {
    name: "SubCategory",
    options: [
      { text: "Plumber", value: "Plumber" },
      { text: "Electrician", value: "Electrician" },
      { text: "FoodDrink", value: "FoodDrink" },
      { text: "Transport", value: "Transport" },
    ],
  },
  {
    name: "SubCategory",
    options: [
      { text: "Appliances", value: "Appliances" },
      { text: "Tools", value: "Tools" },
      { text: "Furniture", value: "Furniture" },
    ],
  },
  {
    name: "SubCategory",
    options: [
      { text: "IT", value: "IT" },
      { text: "Marketing", value: "Marketing" },
      { text: "Management", value: "Management" },
    ],
  },
  {
    name: "SubCategory",
    options: [
      { text: "Land", value: "Land" },
      { text: "Domestic", value: "Domestic" },
      { text: "Commercial", value: "Commercial" },
    ],
  },
  {
    name: "SubCategory",
    options: [
      { text: "Animal", value: "Animal" },
      { text: "Bird", value: "Bird" },
    ],
  },
  {
    name: "SubCategory",
    options: [
      { text: "Gadgets", value: "Gadgets" },
    ],
  },
] as PickerColumn[];

export const listingFilter = {
  Services: {
    Plumber: true,
    Electrician: true,
    FoodDrink: true,
    Transport: true,
  },
  Home: {
    Appliances: true,
    Tools: true,
    Furniture: true,
  },
  Jobs: {
    IT: true,
    Marketing: true,
    Management: true,
  },
  Property: {
    Land: true,
    Domestic: true,
    Commercial: true,
  },
  Electronics:{
    Gadgets: true
  }
};
export const guid = () => (S4() + "-" + S4() + "-4" + S4().substr(0,3)).toLowerCase();
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}