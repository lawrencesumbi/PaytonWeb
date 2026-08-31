import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 960;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.heroSection, { flexDirection: isDesktop ? 'row' : 'column' }]}>
        
        {/* Left Column: Text & CTAs */}
        <View style={styles.leftColumn}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>AI-ASSISTED FINANCE MANAGEMENT</Text>
          </View>

          <Text style={styles.mainTitle}>
            The Future of <Text style={styles.brandHighlight}>Personal Finance,</Text>{'\n'}
            here with <Text style={styles.brandName}>Payton.</Text>
          </Text>

          <Text style={styles.description}>
            Experience a smarter way to split costs and manage your financial future effortlessly.
          </Text>

          <View style={styles.ctaContainer}>
            <Pressable
              style={styles.primaryButton}
              onPress={() => router.push('/get-started')}
            >
              <Text style={styles.primaryButtonText}>Start Tracking Now</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={() => router.push('/about')}
            >
              <Text style={styles.secondaryButtonText}>Contact Us</Text>
            </Pressable>
          </View>
        </View>

        {/* Right Column: Mobile App Mockups Container */}
        <View style={styles.rightColumn}>
          <View style={styles.mockupWrapperCard}>
            
            {/* Phone Mockup 1 (Dashboard) */}
            <View style={styles.phoneMockup}>
              <View style={styles.notch} />
              <View style={styles.phoneScreen}>
                <View style={styles.appHeader}>
                  <Text style={styles.appWelcome}>Hello,</Text>
                  <Text style={styles.appNameUser}>Siyam Ahmed!</Text>
                </View>

                <View style={styles.balanceCard}>
                  <Text style={styles.balanceLabel}>Current Balance</Text>
                  <Text style={styles.balanceValue}>$4,570,80</Text>
                </View>

                <Text style={styles.sectionHeading}>Upcoming payment</Text>
                <View style={styles.paymentCard}>
                  <View style={styles.paymentIconBox}>
                    <Ionicons name="logo-apple" size={16} color="#FFFFFF" />
                  </View>
                  <View>
                    <Text style={styles.paymentTitle}>Adobe Premium</Text>
                    <Text style={styles.paymentSub}>$30/month • 2 days left</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Phone Mockup 2 (Analytics / Activity) */}
            <View style={[styles.phoneMockup, styles.secondPhone]}>
              <View style={styles.notch} />
              <View style={styles.phoneScreen}>
                <View style={styles.appHeaderActivity}>
                  <Text style={styles.activityTitle}>Activity</Text>
                </View>

                <View style={styles.balanceCard}>
                  <Text style={styles.balanceLabel}>Current Balance</Text>
                  <Text style={styles.balanceValue}>$4,570,80</Text>
                </View>

                {/* Simulated Chart Circle */}
                <View style={styles.chartContainer}>
                  <View style={styles.chartCircle}>
                    <Text style={styles.chartSavings}>$2,482</Text>
                    <Text style={styles.chartSavingsLabel}>Your savings</Text>
                  </View>
                </View>
              </View>
            </View>

          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  heroSection: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 40,
  },
  leftColumn: {
    flex: 1,
    maxWidth: 600,
  },
  badgeContainer: {
    backgroundColor: '#ECFDF5', // Light green container tint
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  badgeText: {
    color: '#047857', // Dark green badge text
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  mainTitle: {
    fontSize: 52,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 62,
    marginBottom: 20,
  },
  brandHighlight: {
    color: '#0F172A',
  },
  brandName: {
    color: '#10B981', // Green theme brand color
  },
  description: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 26,
    marginBottom: 36,
    maxWidth: 500,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    color: '#1E293B',
    fontSize: 15,
    fontWeight: '600',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockupWrapperCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    flexDirection: 'row',
    gap: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  phoneMockup: {
    width: 240,
    height: 480,
    backgroundColor: '#0F172A',
    borderRadius: 36,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  secondPhone: {
    marginTop: 20,
  },
  notch: {
    position: 'absolute',
    top: 14,
    left: '50%',
    transform: [{ translateX: -40 }],
    width: 80,
    height: 18,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    zIndex: 10,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 30,
    padding: 16,
    paddingTop: 30,
  },
  appHeader: {
    marginBottom: 12,
  },
  appWelcome: {
    fontSize: 12,
    color: '#64748B',
  },
  appNameUser: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  appHeaderActivity: {
    alignItems: 'center',
    marginBottom: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  balanceLabel: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 2,
  },
  balanceValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 8,
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  paymentIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  paymentSub: {
    fontSize: 9,
    color: '#64748B',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  chartCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 8,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  chartSavings: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  chartSavingsLabel: {
    fontSize: 9,
    color: '#64748B',
  },
});