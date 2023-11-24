import React from 'react';
import HomePage from './pages/homePage/HomePage';
import AddUser from './pages/adduser/AddUser';
import {NavigationContainer} from '@react-navigation/native';
import UserDetails from './pages/userDetails/UserDetails';
import {createStackNavigator} from '@react-navigation/stack';

type RootStackParamList = {
  HomePage: undefined;
  AddUser: undefined;
  UserDetailsRender: {itemId: string};
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserDetailsRender"
          component={UserDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
