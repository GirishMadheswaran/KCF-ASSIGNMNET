import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useEffect, useState } from 'react';
import { GET_USER_LIST } from './apiUrls';


const userList = () => {
    const [filterData, setFilterData] = useState<any[]>([]);
    const [apiData, setApiData] = useState<any[]>([]);
    const [search, setSearch] = useState<string>('');
  
    useEffect(() => {
      fetchPosts();
    }, []);
  
    useFocusEffect(
      React.useCallback(() => {
        fetchPosts();
      }, []),
    );
  
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${GET_USER_LIST}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setApiData(data);
        setFilterData(data);
      } catch (err) {
        console.error('Error in fetching the data', err);
      }
    };
  
    const searchFilter = (text: string) => {
      if (text) {
        const newData = apiData.filter((item) => {
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

  return { apiData, filterData,search, searchFilter };
};

export default userList;
