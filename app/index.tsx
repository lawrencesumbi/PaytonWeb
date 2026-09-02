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

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export default function LandingPage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* --- HERO SECTION --- */}
        <View style={[styles.heroSection, isDesktop ? styles.heroRow : styles.heroColumn]}>
          
          {/* Left Content */}
          <View style={styles.heroContent}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>AI-ASSISTED FINANCE MANAGEMENT</Text>
            </View>

            <Text style={styles.heroTitle}>
              The Future of <Text style={styles.highlightText}>Personal Finance</Text>, here with <Text style={styles.brandHighlight}>Payton</Text>.
            </Text>

            <Text style={styles.heroSubtitle}>
              Experience a smarter way to split costs and manage your financial future effortlessly.
            </Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Start Tracking Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Contact Us</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Right Mockup Display with Actual Images */}
          <View style={styles.mockupContainer}>
            <Image
              source={require('../assets/images/spender.png')}
              style={styles.mockupImageLarge}
              resizeMode="cover"
            />

            {isDesktop && (
              <Image
                source={require('../assets/images/sponsor.png')}
                style={[styles.mockupImageLarge, styles.phoneMockupOffset]}
                resizeMode="cover"
              />
            )}
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8FC',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heroSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroColumn: {
    flexDirection: 'column',
  },
  heroContent: {
    flex: 1,
    maxWidth: 600,
  },
  badgeContainer: {
    backgroundColor: '#F3E8FF',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 44,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 54,
    marginBottom: 20,
  },
  highlightText: {
    color: '#111827',
  },
  brandHighlight: {
    color: '#7C3AED',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 30,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },
  mockupContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  mockupImageLarge: {
    width: 240,
    height: 480,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#1E1B4B',
  },
  phoneMockupOffset: {
    marginLeft: -40,
    marginTop: 30,
    borderColor: '#E2E8F0',
  },
});