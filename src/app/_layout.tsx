import { Ionicons } from '@expo/vector-icons';
import { Slot, usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const navItems = [
    { label: 'HOME', route: '/' },
    { label: 'FEATURES', route: '/features' },
    { label: 'ABOUT', route: '/about' },
    { label: 'TEAM', route: '/team' },
  ];

  return (
    <View style={styles.container}>
      {/* Top Header / Navigation Bar */}
      <View style={styles.header}>
        <Pressable style={styles.logoContainer} onPress={() => router.push('/')}>
          <View style={styles.logoIcon}>
            <Ionicons name="trending-up" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.logoText}>PAYTON</Text>
        </Pressable>

        {isDesktop && (
          <View style={styles.navLinks}>
            {navItems.map((item) => {
              const isActive = pathname === item.route;
              return (
                <Pressable
                  key={item.label}
                  onPress={() => router.push(item.route as any)}
                  style={styles.navItem}
                >
                  <Text style={[styles.navText, isActive && styles.navTextActive]}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        <View style={styles.headerActions}>
          <Pressable style={styles.iconButton} aria-label="Toggle Theme">
            <Ionicons name="moon-outline" size={18} color="#1E293B" />
          </Pressable>
          <Pressable
            style={styles.getStartedButton}
            onPress={() => router.push('/get-started')}
          >
            <Text style={styles.getStartedText}>GET STARTED</Text>
          </Pressable>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
    backgroundColor: '#10B981', // Emerald Green theme
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  navItem: {
    paddingVertical: 8,
  },
  navText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  navTextActive: {
    color: '#10B981',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
});