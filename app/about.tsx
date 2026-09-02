import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutPage() {
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024;

  const stackItems = [
    
    {
      id: '2',
      icon: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png',
      title: 'React Native',
      subtitle: 'UI Framework',
    },
    {
      id: '4',
      icon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
      title: 'Gemini AI',
      subtitle: 'Intelligence',
    },
    {
      id: '3',
      icon: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/expo.png',
      title: 'Expo',
      subtitle: 'Runtime & Build',
    },
    
    {
      id: '1',
      icon: require('../assets/images/logo.png'),
      title: 'Payton',
      subtitle: 'Core Ecosystem',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.contentLayout, isDesktop ? styles.rowLayout : styles.columnLayout]}>
          
          {/* --- LEFT SIDE EXPANDED ECOSYSTEM HUB --- */}
          <View style={styles.ecosystemWrapper}>
            <View style={styles.nexusContainer}>
              <View style={styles.nexusGlowRing} />
              <View style={styles.nexusCoreCircle}>
                <Text style={styles.nexusCoreText}>ABOUT</Text>
              </View>

              {stackItems.map((item, index) => {
                const angle = (index * (360 / stackItems.length)) * (Math.PI / 180);
                const radius = 180; // Pushed out further for larger cards
                const cardSize = 140; // Match the new larger nodeCard width/height
                const containerCenter = 250; // Half of nexusContainer width/height (500 / 2)
                
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <View
                    key={item.id}
                    style={[
                      styles.nodeCard,
                      {
                        left: containerCenter + x - (cardSize / 2),
                        top: containerCenter + y - (cardSize / 2),
                      },
                    ]}
                  >
                    <View style={styles.nodeIconWrapper}>
                      <Image
                        source={typeof item.icon === 'string' ? { uri: item.icon } : item.icon}
                        style={styles.nodeImage}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.nodeTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.nodeSubtitle} numberOfLines={1}>{item.subtitle}</Text>
                  </View>
                );
              })}
            </View>
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
            <Text style={styles.sectionText}>
              In building Payton, developers use React Native as a framework, Expo for building, and Gemini as the model used for AI features.
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
    backgroundColor: '#0F172A',
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
    alignItems: 'center',
  },
  columnLayout: {
    flexDirection: 'column',
  },

  /* Expanded Ecosystem Hub Styles */
  ecosystemWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 620,
    alignItems: 'center',
    justifyContent: 'center',
    height: 540,
  },
  nexusContainer: {
    width: 500,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  nexusGlowRing: {
    position: 'absolute',
    width: 390,
    height: 390,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    backgroundColor: 'rgba(16, 185, 129, 0.04)',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 25,
    elevation: 10,
  },
  nexusCoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 8,
  },
  nexusCoreText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#10B981',
    letterSpacing: 1,
  },
  nodeCard: {
    position: 'absolute',
    width: 140,  // Increased from 120 to 140
    height: 140, // Increased from 120 to 140
    borderRadius: 32,
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 3,
  },
  nodeIconWrapper: {
    width: 56,  // Increased from 48 to 56
    height: 56,  // Increased from 48 to 56
    borderRadius: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  nodeImage: {
    width: 32,   // Scaled icon size inside wrapper
    height: 32,
  },
  nodeTitle: {
    fontSize: 14,  // Increased typography scale slightly
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  nodeSubtitle: {
    fontSize: 11,  // Increased typography scale slightly
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 2,
  },

  /* Right Side Info Section Styles */
  infoSection: {
    flex: 1,
    maxWidth: 540,
    width: '100%',
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