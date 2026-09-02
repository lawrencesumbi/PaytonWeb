import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = width > 1024;

export default function TeamPage() {
  const teamMembers = [
    {
      id: '1',
      name: 'Lawrence Guian Sumbi',
      role: 'BACKEND DEVELOPER',
      initials: 'LS',
    },
    {
      id: '2',
      name: 'Patricia Ann Mae Obaob',
      role: 'FRONTEND DEVELOPER',
      initials: 'PO',
    },
    {
      id: '3',
      name: 'Kris Jaylon G. Mantillas',
      role: 'PROJECT MANAGER',
      initials: 'KM',
    },
    {
      id: '4',
      name: 'Jaymaica J. Narvasa',
      role: 'ANALYST',
      initials: 'JN',
    },
    {
      id: '5',
      name: 'Dranreb Misa',
      role: 'DOCUMENTOR',
      initials: 'DM',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* --- HEADER SECTION --- */}
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>MEET THE TEAM</Text>
          <Text style={styles.sectionSubtitle}>
            The developers behind the Payton Financial System.
          </Text>
        </View>

        {/* --- TEAM MEMBERS GRID --- */}
        <View style={[styles.gridContainer, isDesktop ? styles.gridRow : styles.gridColumn]}>
          {teamMembers.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>{member.initials}</Text>
                </View>
              </View>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
            </View>
          ))}
        </View>

        {/* --- CONTACT FOOTER BAR --- */}
        <View style={styles.contactBar}>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>✉️</Text>
            <Text style={styles.contactText}>payton.support@gmail.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactText}>+63 975 314 0724</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📍</Text>
            <Text style={styles.contactText}>Cebu, PH</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A', // Synced with _layout.tsx background
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingVertical: 40,
    alignItems: 'center',
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
  },
  
  /* Header Styles */
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 1,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  /* Grid Layout */
  gridContainer: {
    width: '100%',
    gap: 20,
    marginBottom: 50,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  /* Member Card Styles */
  memberCard: {
    backgroundColor: '#1E293B', // Synced card background from _layout.tsx
    borderRadius: 16,
    padding: 24,
    width: isDesktop ? '18%' : '100%',
    minWidth: 200,
    maxWidth: 220,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#0F172A', // Synced inner container tone
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10B981', // Payton green accent
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  memberName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
  },
  memberRole: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981', // Payton green accent for roles
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  /* Contact Footer Bar Styles */
  contactBar: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: '#1E293B', // Synced theme card container
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: isDesktop ? 'row' : 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 15,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contactIcon: {
    fontSize: 16,
  },
  contactText: {
    color: '#94A3B8', // Consistent muted description tone
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});