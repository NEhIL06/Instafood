import 'react-native-reanimated';
import {View, Text} from 'react-native';
import {useFonts} from 'expo-font';
import { use, useEffect } from 'react';
import "../global.css";
import { error } from 'console';
import { SplashScreen } from 'expo-router';

export default function RootLayout() {
  const [fontsLoaded,error] = useFonts({
    "Quicksand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "Quicksand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
    "Quicksand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "Quicksand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "Quicksand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
  });

  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hide();
  }, [fontsLoaded,error]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>

  );
}
