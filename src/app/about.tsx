import { Ionicons } from '@expo/vector-icons';
import {
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

export default function AboutScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  const aboutCards = [
    {
      title: 'Backend',
      description: 'PHP & SQL for secure data handling.',
      icon: 'code-slash-outline' as const,
      variant: 'solid' as const,
    },
    {
      title: 'Frontend',
      description: 'Modern HTML, CSS, Tailwind & JS.',
      icon: 'layers-outline' as const,
      variant: 'outlined' as const,
    },
    {
      title: 'Tracker',
      description: 'Monitor transactions effortlessly.',
      icon: 'stats-chart-outline' as const,
      variant: 'outlined' as const,
    },
    {
      title: 'Integration',
      description: 'Splitwise-inspired bill sharing.',
      icon: 'people-outline' as const,
      variant: 'solid' as const,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View
        style={[
          styles.contentWrapper,
          { flexDirection: isDesktop ? 'row' : 'column-reverse' },
        ]}
      >
        {/* Left Side: Asymmetric Grid of Info Cards */}
        <View style={styles.gridColumn}>
          <View style={styles.cardColumnGroup}>
            {aboutCards.slice(0, 2).map((item, index) => (
              <View
                key={index}
                style={[
                  styles.infoCard,
                  item.variant === 'solid' ? styles.solidCard : styles.outlinedCard,
                ]}
              >
                <View
                  style={[
                    styles.iconContainer,
                    item.variant === 'solid'
                      ? styles.solidIconContainer
                      : styles.outlinedIconContainer,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color={item.variant === 'solid' ? '#FFFFFF' : '#10B981'}
                  />
                </View>
                <Text
                  style={[
                    styles.cardTitle,
                    item.variant === 'solid' && styles.whiteText,
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.cardDescription,
                    item.variant === 'solid' && styles.lightText,
                  ]}
                >
                  {item.description}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.cardColumnGroup, styles.offsetColumn]}>
            {aboutCards.slice(2, 4).map((item, index) => (
              <View
                key={index}
                style={[
                  styles.infoCard,
                  item.variant === 'solid' ? styles.solidCard : styles.outlinedCard,
                ]}
              >
                <View
                  style={[
                    styles.iconContainer,
                    item.variant === 'solid'
                      ? styles.solidIconContainer
                      : styles.outlinedIconContainer,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color={item.variant === 'solid' ? '#FFFFFF' : '#10B981'}
                  />
                </View>
                <Text
                  style={[
                    styles.cardTitle,
                    item.variant === 'solid' && styles.whiteText,
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.cardDescription,
                    item.variant === 'solid' && styles.lightText,
                  ]}
                >
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Right Side: Heading and Explanatory Text */}
        <View style={styles.textColumn}>
          <Text style={styles.mainHeading}>WHAT IS PAYTON?</Text>
          <Text style={styles.paragraph}>
            We are more than a tracker. Payton is an intelligent financial ecosystem that provides actionable recommendations to help you make smarter financial decisions.
          </Text>
          <Text style={styles.paragraph}>
            Unlike traditional tools, Payton integrates all your financial data in one secure platform, ensuring organization, accuracy, and convenience.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF', // Clean white theme background
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  contentWrapper: {
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 60,
  },
  gridColumn: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    width: '100%',
    justifyContent: 'center',
  },
  cardColumnGroup: {
    flex: 1,
    gap: 20,
    maxWidth: 280,
  },
  offsetColumn: {
    marginTop: 40, // Creates the staggered/asymmetric layout from the reference
  },
  infoCard: {
    borderRadius: 24,
    padding: 28,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  solidCard: {
    backgroundColor: '#10B981', // Vibrant green theme block
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  outlinedCard: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  solidIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  outlinedIconContainer: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  whiteText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#ECFDF5',
  },
  textColumn: {
    flex: 1,
    maxWidth: 540,
  },
  mainHeading: {
    fontSize: 42,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  paragraph: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 28,
    marginBottom: 20,
  },
});