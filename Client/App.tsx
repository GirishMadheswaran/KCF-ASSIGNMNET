import React from 'react';

import MainPage from './components/mainPage';
import AddUser from './components/addUser';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDetails from './components/userDetails';


const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }}/>
        <Stack.Screen name="AddUser" component={AddUser} options={{ headerShown: false }}/>
        <Stack.Screen name="UserDetails" component={UserDetails} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <>
    //   {/* <MainPage /> */}
    //   <AddUser />
    // </>
  );
}

export default App;
