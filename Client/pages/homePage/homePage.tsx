import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {styles} from './styles';
import userList from '../../hooks/userListhooks';
import { buttonText } from '../../components/button/buttonText';
import Button from '../../components/button/button';

interface HomePageProps {
  navigation: any;
}

function HomePage({navigation}: HomePageProps): JSX.Element {
  const {filterData, search, searchFilter} = userList();

  return (
    <View style={styles.mainContainer}>
      <TextInput
        placeholder="search"
        style={styles.inputBox}
        value={search}
        underlineColorAndroid="transparent"
        onChangeText={text => searchFilter(text)}
      />
      <Button  
        title={buttonText.homePage.addUser} 
        onPress={() => navigation.navigate('AddUser')}
      />
      <FlatList
        keyExtractor={item => item.id}
        data={filterData}
        renderItem={({item}) => (
          <View style={styles.title}>
            <TouchableOpacity
              onPress={() => {
                console.log('Navigating with itemId:', item.id);
                navigation.navigate('UserDetailsRender', {itemId: item.id});
              }}>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.age}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default HomePage;
