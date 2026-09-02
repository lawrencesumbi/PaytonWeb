import { Slot, usePathname, useRouter } from 'expo-router';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = width > 900;

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
    backgroundColor: '#0F172A',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    backgroundColor: '#0F172A',
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 32,
  },
  navLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  activeNavLink: {
    color: '#10B981',
    fontWeight: '800',
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  themeToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  themeToggleText: {
    fontSize: 16,
  },
  getStartedButton: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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