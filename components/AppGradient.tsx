import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import Content from './Content';

const AppGradient = ({children, colors}: {children: any, colors: string[]}) => {
    return (
        <LinearGradient colors={colors} className='flex-1 px-3 py-20'>
            <Content>{children}</Content>
        </LinearGradient>
    )
}

export default AppGradient