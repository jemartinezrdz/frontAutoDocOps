import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { Project } from '../../src/lib/trpc';

// Skeleton shimmer component
function ProjectSkeleton() {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmerAnimation.start();
    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const shimmerOpacity = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.skeletonCard}>
      <Animated.View style={[styles.skeletonTitle, { opacity: shimmerOpacity }]} />
      <Animated.View style={[styles.skeletonText, { opacity: shimmerOpacity }]} />
      <Animated.View style={[styles.skeletonTextShort, { opacity: shimmerOpacity }]} />
    </View>
  );
}

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock data
        const mockProjects: Project[] = [
          {
            id: '1',
            name: 'AutoDocOps API',
            description: 'API principal para generación automática de documentación',
            repositoryUrl: 'https://github.com/autodocops/api',
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-20T15:30:00Z',
          },
          {
            id: '2',
            name: 'Frontend Dashboard',
            description: 'Dashboard web para gestión de proyectos y documentación',
            repositoryUrl: 'https://github.com/autodocops/dashboard',
            createdAt: '2024-01-10T09:00:00Z',
            updatedAt: '2024-01-18T14:20:00Z',
          },
        ];
        
        setProjects(mockProjects);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Proyectos</Text>
        <Text style={styles.subtitle}>Gestiona tus repositorios y documentación</Text>
      </View>
      
      <View style={styles.content}>
        {error ? (
          <View style={styles.errorState}>
            <Text style={styles.errorTitle}>Error al cargar proyectos</Text>
            <Text style={styles.errorText}>
              No se pudieron cargar los proyectos. Verifica tu conexión e intenta nuevamente.
            </Text>
          </View>
        ) : isLoading ? (
          <>
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </>
        ) : !projects || projects.length === 0 ? (
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
  errorState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 40,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#dc3545',
    marginBottom: 12,
  },
  errorText: {
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

