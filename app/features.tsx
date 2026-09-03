import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import {
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from 'react-native-reanimated';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type FeatureItem = {
  id: '1' | '2' | '3' | '4';
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
};

const featuresData: FeatureItem[] = [
  {
    id: '1',
    icon: 'git-compare-outline',
    title: 'Split Expense',
    description: 'Effortlessly divide shared costs and streamline group reimbursements.',
    imageSource: require('../assets/images/split.jpg'),
  },
  {
    id: '2',
    icon: 'trending-up-outline',
    title: 'Budget Allocation',
    description: 'Strategically distribute funds to optimize financial planning goals.',
    imageSource: require('../assets/images/budget.jpg'),
  },
  {
    id: '3',
    icon: 'shield-checkmark-outline',
    title: 'Bill Reminders',
    description: 'Automate payment tracking to prevent late fees consistently.',
    imageSource: require('../assets/images/bill.jpg'),
  },
  {
    id: '4',
    icon: 'scan-outline',
    title: 'AI Receipt Scanner',
    description: 'Extract expense data instantly using advanced optical recognition.',
    imageSource: require('../assets/images/scan.jpg'),
  },
];

const AnimatedFeatureCard = ({ 
  item, 
  index, 
  isDesktop 
}: { 
  item: FeatureItem; 
  index: number; 
  isDesktop: boolean; 
}) => {
  const pressed = useSharedValue(0);
  const entranceAnim = useSharedValue(0); 

  useEffect(() => {
    entranceAnim.value = withDelay(
      index * 150,
      withTiming(1, { duration: 600 })
    );
  }, [index, entranceAnim]);

  const entranceAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: entranceAnim.value,
      transform: [
        {
          translateY: interpolate(entranceAnim.value, [0, 1], [50, 0]),
        },
      ],
    };
  });

  const interactionAnimatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(pressed.value ? 0.97 : 1, {
      mass: 0.5,
      damping: 10,
    });
    
    const borderColor = pressed.value 
      ? 'rgba(16, 185, 129, 0.8)' 
      : 'rgba(51, 65, 85, 1)';

    return {
      transform: [{ scale }],
      borderColor: borderColor,
      shadowOpacity: interpolate(pressed.value, [0, 1], [0.2, 0.4]),
      shadowRadius: interpolate(pressed.value, [0, 1], [8, 12]),
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
     const imageScale = withSpring(pressed.value ? 1.1 : 1);
     return {
       transform: [{ scale: imageScale }]
     };
  });

  return (
    <Animated.View style={[{ width: isDesktop ? '23%' : '100%' }, entranceAnimatedStyle]}>
      <TouchableWithoutFeedback
        onPressIn={() => { pressed.value = 1; }}
        onPressOut={() => { pressed.value = 0; }}
      >
        <Animated.View
          style={[
            styles.featureCard, 
            interactionAnimatedStyle
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={22} color="#10B981" />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>

          <View style={styles.previewBox}>
            <Animated.Image
              source={item.imageSource}
              style={[styles.previewImage, imageAnimatedStyle]}
              resizeMode="cover"
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default function FeaturesPage() {
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Powerful Features</Text>
          <Text style={styles.sectionSubtitle}>
            Intelligent tools to simplify your financial life.
          </Text>
        </View>

        <View style={[styles.gridContainer, isDesktop ? styles.gridRow : styles.gridColumn]}>
          {featuresData.map((item, index) => (
            <AnimatedFeatureCard 
              key={item.id} 
              item={item} 
              index={index} 
              isDesktop={isDesktop}
            />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingVertical: 40,
    alignItems: 'center',
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 1,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  gridContainer: {
    width: '100%',
    gap: 24,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  featureCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    minWidth: 260,
    maxWidth: 300,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    marginBottom: 20,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(10, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(10, 185, 129, 0.3)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
  },
  previewBox: {
    height: 140,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});