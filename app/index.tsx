import Button from '@/components/Button';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const handleGetStarted = () => {
    Alert.alert('Welcome!', 'Let\'s start your learning journey!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Panjeree Edu</Text>
      <Text style={styles.subtitle}>Your learning journey starts here</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Get Started" onPress={handleGetStarted} />
        <Button title="Learn More" onPress={() => Alert.alert('Info', 'More features coming soon!')} variant="secondary" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 16,
    width: '100%',
    maxWidth: 300,
  },
}); 