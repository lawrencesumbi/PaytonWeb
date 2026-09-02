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

export default function FeaturesPage() {
  const featuresData = [
    {
      id: '1',
      icon: '↗',
      title: 'Split Expense',
      description: 'Split bills with friends and manage shared recurring costs.',
      previewType: 'split',
    },
    {
      id: '2',
      icon: '📊',
      title: 'Expense Tracking',
      description: 'Log spendings by categories and visualize your insights.',
      previewType: 'tracking',
    },
    {
      id: '3',
      icon: '💳',
      title: 'Payment Status',
      description: 'Track paid, unpaid, or overdue payments effortlessly.',
      previewType: 'status',
    },
    {
      id: '4',
      icon: '🤖',
      title: 'AI-Assisted',
      description: 'Smart reminders and predictive insights for your budget.',
      previewType: 'ai',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* --- HEADER SECTION --- */}
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Powerful Features</Text>
          <Text style={styles.sectionSubtitle}>
            Intelligent tools to simplify your financial life.
          </Text>
        </View>

        {/* --- FEATURES GRID / LIST --- */}
        <View style={[styles.gridContainer, isDesktop ? styles.gridRow : styles.gridColumn]}>
          {featuresData.map((item) => (
            <View key={item.id} style={styles.featureCard}>
              
              {/* Icon & Details */}
              <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                  <Text style={styles.iconText}>{item.icon}</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>

              {/* Visual Preview Box */}
              <View style={styles.previewBox}>
                {item.previewType === 'split' && (
                  <View style={styles.mockupSplitContainer}>
                    <View style={styles.mockupCardMini} />
                    <View style={[styles.mockupCardMini, styles.mockupCardOffset]} />
                  </View>
                )}
                {item.previewType === 'tracking' && (
                  <View style={styles.mockupTrackingContainer}>
                    <Text style={styles.mockupAmountText}>$0.00</Text>
                    <View style={styles.mockupBar} />
                  </View>
                )}
                {item.previewType === 'status' && (
                  <View style={styles.mockupStatusContainer}>
                    <View style={styles.mockupPhoneShape}>
                      <Text style={styles.mockupPriceText}>$145,900</Text>
                    </View>
                  </View>
                )}
                {item.previewType === 'ai' && (
                  <View style={styles.mockupAIContainer}>
                    <View style={styles.mockupAICircle} />
                  </View>
                )}
              </View>

            </View>
          ))}
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
    marginBottom: 50,
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
    gap: 24,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  /* Feature Card Styles */
  featureCard: {
    backgroundColor: '#1E293B', // Synced with _layout.tsx border/card theme
    borderRadius: 16,
    padding: 24,
    width: isDesktop ? '23%' : '100%',
    minWidth: 260,
    maxWidth: 300,
    marginBottom: 20,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    marginBottom: 20,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#10B981', // Synced with Payton green accent
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
  },

  /* Visual Preview Box Styles */
  previewBox: {
    height: 140,
    backgroundColor: '#0F172A', // Synced with main layout background
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  mockupSplitContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockupCardMini: {
    width: 70,
    height: 90,
    backgroundColor: '#10B981',
    borderRadius: 10,
    position: 'absolute',
    left: 45,
  },
  mockupCardOffset: {
    backgroundColor: '#FFFFFF',
    left: 95,
    transform: [{ scale: 0.9 }],
  },
  mockupTrackingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockupAmountText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mockupBar: {
    width: 80,
    height: 6,
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  mockupStatusContainer: {
    alignItems: 'center',
  },
  mockupPhoneShape: {
    width: 110,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    paddingTop: 12,
  },
  mockupPriceText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mockupAIContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockupAICircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
    opacity: 0.8,
  },
});