import { Stack, } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function _layout() {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#f8f9fa"
        }}>
            <StatusBar style='dark' />
            <Stack initialRouteName='index'>
                <Stack.Screen name='index' options={{
                    headerShown: false

                }} />
                <Stack.Screen name='screens/HomeScreen' options={{
                    headerShown: false,
                }} />
                <Stack.Screen name='screens/LoginScreen' options={{
                    headerShown: false,
                }} />
            </Stack>
        </SafeAreaView>
    );
}
