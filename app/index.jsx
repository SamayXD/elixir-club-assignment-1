import { Alert, Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { fontSize, height, heightSize, margins, padding, paddings, width, widthSize } from '../utils/constants/responsiveUtils';
import { font } from '../utils/constants/constant';
import { askForLocationPermission } from '../utils/api/locationService';








const index = () => {
    const [isGranted, setIsGranted] = useState(false);

    // FONTS
    const [fontsLoaded] = useFonts({
        MontserratBlack: require("../utils/fonts/Montserrat-Black.ttf"),
        MontserratRegular: require("../utils/fonts/Montserrat-Regular.ttf"),
        MontserratMedium: require("../utils/fonts/Montserrat-Medium.ttf"),
        MontserratSemiBold: require("../utils/fonts/Montserrat-SemiBold.ttf"),
        MontserratLight: require("../utils/fonts/Montserrat-Light.ttf"),
        MontserratThin: require("../utils/fonts/Montserrat-Thin.ttf"),
        MontserratExtraBold: require("../utils/fonts/Montserrat-ExtraBold.ttf"),
    });


    return (
        <View
            style={
                {
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    backgroundColor: "#f8f9fa"
                }
            }
        >
            <Image source={require('../assets/elixir-onboard-1.png')}
                resizeMode='stretch'
                style={{
                    height: height(85),
                    width: width(100),
                    position: 'absolute',
                    opacity: .7
                }}
            />
            <Image source={require('../assets/elixir-logo.png')}
                resizeMode='fill'
                style={{
                    height: height(11),
                    width: width(25),
                    borderRadius: 20
                    // position: 'absolute',
                    // opacity: .7
                }}
            />
            <Text
                style={{
                    color: "#00a86b",
                    fontSize: fontSize(6),
                    fontFamily: font.MontserratSemiBold,
                    marginTop: height(1),
                    width: width(30),
                    textAlign: "center"
                }}
            >
                Elixir
            </Text>



            <View
                style={{
                    position: 'absolute',
                    bottom: 30,
                    justifyContent: 'center',
                    alignItems: 'center',

                }}

            >
                <Text
                    style={{
                        fontFamily: font.MontserratLight,
                        fontSize: fontSize(3),
                        paddingBottom: 10
                    }}
                >
                    Fonts Loaded : {fontsLoaded ? "True" : "False"}
                </Text>


                <TouchableOpacity
                    style={{
                        backgroundColor: isGranted ? "#00c880" : "white",
                        borderColor: "#00a86b",
                        borderWidth: 1,
                        borderRadius: 40,
                        height: height(7),
                        width: width(80),
                        marginBottom: height(1)
                    }}

                    onPress={async () => {
                        if (isGranted) {
                            router.navigate("screens/LoginScreen")
                            // router.navigate("screens/HomeScreen")
                        }
                        else {
                            try {
                                const result = await askForLocationPermission();
                                console.log(result);
                                setIsGranted(result == 'granted');
                                if (result === 'granted') {
                                    Alert.alert("Permission granted", "Location permission has been granted.");
                                }
                            } catch (error) {
                                console.error("Error requesting location permission:", error);
                                setIsGranted("error");
                                Alert.alert("Error", "There was an error requesting location permission.");
                            }
                        }


                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: "center"
                        }}
                    >
                        <Text
                            style={{
                                color: isGranted ? "white" : "#00a86b",
                                fontSize: fontSize(4),
                                fontFamily: font.MontserratMedium,
                                width: "100%",
                                textAlign: 'center'

                            }}
                        >
                            {
                                isGranted ? "Proceed" : "Grant Permission"
                            }
                        </Text>

                    </View>
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: font.MontserratLight,
                        fontSize: fontSize(4),
                        textAlign: "center",
                        flexWrap: "wrap",
                        width: width(70),
                        marginBottom: height(5)
                    }}
                >
                    We Need Location Permission to Proceed.
                </Text>
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({})
