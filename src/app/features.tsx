import { Ionicons } from '@expo/vector-icons';
import {
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from 'react-native';

export default function FeaturesScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1200;
  const isMediumScreen = width >= 768;

  const featuresList = [
    {
      title: 'Split Expense',
      description: 'Split bills with friends and manage shared recurring costs.',
      icon: 'git-compare-outline' as const,
      previewType: 'split',
    },
    {
      title: 'Expense Tracking',
      description: 'Log spendings by categories and visualize your insights.',
      icon: 'bar-chart-outline' as const,
      previewType: 'tracking',
    },
    {
      title: 'Payment Status',
      description: 'Track paid, unpaid, or overdue payments effortlessly.',
      icon: 'card-outline' as const,
      previewType: 'payment',
    },
    {
      title: 'AI-Assisted',
      description: 'Smart reminders and predictive insights for your budget.',
      icon: 'hardware-chip-outline' as const,
      previewType: 'ai',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.mainHeading}>Powerful Features</Text>
        <Text style={styles.subHeading}>
          Intelligent tools to simplify your financial life.
        </Text>
      </View>

      <View
        style={[
          styles.gridContainer,
          {
            flexDirection: isLargeScreen ? 'row' : 'column',
            alignItems: isLargeScreen ? 'flex-start' : 'center',
          },
        ]}
      >
        {featuresList.map((item, index) => (
          <View
            key={index}
            style={[
              styles.featureCard,
              { width: isLargeScreen ? '23%' : isMediumScreen ? '45%' : '100%' },
            ]}
          >
            {/* Feature Icon Header */}
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={22} color="#10B981" />
            </View>

            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>

            {/* Visual Mockup Box / Preview Area */}
            <View style={styles.mockupPreviewContainer}>
              {item.previewType === 'split' && (
                <View style={styles.miniCardRow}>
                  <View style={styles.miniCardItem}>
                    <Text style={styles.miniCardText}>$126.49</Text>
                  </View>
                  <View style={[styles.miniCardItem, styles.highlightMiniCard]}>
                    <Text style={[styles.miniCardText, { color: '#FFFFFF' }]}>$250.00</Text>
                  </View>
                </View>
              )}

              {item.previewType === 'tracking' && (
                <View style={styles.centeredMiniPreview}>
                  <Text style={styles.amountDisplay}>$0.00</Text>
                  <View style={styles.barLines}>
                    <View style={[styles.barFill, { width: '60%' }]} />
                    <View style={[styles.barFill, { width: '40%' }]} />
                  </View>
                </View>
              )}

              {item.previewType === 'payment' && (
                <View style={styles.centeredMiniPreview}>
                  <Text style={styles.amountDisplay}>$145,900</Text>
                  <View style={styles.badgeIndicator}>
                    <Text style={styles.badgeIndicatorText}>Paid</Text>
                  </View>
                </View>
              )}

              {item.previewType === 'ai' && (
                <View style={styles.aiPreviewBox}>
                  <Ionicons name="sparkles" size={20} color="#10B981" />
                  <Text style={styles.aiText}>Smart Insight Ready</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF', // Clean white background matching the request
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  mainHeading: {
    fontSize: 38,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: 500,
  },
  gridContainer: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 24,
  },
  featureCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    minHeight: 380,
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ECFDF5', // Soft green tint
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 24,
  },
  mockupPreviewContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  miniCardRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  miniCardItem: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  highlightMiniCard: {
    backgroundColor: '#10B981', // Green theme card highlight
  },
  miniCardText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  centeredMiniPreview: {
    alignItems: 'center',
    width: '100%',
    gap: 8,
  },
  amountDisplay: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  barLines: {
    width: '80%',
    gap: 4,
  },
  barFill: {
    height: 6,
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  badgeIndicator: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  badgeIndicatorText: {
    color: '#047857',
    fontSize: 11,
    fontWeight: '700',
  },
  aiPreviewBox: {
    alignItems: 'center',
    gap: 6,
  },
  aiText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
});