import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const UserDetails = ({route, navigation}) => {
  const {itemId} = route.params;
  const [apiData, setapiData] = useState({});

  //   console.log('apiData', apiData);

  useEffect(() => {
    fetchPosts();
  }, [itemId]);
  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [itemId]),
  );

  const fetchPosts = async () => {
    // console.log("entered fetch:::::")
    await fetch(`http://localhost:8080/get/${itemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        // console.log('response:::::', res);
        return res.json();
      })
      .then(data => {
        console.log('data', data);
        setapiData(data);
      })
      .catch(err => {
        console.error('Error in fetching the data', err);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.scroll}>
          <Text>
            <Text style={styles.boldText}>Name:</Text> {apiData.name}
          </Text>
          <Text>
            <Text style={styles.boldText}>Email:</Text> {apiData.email}
          </Text>
          <Text>
            <Text style={styles.boldText}>Age:</Text> {apiData.age}
          </Text>
          <Text>
            <Text style={styles.boldText}>Salary:</Text> {apiData.salary}
          </Text>
          <Text>
            <Text style={styles.boldText}>Description:</Text>{' '}
            {apiData.description}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('MainPage')}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  scroll:{
    alignItems:'center',
    alignContent: 'center'
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingLeft: 30
  },
  backButton: {
    borderRadius: 10,
    backgroundColor: 'blue',
    height: 40,
    paddingTop: 10,
    paddingLeft: 100,
    margin: 10,
  },
  boldText: {
    fontWeight: 'bold',
    paddingTop: 10,
    margin: 10,
  },
});

export default UserDetails;
