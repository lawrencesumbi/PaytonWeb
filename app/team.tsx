import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
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
      image: require('../assets/images/sumbi.jpg'),
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

  // Duplicate the array to create a seamless infinite loop
  const extendedMembers = [...teamMembers, ...teamMembers];

  // Animation value for horizontal translation
  const scrollX = useRef(new Animated.Value(0)).current;

  // Each card width (220px) + gap (20px) = 240px per item block
  const ITEM_WIDTH = 240;
  const totalWidth = teamMembers.length * ITEM_WIDTH;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: -totalWidth,
        duration: 25000, // Adjust speed: higher = slower, lower = faster
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => animation.stop();
  }, [scrollX, totalWidth]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* --- HEADER SECTION --- */}
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>MEET THE TEAM</Text>
          <Text style={styles.sectionSubtitle}>
            The developers behind the Payton Financial System.
          </Text>
        </View>

        {/* --- CONTINUOUS SLIDING TEAM CAROUSEL --- */}
        <View style={styles.carouselContainer}>
          <Animated.View
            style={[
              styles.track,
              {
                transform: [{ translateX: scrollX }],
              },
            ]}
          >
            {extendedMembers.map((member, index) => (
              <View key={`${member.id}-${index}`} style={styles.memberCard}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatarPlaceholder}>
                    <Image source={member.image} style={styles.avatarImage} />
                  </View>
                </View>
                <Text style={styles.memberName} numberOfLines={2}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
            ))}
          </Animated.View>
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
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  
  /* Header Styles */
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 1,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  /* Carousel Layout */
  carouselContainer: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: 50,
  },
  track: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },

  /* Member Card Styles */
  memberCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: 220,
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
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10B981',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  memberName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
    minHeight: 36,
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
    paddingHorizontal: 24,
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
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});