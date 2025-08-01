import {View, KeyboardAvoidingView, Platform, ScrollView, Dimensions, ImageBackground, Image} from 'react-native'
import { Redirect, Slot} from "expo-router";
import {images} from "@/constant";
import useAuthStore from '@/store/auth.store';
import * as Sentry from '@sentry/react-native';

export default function AuthLayout() {
    const { isAuthenticated } = useAuthStore();
    try {
        if(!isAuthenticated) return <Redirect href="/(tabs)" />;    
    } catch (error) {
        console.log("AuthLayout", error);
        Sentry.captureException(error);
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <View className="w-full relative" style={{ height: Dimensions.get('screen').height / 2.25}}>
                    <ImageBackground source={images.loginGraphic} className="size-full rounded-b-lg" resizeMode="stretch" />
                    <Image source={images.logo} className="self-center size-48 absolute -bottom-16 z-10" />
                </View>
                <Slot />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}