import { View, Text, ImageBackground, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory';
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery';
import AppGradient from '@/components/AppGradient';
import { AntDesign } from '@expo/vector-icons';


const AffirmationPractice = () => {
    const {itemId} = useLocalSearchParams();
    const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
    const [sentences, setSentences] = useState<String[]>();

    useEffect( () => {
        // find right affirmation by Id
        for (let index = 0; index < AFFIRMATION_GALLERY.length; index++) {
            const affirmationsData = AFFIRMATION_GALLERY[index].data;
            
            const affirmationToStart = affirmationsData.find( af => af.id === Number(itemId));

            if (affirmationToStart) {
                setAffirmation(affirmationToStart);

                // split the sentences and delede empty string at the end
                const sentencesArray = affirmationToStart.text.split(".");
                sentencesArray.pop();

                setSentences(sentencesArray);
                return; 
            }
        };      
    }, [])


    return (
        <View className='flex-1'>
            <ImageBackground source={affirmation?.image} resizeMode='cover'
            className='flex-1'>
                <AppGradient colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.9)"]}>
                    <Pressable onPress={() => router.back()} className='absolute top-0 left-6'>
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>
                    <ScrollView className='mt-20' showsVerticalScrollIndicator={false}>
                        <View className='h-full justify-center'>
                            <View className='h-4/5 justify-center'>
                                {sentences?.map( (sentence, index) => (
                                    <Text key={index} className='text-white text-3xl mb-12 font-bold text-center'>
                                        {sentence}.
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default AffirmationPractice