import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { width, height, fontSize } from '../../utils/constants/responsiveUtils';
import { font } from '../../utils/constants/constant';

const metrics = [
    { label: 'Steps', value: '7,842', icon: '👣' },
    { label: 'Calories', value: '312 kcal', icon: '🔥' },
    { label: 'Expenses', value: '$1,230', icon: '💸' },
    { label: 'Sleep', value: '6.3 hrs', icon: '🛌' },
];

const HomeScreen = () => {
    const userName = 'Samay';
    const coins = 120;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* Top Bar */}
                <View style={styles.topBar}>
                    <View style={styles.logoBox}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/40' }}
                            style={styles.logo}
                        />
                        <Text style={styles.companyName}>FitFinance</Text>
                    </View>
                    <View style={styles.coinBox}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/138/138292.png' }}
                            style={styles.coinIcon}
                        />
                        <Text style={styles.coinText}>{coins}</Text>
                    </View>
                </View>

                {/* Welcome */}
                <Text style={styles.welcomeText}>Welcome back, {userName} 👋</Text>

                {/* Small Metrics Row */}
                <View style={styles.metricsRow}>
                    {metrics.map((m, i) => (
                        <View key={m.label} style={styles.miniMetricCard}>
                            <Text style={styles.miniMetricIcon}>{m.icon}</Text>
                            <Text style={styles.miniMetricValue}>{m.value}</Text>
                            <Text style={styles.miniMetricLabel}>{m.label}</Text>
                        </View>
                    ))}
                </View>

                {/* All Metrics in One Line (Larger) */}
                <View style={styles.metricsLine}>
                    {metrics.map((m, i) => (
                        <View key={m.label} style={styles.metricLineItem}>
                            <Text style={styles.metricLineIcon}>{m.icon}</Text>
                            <Text style={styles.metricLineValue}>{m.value}</Text>
                            <Text style={styles.metricLineLabel}>{m.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Offers */}
                <Text style={styles.sectionTitle}>Exclusive Health Offers</Text>
                <OfferCard
                    title="20% Off on Protein Packs"
                    desc="For active calorie burners"
                    img="https://via.placeholder.com/120x120"
                />
                <OfferCard
                    title="Free Sleep Tracker Trial"
                    desc="Boost your sleep goals"
                    img="https://via.placeholder.com/120x120"
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const OfferCard = ({ title, desc, img }) => (
    <View style={styles.offerCard}>
        <Image source={{ uri: img }} style={styles.offerImage} />
        <View style={styles.offerTextContainer}>
            <Text style={styles.offerTitle}>{title}</Text>
            <Text style={styles.offerDesc}>{desc}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scroll: {
        padding: width(5),
        paddingBottom: height(4),
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: height(2),
    },
    logoBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: width(8),
        height: width(8),
        borderRadius: width(2),
        marginRight: width(2),
    },
    companyName: {
        fontSize: fontSize(5),
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
    },
    coinBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinIcon: {
        width: width(5),
        height: width(5),
        marginRight: width(1),
    },
    coinText: {
        fontSize: fontSize(4),
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
    },
    welcomeText: {
        fontSize: fontSize(5.5),
        fontFamily: font.MontserratSemiBold,
        color: '#333',
        marginBottom: height(2),
    },
    metricsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: height(2),
    },
    miniMetricCard: {
        backgroundColor: '#fff',
        borderRadius: width(2),
        alignItems: 'center',
        flex: 1,
        marginHorizontal: width(1),
        paddingVertical: height(1.2),
        paddingHorizontal: width(1),
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
    },
    miniMetricIcon: {
        fontSize: fontSize(5),
        marginBottom: height(0.5),
    },
    miniMetricValue: {
        fontSize: fontSize(3.5),
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
        marginBottom: height(0.2),
    },
    miniMetricLabel: {
        fontSize: fontSize(2.5),
        color: '#666',
        fontFamily: font.MontserratRegular,
    },
    metricsLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: width(3),
        paddingVertical: height(1.2),
        paddingHorizontal: width(2),
        marginBottom: height(2),
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
    },
    metricLineItem: {
        alignItems: 'center',
        flex: 1,
    },
    metricLineIcon: {
        fontSize: fontSize(4.5),
        marginBottom: height(0.2),
    },
    metricLineValue: {
        fontSize: fontSize(3.8),
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
    },
    metricLineLabel: {
        fontSize: fontSize(2.5),
        color: '#666',
        fontFamily: font.MontserratRegular,
    },
    sectionTitle: {
        fontSize: fontSize(4.2),
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
        marginVertical: height(1.5),
    },
    offerCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: width(3),
        padding: width(3),
        marginBottom: height(1.5),
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    offerImage: {
        width: width(20),
        height: width(20),
        borderRadius: width(3),
        marginRight: width(4),
    },
    offerTextContainer: {
        flex: 1,
    },
    offerTitle: {
        fontSize: fontSize(3.5),
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
        marginBottom: height(0.5),
    },
    offerDesc: {
        fontSize: fontSize(2.8),
        color: '#444',
        fontFamily: font.MontserratRegular,
    },
});

export default HomeScreen;
