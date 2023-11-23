import React from 'react';
import HomePage from './pages/homePage/homePage';
import AddUser from './pages/adduser/addUser';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDetails from './pages/userDetails/userDetails';
import { createStackNavigator } from '@react-navigation/stack';


type RootStackParamList = {
  HomePage: undefined;
  AddUser: undefined;
  UserDetailsRender: { itemId: string }; // Make sure to adjust the type according to your actual data type
};

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
        <Stack.Screen name="AddUser" component={AddUser} options={{ headerShown: false }}/>
        <Stack.Screen name="UserDetailsRender" component={UserDetails} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <>
    //   {/* <MainPage /> */}
    //   <AddUser />
    // </>
  );
}

export default App;
