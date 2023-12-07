import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    input: {
      borderColor: 'black',
      borderWidth: 1,
      margin: 20,
      borderRadius: 10,
      fontSize: 15,
      padding: 10
    },
    addEmployee: {
      margin: 20,
      backgroundColor: 'blue'
    },
    addEmployeeDisabled:{
      margin: 20,
      backgroundColor: 'grey'
    },
    validationError: {
      color: 'red',
      marginLeft: 20
    },
  });