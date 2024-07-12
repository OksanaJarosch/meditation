import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomBtnProps {
    onPress: () => void;
    title: string;
    textStyles?: string;
    containerStyles?: string;
}


const CustomBtn = ({onPress, title, textStyles = "", containerStyles = ""}: CustomBtnProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`bg-white rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
            onPress={onPress}
        >
        <Text className={`font-semibold text-lg ${textStyles}`}>
            CustomBtn
        </Text>
        </TouchableOpacity>
    )
}

export default CustomBtn