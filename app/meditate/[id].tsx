import { View, Text, ImageBackground, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AppGradient from '@/components/AppGradient';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import MEDITATION_IMAGES from '@/constants/meditation-images';
import CustomBtn from '@/components/CustomBtn';
import { Audio } from 'expo-av';
import { MEDITATION_DATA, AUDIO_FILES} from '@/constants/MeditationData';
import { TimerContext } from '@/context/TimerContext';

const Meditate = () => {
    const {id} = useLocalSearchParams();
    const {duration: remainingSec, setDuration} = useContext(TimerContext);
    const defaultMeditatingTime = 10;

    const [isMeditating, setIsMeditating] = useState(false);
    const [audioSound, setAudioSound] = useState<Audio.Sound>();
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (remainingSec === 0) {
            setIsMeditating(false);
            toggleSound();
            return;
        }

        if (isMeditating) {
            timerId = setTimeout(() => {
                setDuration(remainingSec - 1);
        }, 1000);
        }

        return () => {
            clearTimeout(timerId);
        }
    }, [remainingSec, isMeditating])

    // Turn off audio when closing
    useEffect(() => {
        return () => {
            setDuration(defaultMeditatingTime);
            audioSound?.unloadAsync();
        }
    }, [audioSound])
    

    // Time format
    const formattedMinutes = String(Math.floor(remainingSec/60)).padStart(2, "0");
    const formattedSeconds = String(remainingSec%60).padStart(2, "0");

    // audio
    const initializeSound = async () => {
        const audioName = MEDITATION_DATA[Number(id) - 1].audio;

        const {sound} = await Audio.Sound.createAsync(AUDIO_FILES[audioName]);
        setAudioSound(sound);
        return sound;
    }

    const toggleSound = async () => {
        const sound = audioSound ? audioSound : await initializeSound();
        const status = await sound?.getStatusAsync();

        if (status?.isLoaded && !isPlayingAudio) {
            await sound.playAsync();
            setIsPlayingAudio(true);
        } else {
            await sound.pauseAsync();
            setIsPlayingAudio(false);
        }
    }

    // handle start/stop meditation
    const toggleMeditation = async () => {
        if (remainingSec === 0) {
            setDuration(defaultMeditatingTime);
        }

        setIsMeditating(!isMeditating);
        await toggleSound();
    }

    // adjust meditation duration
    const handleDuration = async () => {
        if (isMeditating) {
            setIsMeditating(false);
            await toggleSound();
        }
        router.push("/(modal)/adjust-duration");
    }


    return (
        <View className='flex-1'>
            <ImageBackground source={MEDITATION_IMAGES[Number(id) - 1]} resizeMode='cover' className='flex-1'>
                <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
                    <Pressable onPress={() => router.back()} className='absolute top-0 left-6 z-10'>
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>

                    <View className='flex-1 justify-center'>
                        <View className='mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center'>
                            <Text className='text-4xl text-blue-800 font-rmono'>
                                {formattedMinutes}:{formattedSeconds}
                            </Text>
                        </View>
                    </View>

                    <View className='mb-5'>
                        <CustomBtn title={isMeditating ? "Stop" : "Start Meditation"} onPress={toggleMeditation} />
                        <CustomBtn title="Adjust duration" onPress={handleDuration} containerStyles='mt-4' />
                    </View>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default Meditate