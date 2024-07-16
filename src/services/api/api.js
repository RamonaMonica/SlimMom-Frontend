import axios from 'axios';

axios.defaults.baseURL = 'https://slimmom-backend-du1t.onrender.com';

const END_POINTS = {
  DailyCalorieIntake: '/products',
  AddMyProduct: '/myProducts/addProduct',
  ListMyProducts: '/myProducts/listMyProduct',
  DeleteMyProduct: '/myProducts/',
  GetSearchProducts: '/products/searchProducts',
  UpdateUserInfo: '/users/infousers',
};

const handleApiError = error => {
  console.error('API Request Error:', error);

  throw error;
};

export const apiCalorieIntake = async body => {
  try {
    const res = await axios.post(END_POINTS.DailyCalorieIntake, body);

    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const apiUpdateInfoUser = async (token, body) => {
  try {
    const res = await axios.patch(END_POINTS.UpdateUserInfo, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.result;
  } catch (error) {
    handleApiError(error);
  }
};

export const apiAddMyProduct = async (body, token) => {
  try {
    const res = await axios.post(END_POINTS.AddMyProduct, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.newProduct.productInfo;
  } catch (error) {
    handleApiError(error);
  }
};

export const apiDeleteMyProduct = async (id, token, date) => {
  try {
    const res = await axios.delete(END_POINTS.DeleteMyProduct + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        date,
      },
    });

    return res.data.newProduct.productInfo;
  } catch (error) {
    handleApiError(error);
  }
};

export const apiListMyProducts = async (date, token) => {
  try {
    const res = await axios.post(
      END_POINTS.ListMyProducts,
      { date },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.productList;
  } catch (error) {
    handleApiError(error);
  }
};

export const apiGetSearchProducts = async value => {
  try {
    const res = await axios.get(END_POINTS.GetSearchProducts, {
      params: {
        title: value,
      },
    });

    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
