import { useRouter } from 'expo-router';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = width > 900;

export default function AdminDashboardScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Implement your logout/clear session logic here
    console.log('Logging out admin...');
    router.replace('/(auth)/login' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        

        {/* Dashboard Content Grid */}
        <View style={[styles.statsGrid, isDesktop ? styles.statsGridDesktop : null]}>
          
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Users</Text>
            <Text style={styles.statValue}>1,284</Text>
            <Text style={styles.statTrend}>+12% this month</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active Sessions</Text>
            <Text style={styles.statValue}>342</Text>
            <Text style={styles.statTrend}>Real-time active</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>System Health</Text>
            <Text style={styles.statValue}>99.9%</Text>
            <Text style={[styles.statTrend, { color: '#34D399' }]}>Operational</Text>
          </View>

        </View>

        {/* Quick Actions / Recent Activity Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent System Activity</Text>
          
          <View style={styles.activityCard}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>New user registration: alex@example.com</Text>
              <Text style={styles.activityTime}>2 minutes ago</Text>
            </View>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>Database backup completed successfully</Text>
              <Text style={styles.activityTime}>1 hour ago</Text>
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
    paddingVertical: 32,
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  navBrand: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 0.5,
  },
  brandHighlight: {
    color: '#10B981',
  },
  navSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: '#F87171',
    fontSize: 13,
    fontWeight: '700',
  },
  statsGrid: {
    width: '100%',
    gap: 16,
    marginBottom: 36,
  },
  statsGridDesktop: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  statValue: {
    color: '#F8FAFC',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 6,
  },
  statTrend: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionContainer: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '500',
  },
  activityTime: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
});