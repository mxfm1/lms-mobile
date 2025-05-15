import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Index = () => {
  const router = useRouter()
  const { signOut,isSignedIn } = useAuth()
  const goToLogin = () => {
    router.push("/login")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la app</Text>
      <View>
        <Text style={styles.buttonText}>{isSignedIn ?' Usuario autenticado' : "Usuario no autenticado"}</Text>
      </View>
      <Pressable onPress={goToLogin} style={styles.button}>
        <Text style={styles.buttonText}>Ir al login</Text>
      </Pressable>
      <Pressable onPress={() => signOut()} style={styles.button}>
        <Text style={styles.buttonText}>
          Cerrar Session
        </Text>
      </Pressable>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fondo oscuro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // Texto claro
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
