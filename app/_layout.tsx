import TimerProvider from '@/context/TimerContext';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

// SplashScreen should wait until fonts are loaded (useEffect)
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded, error] = useFonts({
        "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
    });

    useEffect(() => {
        if (error) {
            throw error;
        }

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }

    }, [fontsLoaded, error])

    if (!fontsLoaded) {
        return null; // Render nothing while fonts are loading
    }

    return (
        <TimerProvider>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="meditate/[id]" options={{headerShown: false}}/>
                <Stack.Screen name="(modal)/adjust-duration" options={{headerShown: false, presentation: "modal"}}/>
            </Stack>
        </TimerProvider>
            )}