import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const subtitles = [
  "Experience a smarter way to split costs, manage allowances, and track your finances effortlessly.",
  "Let Payton's AI assistant optimize your monthly budgeting and detect hidden subscription leaks.",
  "Take full control of shared household expenses with real-time tracking and automated splits."
];

export default function LandingPage() {
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const isDesktop = width > 900;

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(50);

  // Shared values for floating animations
  const floatAnim1 = useSharedValue(0);
  const floatAnim2 = useSharedValue(0);

  useEffect(() => {
    // Phone 1 float loop
    floatAnim1.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Phone 2 float loop (out-of-phase for an organic feel)
    floatAnim2.value = withRepeat(
      withSequence(
        withTiming(12, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateY: floatAnim1.value }],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateY: floatAnim2.value }],
  }));

  useEffect(() => {
    const fullText = subtitles[currentSentenceIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        
        // Pause at the end of typing full sentence
        if (displayedText === fullText) {
          setTimeout(() => setIsDeleting(true), 500);
          setTypingSpeed(5);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        
        // Move to next sentence once deleted
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentSentenceIndex((prev) => (prev + 1) % subtitles.length);
          setTypingSpeed(40);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentSentenceIndex, typingSpeed]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* --- HERO SECTION --- */}
        <View style={[styles.heroSection, isDesktop ? styles.heroRow : styles.heroColumn]}>
          
          {/* Left Content */}
          <View style={styles.heroContent}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>AI-ASSISTED FINANCE MANAGEMENT SYSTEM</Text>
            </View>

            <Text style={styles.heroTitle}>
              The Future of <Text style={styles.highlightText}>Personal Finance</Text>, here with <Text style={styles.brandHighlight}>Payton</Text>.
            </Text>

            <Text style={styles.heroSubtitle}>
              {displayedText}
              <Text style={styles.cursor}>|</Text>
            </Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/login')}>
                <Text style={styles.primaryButtonText}>Start Tracking Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/team')}>
                <Text style={styles.secondaryButtonText}>Contact Us</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Right Mockup Display Card with Floating Animations */}
          <View style={[styles.mockupCardWrapper, isDesktop ? styles.mockupCardDesktop : null]}>
            <View style={styles.mockupContainer}>
              <Animated.View style={animatedStyle1}>
                <Image
                  source={require('../assets/images/spender.png')}
                  style={styles.mockupImageLarge}
                  resizeMode="cover"
                />
              </Animated.View>

              {isDesktop && (
                <Animated.View style={animatedStyle2}>
                  <Image
                    source={require('../assets/images/sponsor.png')}
                    style={[styles.mockupImageLarge, styles.phoneMockupOffset]}
                    resizeMode="cover"
                  />
                </Animated.View>
              )}
            </View>
          </View>

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
    paddingHorizontal: 24,
    paddingBottom: 60,
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
  },
  
  // Navbar Styles
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#10B981',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 32,
  },
  navLink: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  navLinkActive: {
    color: '#10B981',
  },
  navCtaButton: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  navCtaText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  // Hero Section Styles
  heroSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroColumn: {
    flexDirection: 'column',
  },
  heroContent: {
    flex: 1,
    maxWidth: 700,
  },
  badgeContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  badgeText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 50,
    fontWeight: '800',
    color: '#F8FAFC',
    lineHeight: 52,
    marginBottom: 20,
  },
  highlightText: {
    color: '#F8FAFC',
  },
  brandHighlight: {
    color: '#10B981',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 26,
    marginBottom: 25,
    minHeight: 10,
  },
  cursor: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryButtonText: {
    color: '#E2E8F0',
    fontSize: 15,
    fontWeight: '600',
  },

  // Mockup Presentation Card
  mockupCardWrapper: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  mockupCardDesktop: {
    width: 'auto',
    marginTop: 0,
  },
  mockupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  mockupImageLarge: {
    width: 230,
    height: 500,
    borderRadius: 28,
    borderWidth: 8,
    borderColor: '#334155',
  },
  phoneMockupOffset: {
    marginLeft: 20,
    borderColor: '#334155',
  },
});