import { SplashScreen, Stack } from "expo-router";
import * as Sentry from '@sentry/react-native';
import { useFonts } from "expo-font";
import { useEffect } from "react";
import './global.css';
import useAuthStore from "@/store/auth.store";




Sentry.init({
  dsn: 'https://2aadeabe8c6850d6509c7c686b4c75a0@o4509705428729856.ingest.de.sentry.io/4509761180794960',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {

  const {isLoading, fetchAuthenticatedUser} = useAuthStore(); // State Management
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);


  useEffect(() => {
    fetchAuthenticatedUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if(isLoading || !fontsLoaded) return null;
  return <Stack screenOptions={{ headerShown: false }} />;
});

Sentry.showFeedbackWidget();