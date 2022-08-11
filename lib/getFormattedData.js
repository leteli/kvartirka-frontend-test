import formatDate from './formatDate.js';
import formatDistance from './formatDistance.js';
import formatName from './formatName.js';

const getFormattedData = (data) => {
  const date = data.close_approach_data[0].close_approach_date;
  const hazardous = data.is_potentially_hazardous_asteroid;
  const hazard = hazardous ? 'Опасен' : 'Не опасен';
  const { meters } = data.estimated_diameter;
  const kilometers = data.close_approach_data[0].miss_distance.kilometers;
  const lunar = data.close_approach_data[0].miss_distance.lunar;
  return {
    name: formatName(data.name),
    hazard,
    date: formatDate(date),
    dMin: Math.round(meters.estimated_diameter_min),
    dMax: Math.round(meters.estimated_diameter_max),
    kilometers: formatDistance(Math.round(kilometers)),
    lunar: formatDistance(Math.round(lunar)),
  };
};

export default getFormattedData;
