import {  View,Dimensions, KeyboardAvoidingView, Platform, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import CustomInput from '@/components/customInput';
import CustomButton from '@/components/customButton';
import { Slot } from 'expo-router';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import { images } from '@/constant';

export default function _layout() {
    
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
        <View className="w-full relative" style = {{height : Dimensions.get("screen").height/2.25}}>
          <ImageBackground source={images.loginGraphic} className="size-full rounded-b-lg" resizeMode='stretch'/>
          <Image source = {images.logo} className='self-center size-48 absoulte -bottom-16 z-10'/>
        </View>

        <CustomInput
          placeholder='Enter yout Email'
          value={''}
          onChangeText={(text)=>{}}
          label="Email"
          keyboardType="email-address"
        />
        <CustomButton/>
      </ScrollView>
        <Slot/>
    </KeyboardAvoidingView>
    
  )
}