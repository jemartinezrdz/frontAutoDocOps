import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ChatScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat Semántico</Text>
        <Text style={styles.subtitle}>Consulta tu API de forma natural</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonTitle}>Próximamente</Text>
          <Text style={styles.comingSoonText}>
            El chat semántico te permitirá hacer preguntas sobre tu API
            en lenguaje natural y obtener respuestas precisas.
          </Text>
        </View>
        
        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Características del Chat:</Text>
          <Text style={styles.featureItem}>• Consultas en lenguaje natural</Text>
          <Text style={styles.featureItem}>• Respuestas con streaming</Text>
          <Text style={styles.featureItem}>• Historial de conversaciones</Text>
          <Text style={styles.featureItem}>• Integración con documentación</Text>
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  content: {
    padding: 16,
  },
  comingSoon: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },
  comingSoonText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    backgroundColor: '#ffffff',
    padding: 20,
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
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  featureItem: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 24,
  },
});

