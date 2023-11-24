import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from './styles';
import useForm from '../../forms/addUser/useForm';
import {buttonText} from '../../components/button/buttonText';
import Button from '../../components/button/Button';
import {placeHolder} from '../../forms/placeHolder';

interface AddUserProps {
  navigation: any;
}

export default function AddUser({navigation}: AddUserProps) {

  //useForm hooks 
  const {
    formValues,
    validationErrors,
    handleSubmit,
    handleFieldChange,
    handleHomePage,
  } = useForm(navigation);

  return (
    <View>
      <TextInput
        value={formValues.name}
        style={styles.input}
        placeholder={placeHolder.addUserPage.nameInput}
        onChangeText={text => handleFieldChange('name', text)}
      />
      {validationErrors.name && (
        <Text style={styles.validationError}>{validationErrors.name}</Text>
      )}
      <TextInput
        value={formValues.age}
        style={styles.input}
        placeholder={placeHolder.addUserPage.ageInput}
        onChangeText={text => handleFieldChange('age', text)}
        keyboardType="numeric"
      />
      {validationErrors.age && (
        <Text style={styles.validationError}>{validationErrors.age}</Text>
      )}
      <TextInput
        value={formValues.email}
        style={styles.input}
        placeholder={placeHolder.addUserPage.emailInput}
        onChangeText={text => handleFieldChange('email', text)}
        autoCapitalize="none"
      />
      {validationErrors.email && (
        <Text style={styles.validationError}>{validationErrors.email}</Text>
      )}
      <TextInput
        value={formValues.salary}
        style={styles.input}
        placeholder={placeHolder.addUserPage.salaryInput}
        onChangeText={text => handleFieldChange('salary', text)}
      />
      {validationErrors.salary && (
        <Text style={styles.validationError}>{validationErrors.salary}</Text>
      )}
      <TextInput
        value={formValues.description}
        style={styles.input}
        placeholder={placeHolder.addUserPage.descriptionInput}
        onChangeText={text => handleFieldChange('description', text)}
      />
      {validationErrors.description && (
        <Text style={styles.validationError}>
          {validationErrors.description}
        </Text>
      )}
      <Button
        style={styles.addEmployee}
        title={buttonText.addUserPage.addUser}
        onPress={handleSubmit}
      />
      <Button
        style={styles.addEmployee}
        title={buttonText.addUserPage.home}
        onPress={handleHomePage}
      />
    </View>
  );
}
