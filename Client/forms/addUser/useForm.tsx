import React from 'react';
import {FormValues} from './formValues';

const useForm = (
  initialValues: FormValues,
  onSubmit: (values: FormValues) => Promise<void>,
) => {
  const [values, setValues] = React.useState<FormValues>(initialValues);

  const handleChange = (name: keyof FormValues, value: string) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Error in saving data:', error);
    }
  };

  return {
    formValues: values,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
