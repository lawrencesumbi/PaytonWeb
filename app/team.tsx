import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from 'react-native';

export default function TeamPage() {
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024;

  const teamMembers = [
    {
      id: '1',
      name: 'Lawrence Guian Sumbi',
      role: 'BACKEND DEV',
      image: require('../assets/images/sumbi.jpg'), // Update filename as needed
    },
    {
      id: '2',
      name: 'Patricia Mae Obaob',
      role: 'FRONT & BACKEND DEV',
      image: require('../assets/images/obaob.jpg'),
    },
    {
      id: '3',
      name: 'Kris Jaylon Mantillas',
      role: 'PROJECT MANAGER',
      image: require('../assets/images/mantillas.jpg'),
    },
    {
      id: '4',
      name: 'Jaymaica Narvasa',
      role: 'FRONTEND DEV',
      image: require('../assets/images/narvasa.jpg'),
    },
    {
      id: '5',
      name: 'Dranreb Misa',
      role: 'DOCUMENTOR',
      image: require('../assets/images/misa.jpg'),
    },
    {
      id: '6',
      name: 'MJ Verioso',
      role: 'ANALYST',
      image: require('../assets/images/verioso.jpg'),
    },
    {
      id: '7',
      name: 'Mark Kiven Paquit',
      role: 'ANALYST',
      image: require('../assets/images/paquit.jpg'),
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
            <View 
              key={member.id} 
              style={[
                styles.memberCard, 
                { width: isDesktop ? '18%' : '100%' }
              ]}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatarPlaceholder}>
                  <Image source={member.image} style={styles.avatarImage} />
                </View>
              </View>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
            </View>
          ))}
        </View>

        {/* --- CONTACT FOOTER BAR --- */}
        <View style={[styles.contactBar, { flexDirection: isDesktop ? 'row' : 'column' }]}>
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
            <Text style={styles.contactText}>Minglanilla, Cebu, PH</Text>
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
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
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
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10B981',
    overflow: 'hidden', // Ensures the image respects the circular border radius
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    color: '#10B981',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  /* Contact Footer Bar Styles */
  contactBar: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 30,
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
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});