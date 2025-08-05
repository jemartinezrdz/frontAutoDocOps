import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const features = [
    {
      id: 'projects',
      title: 'Proyectos',
      description: 'Gestiona tus repositorios y documentación automática',
      icon: 'folder-outline',
      color: '#007AFF',
      route: '/projects',
    },
    {
      id: 'chat',
      title: 'Chat Semántico',
      description: 'Consulta tu API en lenguaje natural con IA',
      icon: 'chatbubble-outline',
      color: '#28a745',
      route: '/chat',
    },
    {
      id: 'erd',
      title: 'Diagrama ER',
      description: 'Visualiza la estructura de tu base de datos',
      icon: 'git-network-outline',
      color: '#ffc107',
      route: '/erd',
    },
    {
      id: 'settings',
      title: 'Configuración',
      description: 'Personaliza tu experiencia y preferencias',
      icon: 'settings-outline',
      color: '#6c757d',
      route: '/settings',
    },
  ];

  const handleFeaturePress = (route: string) => {
    if (route.startsWith('/')) {
      router.push(route as any);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AutoDocOps</Text>
        <Text style={styles.subtitle}>
          Documentación automática para tus APIs
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>¡Bienvenido!</Text>
          <Text style={styles.welcomeText}>
            AutoDocOps te ayuda a generar documentación automática para tus APIs,
            consultar información con IA y visualizar la estructura de tus datos.
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Funcionalidades</Text>
          
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={styles.featureCard}
              onPress={() => handleFeaturePress(feature.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                <Ionicons name={feature.icon as any} size={24} color="#ffffff" />
              </View>
              
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              
              <Ionicons name="chevron-forward" size={20} color="#666666" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Proyectos</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Consultas Chat</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Diagramas ER</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => handleFeaturePress('/projects')}
          >
            <Ionicons name="add-circle" size={20} color="#ffffff" />
            <Text style={styles.quickActionText}>Nuevo Proyecto</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.quickActionButton, styles.secondaryButton]}
            onPress={() => handleFeaturePress('/chat')}
          >
            <Ionicons name="help-circle" size={20} color="#007AFF" />
            <Text style={[styles.quickActionText, styles.secondaryButtonText]}>
              Hacer Consulta
            </Text>
          </TouchableOpacity>
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
    fontSize: 32,
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
  welcomeCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  featuresSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  statsSection: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  quickActions: {
    marginBottom: 24,
  },
  quickActionButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  quickActionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});

