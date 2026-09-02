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

export default function AboutPage() {
  const aboutCards = [
    {
      id: '1',
      icon: '</>',
      title: 'Backend',
      description: 'PHP & SQL for secure data handling.',
      theme: 'green',
    },
    {
      id: '2',
      icon: '🏛️',
      title: 'Frontend',
      description: 'Modern HTML, CSS, Tailwind & JS.',
      theme: 'dark',
    },
    {
      id: '3',
      icon: '📈',
      title: 'Tracker',
      description: 'Monitor transactions effortlessly.',
      theme: 'dark',
    },
    {
      id: '4',
      icon: '👥',
      title: 'Integration',
      description: 'Splitwise-inspired bill sharing.',
      theme: 'green',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={[styles.contentLayout, isDesktop ? styles.rowLayout : styles.columnLayout]}>
          
          {/* --- LEFT SIDE CARDS GRID --- */}
          <View style={styles.cardsGrid}>
            {aboutCards.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.card,
                  item.theme === 'green' ? styles.greenCard : styles.darkCard,
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text style={[styles.iconText, item.theme === 'green' ? styles.whiteText : styles.greenAccentText]}>
                    {item.icon}
                  </Text>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            ))}
          </View>

          {/* --- RIGHT SIDE INFO TEXT --- */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>WHAT IS PAYTON?</Text>
            <Text style={styles.sectionText}>
              We are more than a tracker. Payton is an intelligent financial ecosystem that provides actionable recommendations to help you make smarter financial decisions.
            </Text>
            <Text style={styles.sectionText}>
              Unlike traditional tools, Payton integrates all your financial data in one secure platform, ensuring organization, accuracy, and convenience.
            </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
  },
  contentLayout: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 40,
  },
  rowLayout: {
    flexDirection: 'row',
  },
  columnLayout: {
    flexDirection: 'column',
  },

  /* Cards Grid Styles */
  cardsGrid: {
    flex: 1,
    width: '100%',
    maxWidth: 560,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  card: {
    width: '47%',
    minWidth: 230,
    borderRadius: 16,
    padding: 24,
    justifyContent: 'space-between',
    height: 160,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  greenCard: {
    backgroundColor: '#10B981', // Synced with Payton green accent
    borderColor: '#10B981',
  },
  darkCard: {
    backgroundColor: '#1E293B', // Synced with _layout.tsx card theme
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  greenAccentText: {
    color: '#10B981', // Synced green accent for dark cards
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
  },

  /* Right Side Info Section Styles */
  infoSection: {
    flex: 1,
    maxWidth: 540,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: 1,
  },
  sectionText: {
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 26,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
});