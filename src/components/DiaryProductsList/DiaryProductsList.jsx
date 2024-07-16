import { DiaryProductsListItem } from 'components/DiaryProductsListItem/DiaryProductsListItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from 'redux/authSelectors';
import { getProducts, selectDate } from 'redux/productsSelectors';
import { setProducts } from 'redux/productsSlice';
import { List, NoProductsContainer } from './DiaryProductsList.styled';
import { apiListMyProducts } from 'services/api/api';

export const DiaryProductsList = () => {
  const token = useSelector(getToken);
  const date = useSelector(selectDate);
  const dispatch = useDispatch();
  const products = useSelector(getProducts);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await apiListMyProducts(date, token);

        if (result.length > 0) dispatch(setProducts(result[0].productInfo));
        else dispatch(setProducts([]));
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [date, dispatch, token]);

  return (
    <List className={products.length > 4 ? null : 'hidden'}>
      {products.length !== 0 ? (
        products.map(product => {
          return (
            <DiaryProductsListItem
              key={product._id}
              id={product._id}
              name={product.productName}
              grams={product.productWeight}
              calories={product.productCalories}
            />
          );
        })
      ) : (
        <NoProductsContainer>
          <p
            style={{
              color: '#000',
            }}
          >
            Add something!
          </p>
        </NoProductsContainer>
      )}
    </List>
  );
};
