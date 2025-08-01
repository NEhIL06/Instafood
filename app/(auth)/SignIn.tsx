import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react';
import { Link, router } from 'expo-router';
import CustomInput from '@/components/customInput';
import CustomButton from '@/components/customButton';
import { signin } from '@/lib/appwrite';
import * as Sentry from '@sentry/react-native';
const SignIn = () =>{
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form,setForm] = useState({
    email:'',
    password:'',});
  const submit = async () => {
    const {email,password} = form;
    if(!email || !password) return Alert.alert('Please fill all fields');
    setIsSubmitting(true);
    try {
      await signin({email,password});
      Alert.alert('Successfully Submitted');
      router.replace('../(tabs)/home');
    } catch (error:any) {
      Alert.alert('Error',error.message);
      Sentry.captureException(error);
    }finally{
      setIsSubmitting(false);
    }
  }
  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
      <CustomInput
          placeholder='Enter your Email'
          value={form.email}
          onChangeText={(text)=>{setForm({...form,email:text})}} 
          label="Email"
          keyboardType="email-address"
        />
        <CustomButton/>

        <CustomInput
          placeholder='Enter your password'
          value={form.password}
          onChangeText={(text)=>{setForm({...form,password:text})}} 
          label="password"
          secureTextEntry={true}

        />
        <CustomButton
          title='Sign In' 
          isLoading={isSubmitting}
          onPress={submit}
        />

        <View className='flex justify-center mt-5 flex-row gap-2'>
          <Text className='base-regular text-grey-100'>
            Dont have an account? Sign Up
          </Text>
          <Link href="/SignUp">
            SingUp
          </Link>
        </View>
    </View>
  )
}

export default SignIn;