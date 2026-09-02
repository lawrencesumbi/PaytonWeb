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
            <Text style={styles.contactText}>payton@gmail.com</Text>
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
    backgroundColor: '#FAF8FC', // Clean light background consistent with other pages
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },
  
  /* Header Styles */
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
  },

  /* Grid Layout */
  gridContainer: {
    width: '100%',
    maxWidth: 1200,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: isDesktop ? '18%' : '100%',
    minWidth: 200,
    maxWidth: 220,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1E1B4B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#7C3AED',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  memberName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },
  memberRole: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C3AED',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  /* Contact Footer Bar Styles */
  contactBar: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: '#7C3AED',
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: isDesktop ? 'row' : 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 15,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
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
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});