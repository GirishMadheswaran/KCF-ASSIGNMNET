import { useFocusEffect } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { useEffect, useState } from 'react';
import { GET_USER_DETAILS } from './apiUrls';

interface ApiData {
  image?: string;
  name?: string;
  email?: string;
  age?: number;
  salary?: number;
  description?: string;
}

const useApiData = (itemId: string | undefined) => {
  const [apiData, setApiData] = useState<ApiData>({});
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${GET_USER_DETAILS}${itemId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setApiData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error in fetching the data', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itemId) {
      fetchPosts();
    }
  }, [itemId]);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [itemId, fetchPosts]),
  );

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: apiData.name || 'User Details',
  //   });
  // }, [apiData.name, navigation]);

  return { apiData, loading, fetchPosts };
};

export default useApiData;
