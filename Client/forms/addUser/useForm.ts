import React from 'react';
import { FormValues } from './formValues';
import { POST_USER_DETAILS } from '../../zustand/apiUrls';
import { Alert } from 'react-native';

const useForm = (navigation: any) => {

  const initialValues: FormValues = {
    name: '',
    age: '',
    email: '',
    salary: '',
    description: '',
  };

  const [values, setValues] = React.useState<FormValues>(initialValues);
  const [validationErrors, setValidationErrors] = React.useState<Partial<FormValues>>({});

  
  const handleChange = (name: keyof FormValues, value: string) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //handle the error
  const clearValidationError = (fieldName: keyof FormValues) => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: undefined,
    }));
  };

  //submit function
  const handleSubmit = async () => {
    const { name, age, email, salary, description } = values;
    const errors: Partial<FormValues> = {};

    if (!name) {
      errors.name = 'Please enter a name';
    }

    if (!age) {
      errors.age = 'Please enter an age';
    }

    if (!email) {
      errors.email = 'Please enter an email address';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (!salary) {
      errors.salary = 'Please enter a salary';
    }

    if (!description) {
      errors.description = 'Please enter a description';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const result = await fetch(`${POST_USER_DETAILS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, age, salary, description }),
      });

      Alert.alert('Success', 'Employee added successfully', [
        { text: 'OK', onPress: () => navigation.navigate('HomePage') },
      ]);
    } catch (error) {
      console.error('Error in saving data:', error);
    }
  };

  const handleFieldChange = (fieldName: keyof FormValues, text: string) => {
    handleChange(fieldName, text);
    clearValidationError(fieldName);
  };

  const handleHomePage = () => {
    navigation.navigate('HomePage');
  };

  const isFormValid = () => {
    const { name, age, email, salary, description } = values;

    return !!name && !!age && !!email && !!salary && !!description;
  };

  return {
    formValues: values,
    validationErrors,
    handleChange,
    handleSubmit,
    clearValidationError,
    handleFieldChange,
    handleHomePage,
    isFormValid
  };
};

export default useForm;
