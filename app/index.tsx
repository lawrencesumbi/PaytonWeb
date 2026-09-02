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
const isDesktop = width > 900;

export default function LandingPage() {
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
              Experience a smarter way to split costs, manage allowances, and track your financial future effortlessly.
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

          {/* Right Mockup Display Card */}
          <View style={[styles.mockupCardWrapper, isDesktop ? styles.mockupCardDesktop : null]}>
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

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A', // Deep modern dark slate background
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
    marginBottom: 32,
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
    backgroundColor: '#1E293B',
    padding: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  mockupImageLarge: {
    width: 230,
    height: 500,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#0F172A',
  },
  phoneMockupOffset: {
    marginLeft: -20,
    borderColor: '#334155',
  },
});