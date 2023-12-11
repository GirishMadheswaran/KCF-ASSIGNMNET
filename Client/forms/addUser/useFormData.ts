import { POST_USER_DETAILS } from '../../zustand/apiUrls';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';


const useFormData = (navigation: any) => {
  const { control, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data : any) => {
    // console.log(data);
    const { name, age, email, salary, description } = data;
    try {
      const result = await fetch(`${POST_USER_DETAILS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, age, salary, description }),
      });

      if (result.ok) {
        Alert.alert('Success', 'Employee added successfully', [
          { text: 'OK', onPress: () => navigation.navigate('HomePage') },
        ]);
      } else {
        // Handle error cases
        Alert.alert('Error', 'Failed to add employee');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  };

  const handleHomePage = () => {
    navigation.navigate('HomePage');
  };


  return { control, handleSubmit, formState, onSubmit, handleHomePage };
};

export default useFormData;
