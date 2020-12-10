
export function taskTotalTime(data) {

  const parseTime = (startTime) => {

    let arr = startTime.split(':');

    let hours = arr[0];
    let minutes = arr[1];
    let seconds = arr[2];

    let s = parseInt(seconds);
    let m = parseInt(minutes);
    let h = parseInt(hours);

    return { s, m, h };
  };

  let s = 0;
  let m = 0;
  let h = 0;

  data.forEach((item, i) => {
    let res = parseTime(item.time);
    s += res.s;
    m += res.m;
    h += res.h;
  });

  let sec = s + (m * 60) + (h * 3600);

  let res = new Date(sec * 1000).toISOString().substr(11, 8)
  let format = res.substring(1);

  return format;
}
