import {  View,Dimensions, KeyboardAvoidingView, Platform, ImageBackground, Image } from 'react-native'
import React from 'react'

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

        <Slot/>
      </ScrollView>     
    </KeyboardAvoidingView>
    
  )
}