import { View, Text, Pressable, Image, FlatList } from 'react-native';
import React from 'react';
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";

import { Link } from 'expo-router';

interface AffirmationsGalleryProps {
    title: String;
    previews: GalleryPreviewData[];
}


const AffirmationsGallery = ({title, previews}: AffirmationsGalleryProps) => {
    return (
        <View className='my-5'>
            <View className='mb-2'>
                <Text className='text-white font-bold text-xl'>{title}</Text>
            </View>
            <View className='space-y-2 '>
                <FlatList 
                    data={previews}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Link href={`/affirmations/${item.id}`} asChild>
                            <Pressable>
                                <View className='h-36 w-32 rounded-md mr-4'>
                                    <Image 
                                        source={item.image} 
                                        resizeMode='cover' 
                                        className='w-full h-full'
                                    />
                                </View>
                            </Pressable>
                        </Link>
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />
            </View>
        </View>
    )
}

export default AffirmationsGallery