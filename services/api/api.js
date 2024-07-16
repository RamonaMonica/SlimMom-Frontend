import axios from 'axios';

axios.defaults.baseURL = 'https://slimmom-backend-du1t.onrender.com';

const END_POINTS = {
  DailyCalorieIntake: '/api/products',
};

export const apiCalorieIntake = async body => {
  const res = await axios.post(END_POINTS.DailyCalorieIntake, body);

  return res.data;
};
