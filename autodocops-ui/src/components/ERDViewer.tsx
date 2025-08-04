import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ERDViewerProps {
  erdUrl?: string;
  projectId?: string;
}

// Mock ERD data - in real app this would come from the API
const mockERDContent = `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="600" fill="#f8f9fa"/>
  
  <!-- Title -->
  <text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#1a1a1a">
    AutoDocOps - Entity Relationship Diagram
  </text>
  
  <!-- User Entity -->
  <rect x="50" y="80" width="150" height="120" fill="#007AFF" stroke="#0056b3" stroke-width="2" rx="8"/>
  <text x="125" y="100" text-anchor="middle" font-size="14" font-weight="bold" fill="white">User</text>
  <line x1="60" y1="110" x2="190" y2="110" stroke="white" stroke-width="1"/>
  <text x="60" y="125" font-size="11" fill="white">• id (PK)</text>
  <text x="60" y="140" font-size="11" fill="white">• email</text>
  <text x="60" y="155" font-size="11" fill="white">• name</text>
  <text x="60" y="170" font-size="11" fill="white">• created_at</text>
  <text x="60" y="185" font-size="11" fill="white">• updated_at</text>
  
  <!-- Project Entity -->
  <rect x="300" y="80" width="200" height="150" fill="#28a745" stroke="#1e7e34" stroke-width="2" rx="8"/>
  <text x="400" y="100" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Project</text>
  <line x1="310" y1="110" x2="490" y2="110" stroke="white" stroke-width="1"/>
  <text x="310" y="125" font-size="11" fill="white">• id (PK)</text>
  <text x="310" y="140" font-size="11" fill="white">• name</text>
  <text x="310" y="155" font-size="11" fill="white">• description</text>
  <text x="310" y="170" font-size="11" fill="white">• repository_url</text>
  <text x="310" y="185" font-size="11" fill="white">• user_id (FK)</text>
  <text x="310" y="200" font-size="11" fill="white">• created_at</text>
  <text x="310" y="215" font-size="11" fill="white">• updated_at</text>
  
  <!-- Documentation Entity -->
  <rect x="580" y="80" width="170" height="120" fill="#ffc107" stroke="#e0a800" stroke-width="2" rx="8"/>
  <text x="665" y="100" text-anchor="middle" font-size="14" font-weight="bold" fill="#1a1a1a">Documentation</text>
  <line x1="590" y1="110" x2="740" y2="110" stroke="#1a1a1a" stroke-width="1"/>
  <text x="590" y="125" font-size="11" fill="#1a1a1a">• id (PK)</text>
  <text x="590" y="140" font-size="11" fill="#1a1a1a">• content</text>
  <text x="590" y="155" font-size="11" fill="#1a1a1a">• project_id (FK)</text>
  <text x="590" y="170" font-size="11" fill="#1a1a1a">• generated_at</text>
  <text x="590" y="185" font-size="11" fill="#1a1a1a">• version</text>
  
  <!-- Chat Message Entity -->
  <rect x="300" y="300" width="200" height="150" fill="#dc3545" stroke="#c82333" stroke-width="2" rx="8"/>
  <text x="400" y="320" text-anchor="middle" font-size="14" font-weight="bold" fill="white">ChatMessage</text>
  <line x1="310" y1="330" x2="490" y2="330" stroke="white" stroke-width="1"/>
  <text x="310" y="345" font-size="11" fill="white">• id (PK)</text>
  <text x="310" y="360" font-size="11" fill="white">• content</text>
  <text x="310" y="375" font-size="11" fill="white">• user_id (FK)</text>
  <text x="310" y="390" font-size="11" fill="white">• project_id (FK)</text>
  <text x="310" y="405" font-size="11" fill="white">• timestamp</text>
  <text x="310" y="420" font-size="11" fill="white">• is_user_message</text>
  <text x="310" y="435" font-size="11" fill="white">• response_time</text>
  
  <!-- Relationships -->
  <!-- User -> Project (1:N) -->
  <line x1="200" y1="140" x2="300" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="240" y="135" font-size="10" fill="#666">1:N</text>
  
  <!-- Project -> Documentation (1:N) -->
  <line x1="500" y1="140" x2="580" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="530" y="135" font-size="10" fill="#666">1:N</text>
  
  <!-- User -> ChatMessage (1:N) -->
  <line x1="125" y1="200" x2="125" y2="280" stroke="#666" stroke-width="2"/>
  <line x1="125" y1="280" x2="300" y2="280" stroke="#666" stroke-width="2"/>
  <line x1="300" y1="280" x2="300" y2="375" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="200" y="275" font-size="10" fill="#666">1:N</text>
  
  <!-- Project -> ChatMessage (1:N) -->
  <line x1="400" y1="230" x2="400" y2="300" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="405" y="265" font-size="10" fill="#666">1:N</text>
  
  <!-- Arrow marker definition -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
  
  <!-- Legend -->
  <rect x="50" y="500" width="700" height="80" fill="white" stroke="#ddd" stroke-width="1" rx="4"/>
  <text x="60" y="520" font-size="12" font-weight="bold" fill="#1a1a1a">Leyenda:</text>
  <text x="60" y="540" font-size="11" fill="#666">• PK = Primary Key (Clave Primaria)</text>
  <text x="60" y="555" font-size="11" fill="#666">• FK = Foreign Key (Clave Foránea)</text>
  <text x="60" y="570" font-size="11" fill="#666">• 1:N = Relación uno a muchos</text>
  
  <text x="400" y="540" font-size="11" fill="#666">• User: Usuarios del sistema</text>
  <text x="400" y="555" font-size="11" fill="#666">• Project: Proyectos de documentación</text>
  <text x="400" y="570" font-size="11" fill="#666">• Documentation: Documentación generada</text>
  
  <text x="600" y="540" font-size="11" fill="#666">• ChatMessage: Mensajes del chat</text>
  <text x="600" y="555" font-size="11" fill="#666">• Cada proyecto pertenece a un usuario</text>
  <text x="600" y="570" font-size="11" fill="#666">• Los mensajes están asociados a proyectos</text>
</svg>
`;

export function ERDViewer({ erdUrl: _erdUrl, projectId: _projectId }: ERDViewerProps) {
  const [error, setError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  const renderERDContent = () => {
    // In a real app, this would render the actual SVG from erdUrl
    // For now, we'll show a visual mockup that represents the structure
    return (
      <View style={styles.erdContainer}>
        <Text style={styles.erdTitle}>Entity Relationship Diagram</Text>
        
        {/* Mockup visual representation */}
        <View style={styles.diagramContainer}>
          {/* User Entity */}
          <View style={[styles.entityBox, { backgroundColor: '#007AFF' }]}>
            <Text style={styles.entityTitle}>User</Text>
            <Text style={styles.entityField}>• id (PK)</Text>
            <Text style={styles.entityField}>• email</Text>
            <Text style={styles.entityField}>• name</Text>
            <Text style={styles.entityField}>• created_at</Text>
          </View>

          {/* Project Entity */}
          <View style={[styles.entityBox, { backgroundColor: '#28a745' }]}>
            <Text style={styles.entityTitle}>Project</Text>
            <Text style={styles.entityField}>• id (PK)</Text>
            <Text style={styles.entityField}>• name</Text>
            <Text style={styles.entityField}>• description</Text>
            <Text style={styles.entityField}>• repository_url</Text>
            <Text style={styles.entityField}>• user_id (FK)</Text>
          </View>

          {/* Documentation Entity */}
          <View style={[styles.entityBox, { backgroundColor: '#ffc107' }]}>
            <Text style={[styles.entityTitle, { color: '#1a1a1a' }]}>Documentation</Text>
            <Text style={[styles.entityField, { color: '#1a1a1a' }]}>• id (PK)</Text>
            <Text style={[styles.entityField, { color: '#1a1a1a' }]}>• content</Text>
            <Text style={[styles.entityField, { color: '#1a1a1a' }]}>• project_id (FK)</Text>
            <Text style={[styles.entityField, { color: '#1a1a1a' }]}>• generated_at</Text>
          </View>

          {/* ChatMessage Entity */}
          <View style={[styles.entityBox, { backgroundColor: '#dc3545' }]}>
            <Text style={styles.entityTitle}>ChatMessage</Text>
            <Text style={styles.entityField}>• id (PK)</Text>
            <Text style={styles.entityField}>• content</Text>
            <Text style={styles.entityField}>• user_id (FK)</Text>
            <Text style={styles.entityField}>• project_id (FK)</Text>
            <Text style={styles.entityField}>• timestamp</Text>
          </View>
        </View>
        
        <Text style={styles.mockNote}>
          📊 Diagrama ER interactivo{'\n'}
          � Usa los controles de zoom para navegar{'\n'}
          🔄 Toca "Reset" para volver al inicio{'\n'}
          📋 Muestra las entidades principales del sistema
        </Text>
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#dc3545" />
          <Text style={styles.errorTitle}>Error al cargar ERD</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              setError(null);
              // Retry logic would go here
            }}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Diagrama ER</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}>
            <Ionicons name="remove" size={20} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.zoomText}>{Math.round(zoomLevel * 100)}%</Text>
          <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}>
            <Ionicons name="add" size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={resetZoom}>
            <Ionicons name="refresh" size={20} color="#007AFF" />
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { transform: [{ scale: zoomLevel }] }
        ]}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        maximumZoomScale={2}
        minimumZoomScale={0.5}
        bouncesZoom={true}
      >
        {renderERDContent()}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Tip: Usa los controles de zoom o pellizca para acercar/alejar
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  zoomText: {
    fontSize: 12,
    color: '#666666',
    marginHorizontal: 8,
    minWidth: 40,
    textAlign: 'center',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  resetButtonText: {
    marginLeft: 4,
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  erdContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 400,
  },
  erdTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
  diagramContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  entityBox: {
    width: 140,
    padding: 12,
    borderRadius: 8,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  entityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    paddingBottom: 4,
  },
  entityField: {
    fontSize: 10,
    color: '#ffffff',
    marginBottom: 2,
  },
  mockERD: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  mockNote: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
    lineHeight: 24,
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#dc3545',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

