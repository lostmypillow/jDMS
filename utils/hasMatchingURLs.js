export default function (arr1, arr2) {
  return arr1.some((item1) => arr2.some((item2) => item1.url === item2.url));
}
