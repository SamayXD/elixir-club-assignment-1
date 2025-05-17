

import * as Location from 'expo-location';
import { Linking } from 'react-native';
import * as TrackingTransparency from 'expo-tracking-transparency';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform } from 'react-native';
import { Alert } from 'react-native';
export function openAppSettings() {

    if (Platform.OS === 'android') {
        // This opens your app's settings page
        IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.SETTINGS);
    } else {
        // iOS fallback
        Linking.openURL('app-settings:');
    }
}


export async function askForLocationPermission() {
    // 1. Handle ATT (App Tracking Transparency) on iOS 14+
    if (Platform.OS === 'ios' && TrackingTransparency && TrackingTransparency.getTrackingPermissionsAsync) {
        const { status: attStatus } = await TrackingTransparency.getTrackingPermissionsAsync();

        if (attStatus === 'not-determined') {
            const { status: newAttStatus } = await TrackingTransparency.requestTrackingPermissionsAsync();
            if (newAttStatus !== 'granted') {
                Alert.alert(
                    'Tracking Permission Denied',
                    'Tracking permission is required for personalized ads and analytics. You can enable it in Settings.'
                );
            }
        }

    }

    // 2. Handle Location Permission

    const { status, canAskAgain } = await Location.getForegroundPermissionsAsync();

    if (status === 'granted') {
        // Already granted
        return 'granted';
    }

    if (canAskAgain) {
        const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
        if (newStatus === 'granted') {
            return 'granted';
        } else {
            Alert.alert('Permission denied', 'Location permission is required for this feature.');
            return 'denied';
        }
    } else {
        Alert.alert(
            'Permission Required',
            'Location permission has been denied and cannot be requested again. Please enable it in the app settings.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: openAppSettings },
            ]
        );
        return 'denied';
    }
}