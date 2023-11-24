import React, { useEffect } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { styles } from './styles';
import GetUserDetailsStore from '../../zustand/getUserDetailsStore';
import { buttonText } from '../../components/button/buttonText';
import Button from '../../components/button/Button';
import { useFocusEffect } from '@react-navigation/native';
import { formLabels } from '../../forms/formLabels';

interface UserDetailsProps {
  route: {
    params?: {
      itemId?: string;
    };
  };
  navigation: any;
}


export default function UserDetails({ route, navigation }: UserDetailsProps) {
  const { itemId } = route.params || {};

  const { userData, loading, fetchPosts } = GetUserDetailsStore();


  useEffect(() => {
    if (itemId) {
      fetchPosts(itemId);
    }
  }, [itemId, fetchPosts]);

  useFocusEffect(
    React.useCallback(() => {
      if (itemId) {
        fetchPosts(itemId);
      }
    }, [itemId, fetchPosts]),
  );

  const handleHomePage = () => {
    navigation.navigate('HomePage');
  };

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <ScrollView>
          <View style={styles.content}>
            {userData.image && (
              <Image source={{ uri: userData.image }} style={styles.img} />
            )}
            <Text>
              <Text style={styles.boldText}>{formLabels.userDetailsPage.name}:</Text> {userData.name}
            </Text>
            <Text>
              <Text style={styles.boldText}>{formLabels.userDetailsPage.age}:</Text> {userData.age}
            </Text>
            <Text>
              <Text style={styles.boldText}>{formLabels.userDetailsPage.email}:</Text> {userData.email}
            </Text>
            <Text>
              <Text style={styles.boldText}>{formLabels.userDetailsPage.salary}:</Text> {userData.salary}
            </Text>
            <Text>
              <Text style={styles.boldText}>{formLabels.userDetailsPage.description}:</Text>
              {userData.description}
            </Text>
          </View>
          <Button  
            title={buttonText.detailsPage.back}
            onPress={handleHomePage}
          />
        </ScrollView>
      )}
    </View>
  );
}

