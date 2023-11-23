import React, { useLayoutEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import useApiData from '../../hooks/getUserDetailsthooks'; // Import the custom hook
import { buttonText } from '../../components/button/buttonText';
import Button from '../../components/button/button';

interface UserDetailsProps {
  route: {
    params?: {
      itemId?: string;
    };
  };
  navigation: any;
}

function UserDetails({ route, navigation }: UserDetailsProps): JSX.Element {
  const { itemId } = route.params || {};
  // console.log('itemId:', itemId);

  const { apiData, loading } = useApiData(itemId);

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <ScrollView>
          <View style={styles.content}>
            {apiData.image && (
              <Image source={{ uri: apiData.image }} style={styles.img} />
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
          <Button  
            title={buttonText.detailsPage.back}
            onPress={() => navigation.navigate('HomePage')}
          />
        </ScrollView>
      )}
    </View>
  );
}

export default UserDetails;

