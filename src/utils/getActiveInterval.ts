export const getActiveIntervals = (specificDateStr: any) => {
  //   var specificDateStr = "2023-07-14T08:43:32Z";

  // Create Date objects for the specific date and current date
  var specificDate: any = new Date(specificDateStr);
  var currentDate: any = new Date();

  // Calculate the duration in milliseconds
  var durationMs: any = currentDate - specificDate;

  // Convert the duration to years, months, and days
  var duration: any = {};

  duration.years = Math.floor(durationMs / (1000 * 60 * 60 * 24 * 365));
  durationMs -= duration.years * (1000 * 60 * 60 * 24 * 365);

  duration.months = Math.floor(durationMs / (1000 * 60 * 60 * 24 * 30));
  durationMs -= duration.months * (1000 * 60 * 60 * 24 * 30);

  duration.days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
  return duration;
};

export const isoStr = (timeStr: string) => {
  //   var [dateStr, timeWithoutSeconds, _] = timeStr.split(" ");
  //   var [hour, minute] = timeWithoutSeconds.split(":");
  //   var date = new Date(`${timeStr.slice(0, 10)}T${timeStr.slice(12, 14)}:${timeStr.slice(15, 17)}:00Z`);
  //   var iso8601Str = date.toISOString();
  var date = new Date(timeStr);
  const iso8601Str = date.toISOString();

  return iso8601Str;
};
