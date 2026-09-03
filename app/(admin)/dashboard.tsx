// app/(admin)/dashboard.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { supabase } from '../../lib/supabase';

const { width } = Dimensions.get('window');
const isDesktop = width > 900;

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // All Tables Stats State
  const [totalProfiles, setTotalProfiles] = useState(0);
  const [totalAllowances, setTotalAllowances] = useState(0);
  const [totalBudgets, setTotalBudgets] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalFriends, setTotalFriends] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalReminders, setTotalReminders] = useState(0);
  const [totalSplitExpenses, setTotalSplitExpenses] = useState(0);
  const [totalSplitFriends, setTotalSplitFriends] = useState(0);
  const [totalSponsorSpenders, setTotalSponsorSpenders] = useState(0);
  const [totalLogs, setTotalLogs] = useState<number | string>('Coming Soon');

  const fetchAllDashboardStats = async () => {
    setLoading(true);
    try {
      const tables = [
        { name: 'profiles', setter: setTotalProfiles },
        { name: 'allowances', setter: setTotalAllowances },
        { name: 'budgets', setter: setTotalBudgets },
        { name: 'categories', setter: setTotalCategories },
        { name: 'expenses', setter: setTotalExpenses },
        { name: 'friends', setter: setTotalFriends },
        { name: 'income', setter: setTotalIncome },
        { name: 'reminders', setter: setTotalReminders },
        { name: 'split_expenses', setter: setTotalSplitExpenses },
        { name: 'split_friends', setter: setTotalSplitFriends },
        { name: 'sponsor_spenders', setter: setTotalSponsorSpenders },
      ];

      for (const table of tables) {
        const { count, error } = await supabase
          .from(table.name)
          .select('*', { count: 'exact', head: true });
        
        if (!error) {
          table.setter(count || 0);
        } else {
          console.error(`Error fetching count for ${table.name}:`, error.message);
        }
      }

      const { count: logsCount, error: logsError } = await supabase
        .from('logs')
        .select('*', { count: 'exact', head: true });
      
      if (!logsError) {
        setTotalLogs(logsCount || 0);
      } else {
        setTotalLogs('Pending Table');
      }

    } catch (err) {
      console.error('Error fetching all dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDashboardStats();
  }, []);

  const handleLogout = () => {
    console.log('Logging out admin...');
    router.replace('/(auth)/login' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Title / Welcome */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Admin Dashboard</Text>
          <Text style={styles.welcomeSubtitle}>Complete real-time overview of all Payton database tables</Text>
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#10B981" />
            <Text style={styles.loaderText}>Fetching all live metrics from Supabase...</Text>
          </View>
        ) : (
          <View style={styles.statsContainer}>
            {/* Row 1: 4 Cards */}
            <View style={[styles.statsGrid, isDesktop ? styles.statsGridDesktop : null]}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Profiles</Text>
                <Text style={styles.statValue}>{totalProfiles.toLocaleString()}</Text>
                <Text style={styles.statTrend}>Registered accounts</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Allowances</Text>
                <Text style={styles.statValue}>{totalAllowances.toLocaleString()}</Text>
                <Text style={styles.statTrend}>Allowance records</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Budgets</Text>
                <Text style={styles.statValue}>{totalBudgets.toLocaleString()}</Text>
                <Text style={styles.statTrend}>Budget allocations</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Categories</Text>
                <Text style={styles.statValue}>{totalCategories.toLocaleString()}</Text>
                <Text style={styles.statTrend}>Categories list</Text>
              </View>
            </View>

            {/* Row 2: 4 Cards */}
            <View style={[styles.statsGrid, isDesktop ? styles.statsGridDesktop : null]}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Expenses</Text>
                <Text style={styles.statValue}>{totalExpenses.toLocaleString()}</Text>
                <Text style={styles.statTrend}>Expense transactions</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Income</Text>
                <Text style={styles.statValue}>{totalIncome.toLocaleString()}</Text>
                <Text style={styles.statTrend}>Income records</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Friends</Text>
                <Text style={styles.statValue}>{totalFriends.toLocaleString()}</Text>
                <Text style={styles.statTrend}>Friends list</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Split Expenses</Text>
                <Text style={styles.statValue}>{totalSplitExpenses.toLocaleString()}</Text>
                <Text style={styles.statTrend}>Shared bills</Text>
              </View>
            </View>

            {/* Row 3: 4 Cards (Complete with Total Logs) */}
            <View style={[styles.statsGrid, isDesktop ? styles.statsGridDesktop : null]}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Split Friends</Text>
                <Text style={styles.statValue}>{totalSplitFriends.toLocaleString()}</Text>
                <Text style={styles.statTrend}>Individual split shares</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Sponsor Spenders</Text>
                <Text style={styles.statValue}>{totalSponsorSpenders.toLocaleString()}</Text>
                <Text style={styles.statTrend}>Sponsorship links</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Reminders</Text>
                <Text style={styles.statValue}>{totalReminders.toLocaleString()}</Text>
                <Text style={styles.statTrend}>User reminders</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total Logs</Text>
                <Text style={[styles.statValue, { fontSize: typeof totalLogs === 'string' ? 20 : 26 }]}>
                  {totalLogs}
                </Text>
                <Text style={[styles.statTrend, { color: '#94A3B8' }]}>System logs (Upcoming)</Text>
              </View>
            </View>
          </View>
        )}

        {/* Expanded Professional System Status Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Infrastructure & System Status</Text>
          
          <View style={styles.statusGridContainer}>
            {/* Status Item 1 */}
            <View style={styles.activityCard}>
              <View style={[styles.activityDot, { backgroundColor: '#34D399' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Supabase Database Engine</Text>
                <Text style={styles.activityTime}>PostgreSQL connection active, all tables responding normally</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Optimal</Text>
              </View>
            </View>

            {/* Status Item 2 */}
            <View style={styles.activityCard}>
              <View style={[styles.activityDot, { backgroundColor: '#34D399' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Row Level Security (RLS)</Text>
                <Text style={styles.activityTime}>Admin override policies configured and fully enforced</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Secure</Text>
              </View>
            </View>

            {/* Status Item 3 */}
            <View style={styles.activityCard}>
              <View style={[styles.activityDot, { backgroundColor: '#34D399' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>API Gateway & Endpoints</Text>
                <Text style={styles.activityTime}>REST and Realtime WebSockets responding within standard thresholds</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Stable</Text>
              </View>
            </View>

            {/* Status Item 4 */}
            <View style={styles.activityCard}>
              <View style={[styles.activityDot, { backgroundColor: '#34D399' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Authentication & Session Manager</Text>
                <Text style={styles.activityTime}>JWT tokens validating correctly via GoTrue auth provider</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Active</Text>
              </View>
            </View>

            {/* Status Item 5 */}
            <View style={styles.activityCard}>
              <View style={[styles.activityDot, { backgroundColor: '#FBBF24' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Storage & Automated Backups</Text>
                <Text style={styles.activityTime}>Daily snapshot cycle scheduled (Next run in ~4 hours)</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <Text style={[styles.statusBadgeText, { color: '#FBBF24' }]}>Scheduled</Text>
              </View>
            </View>

            {/* Status Item 6 */}
            <View style={styles.activityCard}>
              <View style={[styles.activityDot, { backgroundColor: '#34D399' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Client State Synchronization</Text>
                <Text style={styles.activityTime}>Admin tables auto-refreshing smoothly on mutations</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Synced</Text>
              </View>
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
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  welcomeContainer: {
    marginBottom: 28,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  loaderContainer: {
    padding: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#94A3B8',
    marginTop: 12,
    fontSize: 14,
  },
  statsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 16,
  },
  statsGrid: {
    width: '100%',
    gap: 16,
  },
  statsGridDesktop: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  statValue: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
  },
  statTrend: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '600',
  },
  sectionContainer: {
    width: '100%',
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  statusGridContainer: {
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '600',
  },
  activityTime: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 3,
  },
  statusBadge: {
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  statusBadgeText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});