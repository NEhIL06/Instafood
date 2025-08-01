import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { images } from '@/constant'

const CartButton =  () => {
    const totalitems = 10;
  return (
    <TouchableOpacity className='flex items-center justify-center size-10 rounded-full bg-dark-100' onPress={() => console.log('cart')}>
        <Image source={images.bag} className='size-5' resizeMode='contain' tintColor={"#000000"}/>
        {totalitems>0 && (
            <View className='absolute -top-2 -right-1 flex items-center justify-center size-5 bg-primary rounded-full'>
                <Text className='small-bold text-white'>{totalitems}</Text>
            </View>
        )} 
    </TouchableOpacity>
  )
}

export default CartButton