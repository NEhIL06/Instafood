import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/type'
import cn from 'clsx';
const CustomButton = ({
    onPress,
    title='click me',
    style,
    textStyle,
    leftIcon,
    isLoading = false
}:CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={cn('custom-btn', style)}>
        {leftIcon}
        <View className='flex-center flew-row'>
            {isLoading?(
                <ActivityIndicator size="small" color="#FE8C00"/>
            ):(<Text className={cn('text-white-100 paragraph-semibold', textStyle)}>{title}</Text>)}
        </View>
      
    </TouchableOpacity>
  )
}

export default CustomButton