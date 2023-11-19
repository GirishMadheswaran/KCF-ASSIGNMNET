import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

const AddUser = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setemail] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');

  const saveData = async () => {
    if (!name || !age || !email || !salary || !description) {
      Alert.alert('Please fill out all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address');
      return;
    }
    const url = 'http://localhost:8080/post';
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, age, salary, description}),
    });
    if (result) {
      setName('');
      setAge('');
      setemail('');
    }

    Alert.alert('Success', 'Employee added successfully', [
      {text: 'OK', onPress: () => navigation.navigate('MainPage')},
    ]);
  };
  return (
    <View>
      <TextInput
        value={name}
        style={styles.input}
        placeholder="Enter Name"
        onChangeText={text => setName(text)}
      />
      <TextInput
        value={age}
        style={styles.input}
        placeholder="Enter Age"
        onChangeText={text => setAge(text)}
        keyboardType="numeric"
      />
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Enter email"
        onChangeText={text => setemail(text)}
        autoCapitalize="none"
      />
      <TextInput
        value={salary}
        style={styles.input}
        placeholder="Enter Salary"
        onChangeText={text => setSalary(text)}
      />
      <TextInput
        value={description}
        style={styles.input}
        placeholder="Enter Description"
        onChangeText={text => setDescription(text)}
      />
      <TouchableOpacity style={styles.addEmployee} onPress={saveData}>
        <Text style={styles.addEmployeeText}>Add Employee</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addEmployee}
        onPress={() => navigation.navigate('MainPage')}>
        <Text style={styles.addEmployeeText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 20,
    borderRadius: 10,
    fontSize: 15,
  },
  addEmployeeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addEmployee: {
    paddingHorizontal: 120,
    borderRadius: 10,
    backgroundColor: 'blue',
    height: 40,
    paddingTop: 7,
    margin: 10,
  },
});

export default AddUser;
