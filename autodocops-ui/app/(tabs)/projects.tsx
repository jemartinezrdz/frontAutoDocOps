import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Project {
  name: string;
  description: string;
}

// Skeleton shimmer component
function ProjectSkeleton() {
  return (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonTitle} />
      <View style={styles.skeletonText} />
      <View style={styles.skeletonTextShort} />
    </View>
  );
}

export default function ProjectsScreen() {
  const [loading, setLoading] = useState(true);
  const [projects] = useState<Project[]>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Proyectos</Text>
        <Text style={styles.subtitle}>Gestiona tus repositorios y documentación</Text>
      </View>
      
      <View style={styles.content}>
        {loading ? (
          <>
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </>
        ) : projects.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No hay proyectos</Text>
            <Text style={styles.emptyText}>
              Conecta tu primer repositorio para empezar a generar documentación automática.
            </Text>
          </View>
        ) : (
          projects.map((project, index) => (
            <View key={index} style={styles.projectCard}>
              <Text style={styles.projectTitle}>{project.name}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>
            </View>
          ))
        )}
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
  projectCard: {
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
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  projectDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  skeletonCard: {
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
  skeletonTitle: {
    height: 20,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    marginBottom: 12,
    width: '70%',
  },
  skeletonText: {
    height: 16,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    marginBottom: 8,
    width: '100%',
  },
  skeletonTextShort: {
    height: 16,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    width: '60%',
  },
});

