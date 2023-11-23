import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import useForm from '../../forms/addUser/useForm';
import { FormValues } from '../../forms/addUser/formValues';
import { POST_USER_DETAILS } from '../../hooks/apiUrls';
import { ageInput, descriptionInput, emailInput, nameInput, salaryInput } from '../../forms/addUser/placeHolder';
import { buttonText } from '../../components/button/buttonText';
import Button from '../../components/button/button';

interface AddUserProps {
  navigation: any;
}


function AddUser({ navigation}: AddUserProps): JSX.Element {

  const initialValues: FormValues = {
    name: '',
    age: '',
    email: '',
    salary: '',
    description: '',
  };

  const [validationErrors, setValidationErrors] = React.useState<Partial<FormValues>>(
    {}
  );


  const onSubmit = async (values: FormValues) => {
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

      console.log("result", result)

      Alert.alert('Success', 'Employee added successfully', [
        { text: 'OK', onPress: () => navigation.navigate('HomePage') },
      ]);
    } catch (error) {
      console.error('Error in saving data:', error);
    }
  };

  const clearValidationError = (fieldName: keyof FormValues) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: undefined,
    }));
  };


  const { formValues, handleChange, handleSubmit } = useForm(
    initialValues,
    onSubmit
  );

  return (
    <View>
      <TextInput
        value={formValues.name}
        style={styles.input}
        placeholder={nameInput}
        onChangeText={(text) => {
          handleChange('name', text);
          clearValidationError('name');
        }}
      />
      {validationErrors.name && (
        <Text style={styles.validationError}>{validationErrors.name}</Text>
      )}
      <TextInput
        value={formValues.age}
        style={styles.input}
        placeholder={ageInput}
        onChangeText={(text) => {
          handleChange('age', text);
          clearValidationError('age');
        }}
        keyboardType="numeric"
      />
       {validationErrors.age && (
        <Text style={styles.validationError}>{validationErrors.age}</Text>
      )}
      <TextInput
        value={formValues.email}
        style={styles.input}
        placeholder={emailInput}
        onChangeText={(text) => {
          handleChange('email', text);
          clearValidationError('email');
        }}
        autoCapitalize="none"
      />
       {validationErrors.email && (
        <Text style={styles.validationError}>{validationErrors.email}</Text>
      )}
      <TextInput
        value={formValues.salary}
        style={styles.input}
        placeholder={salaryInput}
        onChangeText={(text) => {
          handleChange('salary', text);
          clearValidationError('salary');
        }}
      />
       {validationErrors.salary && (
        <Text style={styles.validationError}>{validationErrors.salary}</Text>
      )}
      <TextInput
        value={formValues.description}
        style={styles.input}
        placeholder={descriptionInput}
        onChangeText={(text) => {
          handleChange('description', text);
          clearValidationError('description');
        }}
      />
       {validationErrors.description && (
        <Text style={styles.validationError}>{validationErrors.description}</Text>
      )}
      <Button  
        style= {styles.addEmployee}
        title={buttonText.addUserPage.addUser}
        onPress={handleSubmit}
      />
      <Button 
        style= {styles.addEmployee} 
        title={buttonText.addUserPage.home}
        onPress={() => navigation.navigate('HomePage')}
      />
    </View>
  );
};

export default AddUser;

