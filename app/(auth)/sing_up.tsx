import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react';
import { Link, router } from 'expo-router';
import CustomInput from '@/components/customInput';
import CustomButton from '@/components/customButton';

export default function Sing_up() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form,setForm] = useState({
    name:'',
    email:'',
    password:'',});
  const submit = async () => {
    if(!form.email || !form.password || !form.name) return Alert.alert('Please fill all fields');
    setIsSubmitting(true);
    try {
      Alert.alert('Successfully Submitted');
      router.replace('/'); 
    } catch (error:any) {
      Alert.alert('Error',error.message);
    }finally{
      setIsSubmitting(false);
    }
  }
  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
      <CustomInput
          placeholder='Enter your Name'
          value={form.name}
          onChangeText={(text)=>{setForm({...form,name:text})}} 
          label="name"
          keyboardType='default'
        />
        <CustomButton/>

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
          title='Sign Up' 
          isLoading={isSubmitting}
          onPress={submit}
        />

        <View className='flex justify-center mt-5 flex-row gap-2'>
          <Text className='base-regular text-grey-100'>
            Already have an account? Sign In
          </Text>
          <Link href="/sing_in">
            SingUp
          </Link>
        </View>
    </View>
  )
}