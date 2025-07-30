import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { images } from '@/constant'

const CartButton =  () => {
    const totalitems = 10;
  return (
    <TouchableOpacity className='cart-btn' onPress={() => console.log('cart')}>
        <Image source={images.bag} className='size-5' resizeMode='contain' tintColor={"#000000"}/>
        {totalitems>0 && (
            <View className='cart-badge'>
                <Text className='small-bold text-white'>{totalitems}</Text>
            </View>
        )} 
    </TouchableOpacity>
  )
}

export default CartButton