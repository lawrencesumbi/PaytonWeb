import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';

export default function FeaturesPage() {
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024;

  const featuresData = [
    {
      id: '1',
      icon: 'git-compare-outline' as keyof typeof Ionicons.glyphMap,
      title: 'Split Expense',
      description: 'Effortlessly divide shared costs and streamline group reimbursements.',
      imageSource: require('../assets/images/split.jpg'),
    },
    {
      id: '2',
      icon: 'trending-up-outline' as keyof typeof Ionicons.glyphMap,
      title: 'Budget Allocation',
      description: 'Strategically distribute funds to optimize financial planning goals.',
      imageSource: require('../assets/images/budget.jpg'),
    },
    {
      id: '3',
      icon: 'shield-checkmark-outline' as keyof typeof Ionicons.glyphMap,
      title: 'Bill Reminders',
      description: 'Automate payment tracking to prevent late fees consistently.',
      imageSource: require('../assets/images/bill.jpg'),
    },
    {
      id: '4',
      icon: 'scan-outline' as keyof typeof Ionicons.glyphMap,
      title: 'AI Receipt Scanner',
      description: 'Extract expense data instantly using advanced optical recognition.',
      imageSource: require('../assets/images/scan.jpg'),
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
            <View 
              key={item.id} 
              style={[
                styles.featureCard, 
                { width: isDesktop ? '23%' : '100%' }
              ]}
            >
              
              {/* Icon & Details */}
              <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                  <Ionicons name={item.icon} size={22} color="#10B981" />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>

              {/* Visual Preview Photo */}
              <View style={styles.previewBox}>
                <Image 
                  source={item.imageSource} 
                  style={styles.previewImage}
                  resizeMode="cover"
                />
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
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    minWidth: 260,
    maxWidth: 300,
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
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(10, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(10, 185, 129, 0.3)',
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
    backgroundColor: '#0F172A',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});