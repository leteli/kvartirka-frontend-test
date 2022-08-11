const formatName = (name) => {
  if (name.startsWith('(')) {
    return name.replace(/[\(\)]/g, '');
  } else {
    return name.replace(/[\(\)]/g, '').split(' ').slice(1).join(' ');
  }
};

export default formatName;
