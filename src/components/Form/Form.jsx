import React from 'react';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import { useMediaQuery } from 'react-responsive';
import * as yup from 'yup';
import { Box } from 'components/Box';
import { ButtonForm } from './Form.styled';
import {
  ButtonWrapper,
  Checkbox,
  CheckboxContainer,
  Error,
  Input,
  Label,
  List,
  Paragraph,
} from './Form.styled';
import { saveInStor } from 'services/local/storage';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn, getToken } from 'redux/authSelectors';
import { apiUpdateInfoUser } from 'services/api/api';
import { apiCalorieIntake } from 'services/api/api';
import { setInfoUser } from 'redux/authSlice';

const schema = yup.object().shape({
  height: yup
    .number('Height is use only number')
    .min(100, 'Please enter a number more than or equal to 100')
    .max(250, 'Please enter a number less than or equal to 250')
    .integer('Height must be a integer number')
    .typeError('Height must be a number')
    .required('Height is required field'),

  age: yup
    .number('Age is use only number')
    .min(18, 'Please enter a number more than or equal to 18')
    .max(100, 'Please enter a number less than or equal to 100')
    .typeError('Age must be a number')
    .required('Age is required field')
    .integer('Age must be a integer number'),

  currentWeight: yup
    .number('Current weight is use only number')
    .min(20, 'Please enter a number more than or equal to 20')
    .max(500, 'Please enter a number less than or equal to 500')
    .typeError('Current weight must be a number')
    .required('Current weight is required field')
    .integer('Current weight must be a integer number'),

  desiredWeight: yup
    .number('Desired weight is use only number')
    .min(20, 'Please enter a number more than or equal to 20')
    .max(500, 'Please enter a number less than or equal to 500')
    .typeError('Desired weight must be a number')
    .required('Desired weight is required field')
    .integer('Desired weight must be a integer number'),

  bloodType: yup.number().required('Blood type is a required field'),
});

export const WeightForm = ({ openModal, setUserParams, initialValues }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 554px)' });
  const isLogged = useSelector(getIsLoggedIn);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  const startValues = {
    height: '',
    age: '',
    currentWeight: '',
    desiredWeight: '',
    bloodType: '',
  };

  const handleSubmit = async values => {
    const params = { ...values };
    params.bloodType = +params.bloodType;

    try {
      await schema.validate(params);
    } catch (validationError) {
      console.error('Validation error:', validationError);

      return;
    }

    setUserParams(params);
    saveInStor('params', params);
    openModal(true);

    if (isLogged) {
      const { height, age, currentWeight, desiredWeight, bloodType } = params;
      const data = await apiCalorieIntake(params);

      if (data) {
        const { dailyRate, notAllowedProducts, notAllowedProductsAll } = data;

        const notAllowedProductsAllString =
          notAllowedProductsAll && notAllowedProductsAll.length
            ? notAllowedProductsAll.join(', ')
            : 'You can eat everything';

        const body = {
          height,
          age,
          currentWeight,
          desiredWeight,
          bloodType,
          dailyRate,
          notAllowedProducts,
          notAllowedProductsAll: notAllowedProductsAllString,
        };

        console.log('Updating user info with body:', body);

        try {
          await apiUpdateInfoUser(token, body);

          dispatch(setInfoUser(body));
        } catch (error) {
          console.error('Error updating user info:', error);
        }
      }
    }
  };

  return (
    <Box>
      <Formik initialValues={startValues} onSubmit={handleSubmit} validationSchema={schema}>
        <Form>
          <List>
            <li
              style={
                isMobile
                  ? null
                  : {
                      gridColumnStart: '1',
                      gridColumnEnd: '1',
                      gridRowStart: '1',
                      gridRowEnd: '1',
                    }
              }
            >
              <label>
                <Field as={Input} type='number' name='height' placeholder='Height, cm *' />

                <ErrorMessage name='height' component={Error} />
              </label>
            </li>

            <li
              style={
                isMobile
                  ? null
                  : {
                      gridColumnStart: '1',
                      gridColumnEnd: '1',
                      gridRowStart: '2',
                      gridRowEnd: '2',
                    }
              }
            >
              <label>
                <Field as={Input} type='number' name='age' placeholder='Age *' />

                <ErrorMessage name='age' component={Error} />
              </label>
            </li>

            <li
              style={
                isMobile
                  ? null
                  : {
                      gridColumnStart: '1',
                      gridColumnEnd: '1',
                      gridRowStart: '3',
                      gridRowEnd: '3',
                      position: 'relative',
                      top: '-20px',
                    }
              }
            >
              <label>
                <Field
                  as={Input}
                  type='number'
                  name='currentWeight'
                  placeholder='Current weight, kg *'
                />

                <ErrorMessage name='currentWeight' component={Error} />
              </label>
            </li>

            <li>
              <label>
                <Field
                  as={Input}
                  type='number'
                  name='desiredWeight'
                  placeholder='Desired weight, kg *'
                />

                <ErrorMessage name='desiredWeight' component={Error} />
              </label>
            </li>

            <li>
              <Paragraph>Blood type *</Paragraph>

              <CheckboxContainer role='group' aria-labelledby='my-radio-group'>
                <Label>
                  <Field as={Checkbox} type='radio' name='bloodType' value='1' />0
                </Label>

                <Label>
                  <Field as={Checkbox} type='radio' name='bloodType' value='2' />A
                </Label>

                <Label>
                  <Field as={Checkbox} type='radio' name='bloodType' value='3' />B
                </Label>

                <Label>
                  <Field as={Checkbox} type='radio' name='bloodType' value='4' />
                  AB
                </Label>
              </CheckboxContainer>
            </li>
          </List>

          <ButtonWrapper disabled={!initialValues}>
            <ButtonForm type='submit'>Start losing weight</ButtonForm>
          </ButtonWrapper>
        </Form>
      </Formik>
    </Box>
  );
};
