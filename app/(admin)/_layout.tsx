// app/(admin)/_layout.tsx
import { Redirect, Slot, usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';

const { width } = Dimensions.get('window');
const isDesktop = width > 900;

export default function AdminLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/(auth)/login' as any);
  };

  // Kompleto nga navigation base sa imong Supabase tables
  const navItems = [
    { name: 'Dashboard', path: '/(admin)/dashboard' },
    { name: 'Allowances', path: '/(admin)/allowances' },
    { name: 'Budgets', path: '/(admin)/budgets' },
    { name: 'Categories', path: '/(admin)/categories' },
    { name: 'Expenses', path: '/(admin)/expenses' },
    { name: 'Friends', path: '/(admin)/friends' },
    { name: 'Income', path: '/(admin)/income' },
    { name: 'Profiles', path: '/(admin)/profiles' },
    { name: 'Reminders', path: '/(admin)/reminders' },
    { name: 'Split Expenses', path: '/(admin)/split_expenses' },
    { name: 'Split Friends', path: '/(admin)/split_friends' },
    { name: 'Sponsor Spenders', path: '/(admin)/sponsor_spenders' },
  ];

  return (
    <View style={styles.container}>
      {/* Sidebar Navigation at the Left Side */}
      <View style={styles.sidebar}>
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarBrand}>PAYTON <Text style={styles.brandHighlight}>ADMIN</Text></Text>
        </View>

        <ScrollView style={styles.sidebarNavLinks} showsVerticalScrollIndicator={false}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <TouchableOpacity
                key={item.path}
                style={[styles.navItem, isActive && styles.navItemActive]}
                onPress={() => router.push(item.path as any)}
              >
                <Text style={[styles.navItemText, isActive && styles.navItemTextActive]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.sidebarFooter}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Dynamic Content Area */}
      <View style={styles.contentArea}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
    flexDirection: isDesktop ? 'row' : 'column',
    backgroundColor: '#0F172A',
  },
  sidebar: {
    width: isDesktop ? 210 : '100%',
    backgroundColor: '#1E293B',
    borderRightWidth: isDesktop ? 1 : 0,
    borderBottomWidth: isDesktop ? 0 : 1,
    borderBottomColor: '#334155',
    borderRightColor: '#334155',
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  sidebarHeader: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  sidebarBrand: {
    fontSize: 18,
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: 0.5,
  },
  brandHighlight: {
    color: '#10B981',
  },
  sidebarNavLinks: {
    flex: 1,
  },
  navItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 4,
  },
  navItemActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  navItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
  navItemTextActive: {
    color: '#34D399',
    fontWeight: '700',
  },
  sidebarFooter: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  logoutButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#F87171',
    fontSize: 13,
    fontWeight: '700',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
});