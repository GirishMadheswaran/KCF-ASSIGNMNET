import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const MainPage = ({navigation}) => {
  const [filterData, setFilterData] = useState([]);
  const [apiData, setapiData] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, []),
  );

  const fetchPosts = async () => {
    // console.log("entered fetch")
    await fetch('http://localhost:8080/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        // console.log('response::::::', response);
        return response.json();
      })
      .then(data => {
        setapiData(data);
        setFilterData(data);
        // console.log('data:::::::::', data);
      })
      .catch(err => {
        console.error('Error in fetching the data', err);
      });
  };

  const searchFilter = text => {
    if (text) {
      const newData = apiData.filter(item => {
        // console.log("itemm::::::::::",item)
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(apiData);
      setSearch(text);
    }
  };

  // console.log('filterData::::::', filterData);
  // console.log('apiData::::::', apiData);

  return (
    <View style={styles.mainContainer}>
      <TextInput
        placeholder="search"
        style={styles.inputBox}
        value={search}
        underlineColorAndroid="transparent"
        onChangeText={text => searchFilter(text)}
      />
      <TouchableOpacity
        style={styles.addEmployee}
        onPress={() => navigation.navigate('AddUser')}>
        <Text style={styles.addEmployeeText}>Add Employee</Text>
      </TouchableOpacity>
      <FlatList
        keyExtractor={item => item.id}
        data={filterData}
        renderItem={({item}) => (
          <View style={styles.title}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserDetails', {itemId: item.id})}>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.age}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 10,
    padding: 20,
    backgroundColor: 'pink',
    fontSize: 24,
    borderRadius: 10,
  },
  inputBox: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addEmployeeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addEmployee: {
    paddingHorizontal: 100,
    borderRadius: 10,
    backgroundColor: 'blue',
    height: 40,
    paddingTop: 10,
    margin: 10,
  },
});

export default MainPage;