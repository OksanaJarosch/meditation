import { View, Text, ImageBackground, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppGradient from '@/components/AppGradient';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import MEDITATION_IMAGES from '@/constants/meditation-images';
import CustomBtn from '@/components/CustomBtn';

const Meditate = () => {
    const {id} = useLocalSearchParams();
    const meditatingTime = 10;

    const [remainingSec, setRemainingSec] = useState(meditatingTime);
    const [isMeditating, setIsMeditating] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (remainingSec === 0) {
            setIsMeditating(false);
            setRemainingSec(meditatingTime);
            return;
        }

        if (isMeditating) {
            timerId = setTimeout(() => {
                setRemainingSec(remainingSec - 1);
        }, 1000);
        }

        return () => {
            clearTimeout(timerId);
        }
    }, [remainingSec, isMeditating])

    // Time format
    const formattedMinutes = String(Math.floor(remainingSec/60)).padStart(2, "0");
    const formattedSeconds = String(remainingSec%60).padStart(2, "0");


    return (
        <View className='flex-1'>
            <ImageBackground source={MEDITATION_IMAGES[Number(id) - 1]} resizeMode='cover' className='flex-1'>
                <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
                    <Pressable onPress={() => router.back()} className='absolute top-0 left-6 z-10'>
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>

                    <View className='flex-1 justify-center'>
                        <View className='mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center'>
                            <Text className='text-4xl text-blue-800'>
                                {formattedMinutes}:{formattedSeconds}
                            </Text>
                        </View>
                    </View>

                    <View className='mb-5'>
                        <CustomBtn title="Start Meditation" onPress={() => setIsMeditating(true)
                        }></CustomBtn>
                    </View>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default Meditate