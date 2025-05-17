import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { font } from '../../utils/constants/constant';
import { fontSize } from '../../utils/constants/responsiveUtils';

const HomeScreen = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text
                style={{
                    fontSize: fontSize(6),
                    fontFamily: font.MontserratMedium
                }}
            >this is nsdfew home</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})