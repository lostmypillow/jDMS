export default function (obj1, obj2)  {  if (obj1["priority"] !== obj2["priority"]) {
    if (obj1["priority"] > obj2["priority"]) {
      return "down";
    } else if (obj1["priority"] < obj2["priority"]) {
      return "up";
    }
  } else {
    return false;
  }}