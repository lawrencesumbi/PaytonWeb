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
    backgroundColor: '#FAF8FC', // Clean light background
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
    marginBottom: 50,
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
    backgroundColor: '#1E1B4B', // Dark card background matching the reference
    borderRadius: 24,
    padding: 24,
    width: isDesktop ? '23%' : '100%',
    minWidth: 260,
    maxWidth: 300,
    marginBottom: 20,
    justifyContent: 'space-between',
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  cardHeader: {
    marginBottom: 20,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 20,
  },

  /* Visual Preview Box Styles */
  previewBox: {
    height: 140,
    backgroundColor: '#151338',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
    backgroundColor: '#7C3AED',
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
    backgroundColor: '#7C3AED',
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
    color: '#1E1B4B',
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
    backgroundColor: '#7C3AED',
    opacity: 0.8,
  },
});