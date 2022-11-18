import moment from "moment";

export const getCurrent = (type) => {
  const startDate = moment().startOf(type).format("YYYY-MM-DD");
  const endDate = moment(new Date().getTime()).format("YYYY-MM-DD h:mm:ss");
  return [startDate + " 00:00:00", endDate];
};

export const getLast = (subtract, type) => {
  const startDate = moment()
    .subtract(1, subtract)
    .startOf(type)
    .format("YYYY-MM-DD");
  const endDate = moment()
    .subtract(1, subtract)
    .endOf(type)
    .format("YYYY-MM-DD");
  return [startDate, endDate];
};

export const thisWeekDate = () => {
  const startDate = moment().startOf("isoWeek").format("DD");
  const endDate = moment().endOf("isoWeek").format("DD MMM, YYYY");
  return `${startDate} - ${endDate}`;
};

export const getLastDays = (days) => {
  const startDate = moment().startOf("day").subtract(days, "days");
  const endDate = moment(new Date().getTime()).format("YYYY-MM-DD h:mm:ss");
  // const endDate = moment().endOf("day").add(1, "day");
  return [startDate, endDate];
};
