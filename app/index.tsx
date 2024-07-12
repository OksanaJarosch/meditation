import { ImageBackground, SafeAreaView, Text, View } from "react-native";
import React from "react";
import {StatusBar} from 'expo-status-bar';

import beachImage from '@/assets/meditation-images/beach.webp';
import CustomBtn from "@/components/CustomBtn";
import { useRouter } from "expo-router";
import AppGradient from "@/components/AppGradient";

export default function App() {
    const router = useRouter();

    return (
        <View className="flex-1">
            <ImageBackground
                source={beachImage}
                resizeMode="cover"
                className="flex-1"
            >
                <AppGradient colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}>
                    <SafeAreaView className="flex-1 px-1 justify-between">
                        <View>
                            <Text className="text-center text-white font-bold text-4xl">
                            Meditation
                        </Text>
                        <Text className="text-center text-white font-regular text-2xl mt-3">
                            Simplifying Meditation for Everyone
                        </Text>
                        </View>

                        <CustomBtn onPress={() => router.push("/nature-meditate")} title="Get started" />
                            
                        <StatusBar style='light'/>
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
            
        </View>
    );
}