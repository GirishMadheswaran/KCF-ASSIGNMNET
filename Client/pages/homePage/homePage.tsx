import React from 'react';
import {FlatList, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {styles} from './styles';
import userList from '../../zustand/userListStore';
import Button from '../../components/button/Button';
import { langConst } from '../../constants/constants';

interface HomePageProps {
  navigation: any;
}

export default function HomePage({navigation}: HomePageProps) {
  const {filterData, search, fetchPosts, searchFilter} = userList();

  React.useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, []),
  );

  const handleAddUser = () => {
    navigation.navigate('AddUser');
  };

  const handleUserDetails = (itemId: any) => {
    navigation.navigate('UserDetailsRender', {itemId});
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput
        placeholder={langConst.placeholders.searchInput}
        style={styles.inputBox}
        value={search}
        onChangeText={text => searchFilter(text)}
      />
      <Button title={langConst.buttons.addUser} onPress={handleAddUser} />
      <FlatList
        keyExtractor={item => item.id}
        data={filterData}
        renderItem={({item}) => (
          <View style={styles.title}>
            <TouchableOpacity onPress={() => handleUserDetails(item.id)}>
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
