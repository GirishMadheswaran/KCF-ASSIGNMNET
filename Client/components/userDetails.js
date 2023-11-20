import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const UserDetails = ({route, navigation}) => {
  const {itemId} = route.params;
  const [apiData, setapiData] = useState({});

  //   console.log('apiData', apiData);

  

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
        // console.log('data::::', data);
        setapiData(data);
      })
      .catch(err => {
        console.error('Error in fetching the data', err);
      });
  };
  
  useEffect(() => {
    fetchPosts();
  }, [itemId]);
  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [itemId]),
  );

  // console.log('image paath::::::', `${apiData.image}` );
  return (
    <View style={styles.mainContainer}>
      {apiData ? (
        <ScrollView>
          <View style={styles.scroll}>
          {apiData.image && (
            <Image
              source={{ uri: apiData.image }}
              style={styles.img}
            />
          )}
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
              <Text style={styles.boldText}>Description:</Text>
              {apiData.description}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('MainPage')}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Text>Loading</Text>
      )}
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
  img:{
    width: 200,
    height: 200
  },
  scroll: {
    alignItems: 'center',
    alignContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingLeft: 30,
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
