
import React from 'react';
import { Controller } from 'react-hook-form';
import { View, TextInput, Text } from 'react-native';
import {styles} from './styles';
import Button from '../../components/button/Button';
import useFormData from '../../forms/addUser/useFormData';
import { langConst } from '../../constants/constants';



interface AddUserProps {
  navigation: any;
}

export default function AddUser({navigation}: AddUserProps) {

  const { control, handleSubmit, formState, onSubmit, handleHomePage } = useFormData(navigation)
  
  return (
    <View>
      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              value={field.value}
              style={styles.input}
              placeholder={langConst.placeholders.nameInput}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
            {fieldState.error && (
              <Text style={styles.validationError}>
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
        name="name"
        rules={{ required: 'Name is required' }}
      />

      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              value={field.value}
              style={styles.input}
              placeholder={langConst.placeholders.nameInput}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              keyboardType="numeric"
            />
            {fieldState.error && (
              <Text style={styles.validationError}>
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
        name="age"
        rules={{ required: 'Age is required'}}
      />
      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              value={field.value}
              style={styles.input}
              placeholder={langConst.placeholders.emailInput}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              autoCapitalize="none"
              keyboardType= 'email-address'
            />
            {fieldState.error && (
              <Text style={styles.validationError}>
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        }}
      />

      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              value={field.value}
              style={styles.input}
              placeholder={langConst.placeholders.salaryInput}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              keyboardType='numeric'
            />
           {fieldState.error && (
              <Text style={styles.validationError}>
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
        name="salary"
        rules={{ required: 'Salary is required' }}
      />

      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              value={field.value}
              style={styles.input}
              placeholder={langConst.placeholders.descriptionInput}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
            {fieldState.error && (
              <Text style={styles.validationError}>
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
        name="description"
        rules={{ required: 'Description is required' }}
      />

      <Button
        style={!formState.isValid ? styles.addEmployeeDisabled : styles.addEmployee}
        title={langConst.buttons.addUser}
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
        
      />
      <Button
        style={styles.addEmployee}
        title={langConst.buttons.home}
        onPress={handleHomePage}
      />
    </View>
  );
};

