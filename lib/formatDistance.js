const formatDistance = (distance) => {
  const str = distance.toString();
  const maxIndex = str.length - 1;
  let result = "";
  for (let i = maxIndex; i >= 0; i -= 1) {
    if ((maxIndex - i) % 3 === 0) {
      result = str[i]+ " " + result;
    } else {
      result = str[i] + result;
    }
  }
  return result;
};

export default formatDistance;
