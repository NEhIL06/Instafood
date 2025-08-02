import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const cart = () => {
  return (

    <SafeAreaView><View>
      <Text style={{textAlign:'center', shadowColor: '#1a1a1a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5, backgroundColor: 'white', color: 'black', fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
    </View></SafeAreaView>
    
  )
}

export default cart