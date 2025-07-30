import { View, Text ,Button} from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const sing_up = () => {
  return (
    <View>
      <Text>sing_up</Text>
      <Button title="Sign In" onPress={()=>router.push('/sing_in')}/>
    </View>
  )
}

export default sing_up