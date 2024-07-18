import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomBtnProps {
    onPress: () => void;
    title: string;
    textStyles?: string;
    disabled?: boolean;
    containerStyles?: string;
}


const CustomBtn = ({onPress, title, textStyles = "", disabled = false, containerStyles = ""}: CustomBtnProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`bg-white rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
            onPress={onPress}
            disabled={disabled}
        >
        <Text className={`font-semibold text-lg ${textStyles}`}>
            {title}
        </Text>
        </TouchableOpacity>
    )
}

export default CustomBtn