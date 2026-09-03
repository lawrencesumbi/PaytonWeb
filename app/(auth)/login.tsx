import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = width > 900;

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your authentication logic here
    console.log('Logging in with:', email, password);
    // e.g., router.replace('/dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Optional Top Back/Home Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>

        <View style={[styles.loginWrapper, isDesktop ? styles.loginWrapperDesktop : null]}>
          
          {/* Header Branding */}
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>WELCOME BACK TO PAYTON</Text>
          </View>

          <Text style={styles.loginTitle}>
            Log in your <Text style={styles.brandHighlight}>Account</Text>.
          </Text>

          <Text style={styles.loginSubtitle}>
            Enter your credentials and continue your journey with us.
          </Text>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                placeholder="name@example.com"
                placeholderTextColor="#64748B"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.passwordHeaderRow}>
                <Text style={styles.inputLabel}>Password</Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password' as any)}>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="••••••••"
                placeholderTextColor="#64748B"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Action Buttons */}
            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup' as any)}>
                <Text style={styles.footerActionText}>Sign up</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A', // Matches landing page background
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  backButtonText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  loginWrapper: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  loginWrapperDesktop: {
    backgroundColor: '#1E293B', // Slightly lighter slate card wrapper on desktop screens
    padding: 40,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  badgeContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  badgeText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  loginTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#F8FAFC',
    lineHeight: 42,
    marginBottom: 12,
  },
  brandHighlight: {
    color: '#10B981',
  },
  loginSubtitle: {
    fontSize: 15,
    color: '#94A3B8',
    lineHeight: 24,
    marginBottom: 32,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  passwordHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  forgotText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  footerActionText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '700',
  },
});