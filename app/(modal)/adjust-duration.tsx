import { View, Text, Pressable } from 'react-native';
import React, { useContext } from 'react';
import AppGradient from '@/components/AppGradient';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import CustomBtn from '@/components/CustomBtn';
import { TimerContext } from '@/context/TimerContext';

const AdjustDuration = () => {
    const {setDuration} = useContext(TimerContext);

    const handlePress = (duration: number) => {
        setDuration(duration);
        router.back();
    }


    return (
        <View className='flex-1 relative'>
            <Pressable onPress={() => router.back()} className='absolute top-8 left-6 z-10'>
                        <AntDesign name="leftcircleo" size={50} color="white" />
            </Pressable>
            <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]} >
                    <View className='justify-center h-4/5 p-6 my-auto'>
                        <Text className='text-center font-bold text-3xl text-white mb-8'>Adjust your meditation duration</Text>
                        <View className='flex-1 justify-around'>
                            <CustomBtn 
                            title="10 seconds" 
                            onPress={() => handlePress(10)}
                            />
                            <CustomBtn 
                            title="1 minute" 
                            onPress={() => handlePress(60)}
                            />
                            <CustomBtn 
                            title="5 minutes" 
                            onPress={() => handlePress(5 * 60)}
                            />
                            <CustomBtn 
                            title="10 minutes" 
                            onPress={() => handlePress(10 * 60)}
                            />
                        </View>
                    </View>
            </AppGradient>
        </View>
    )
}

export default AdjustDuration