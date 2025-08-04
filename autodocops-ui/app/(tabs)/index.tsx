import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AutoDocOps</Text>
        <Text style={styles.subtitle}>Documentación sin fricción</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bienvenido</Text>
          <Text style={styles.cardText}>
            Conecta tu repositorio y accede a documentación generada automáticamente,
            diagramas ER y consultas semánticas de tu API.
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Características</Text>
          <Text style={styles.cardText}>
            • Documentación automática{'\n'}
            • Diagramas ER interactivos{'\n'}
            • Chat semántico con tu API{'\n'}
            • Gestión de proyectos y equipos
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
  },
});

