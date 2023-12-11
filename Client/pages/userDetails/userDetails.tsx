import React, { useEffect } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { styles } from './styles';
import GetUserDetailsStore from '../../zustand/getUserDetailsStore';
import Button from '../../components/button/Button';
import { useFocusEffect } from '@react-navigation/native';
import { langConst } from '../../constants/constants';

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
          <Button  
            title={langConst.buttons.back}
            onPress={handleHomePage}
            style={styles.btn}
          />
          <View style={styles.content}>
            {userData.image && (
              <Image source={{ uri: userData.image }} style={styles.img} />
            )}
            <Text>
              <Text style={styles.boldText}>{langConst.formlabels.name}:</Text> {userData.name}
            </Text>
            <Text>
              <Text style={styles.boldText}>{langConst.formlabels.age}:</Text> {userData.age}
            </Text>
            <Text>
              <Text style={styles.boldText}>{langConst.formlabels.email}:</Text> {userData.email}
            </Text>
            <Text>
              <Text style={styles.boldText}>{langConst.formlabels.salary}:</Text> {userData.salary}
            </Text>
            <Text>
              <Text style={styles.boldText}>{langConst.formlabels.description}:</Text>
              {userData.description}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

