import { View, Text ,Button} from 'react-native'
import React from 'react'
import { router } from 'expo-router';
export default function sing_in() {
  return (
    <View>
      <Text>sing_in</Text>
      <Button title="Sign Up" onPress={()=>router.push('/sing_up')}/>
    </View>
  )
}