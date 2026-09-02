import { Slot, usePathname, useRouter } from 'expo-router';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.layoutContainer}>
      {/* --- SHARED TOP NAVIGATION BAR --- */}
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.logoContainer} 
          onPress={() => router.push('/')}
        >
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>₱</Text>
          </View>
          <Text style={styles.logoText}>PAYTON</Text>
        </TouchableOpacity>

        {isDesktop && (
          <View style={styles.navLinks}>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={[styles.navLink, pathname === '/' && styles.activeNavLink]}>HOME</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/features')}>
              <Text style={[styles.navLink, pathname === '/features' && styles.activeNavLink]}>FEATURES</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/about')}>
              <Text style={[styles.navLink, pathname === '/about' && styles.activeNavLink]}>ABOUT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/team')}>
              <Text style={[styles.navLink, pathname === '/team' && styles.activeNavLink]}>TEAM</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.navActions}>
          <TouchableOpacity style={styles.themeToggle}>
            <Text style={styles.themeToggleText}>🌙</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={() => router.push('/features')}
          >
            <Text style={styles.getStartedButtonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* --- PAGE CONTENT SLOT --- */}
      <View style={styles.contentContainer}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: '#FAF8FC',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECEF',
    backgroundColor: '#FAF8FC',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoIconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E1B4B',
    letterSpacing: 1,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 30,
  },
  navLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  activeNavLink: {
    color: '#1E1B4B',
    fontWeight: '800',
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  themeToggle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeToggleText: {
    fontSize: 16,
  },
  getStartedButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  contentContainer: {
    flex: 1,
  },
});