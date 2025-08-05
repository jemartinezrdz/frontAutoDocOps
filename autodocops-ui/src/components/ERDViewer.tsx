import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

interface ERDViewerProps {
  erdUrl?: string;
  projectId?: string;
}

interface Entity {
  id: string;
  name: string;
  x: number;
  y: number;
  attributes: string[];
}

interface Relationship {
  id: string;
  from: string;
  to: string;
  type: string;
}

export const ERDViewer: React.FC<ERDViewerProps> = ({ 
  erdUrl = 'https://api.autodocops.com/v1/erd/default', 
  projectId = 'default-project' 
}) => {
  const [loading, setLoading] = useState(true);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadERDData();
  }, [erdUrl, projectId]);

  const loadERDData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular carga de datos desde la API
      // En producción, esto haría una llamada real a erdUrl
      setTimeout(() => {
        const mockEntities: Entity[] = [
          {
            id: 'user',
            name: 'User',
            x: 50,
            y: 50,
            attributes: ['id', 'name', 'email', 'created_at']
          },
          {
            id: 'project',
            name: 'Project',
            x: 300,
            y: 50,
            attributes: ['id', 'name', 'description', 'user_id', 'created_at']
          },
          {
            id: 'document',
            name: 'Document',
            x: 550,
            y: 50,
            attributes: ['id', 'title', 'content', 'project_id', 'created_at']
          }
        ];

        const mockRelationships: Relationship[] = [
          {
            id: 'user-project',
            from: 'user',
            to: 'project',
            type: 'one-to-many'
          },
          {
            id: 'project-document',
            from: 'project',
            to: 'document',
            type: 'one-to-many'
          }
        ];

        setEntities(mockEntities);
        setRelationships(mockRelationships);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error loading ERD data:', error);
      setError('Error loading ERD data');
      setLoading(false);
      Alert.alert('Error', 'Failed to load ERD data');
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const renderEntity = (entity: Entity) => (
    <View
      key={entity.id}
      style={[
        styles.entity,
        {
          left: entity.x * zoomLevel,
          top: entity.y * zoomLevel,
          transform: [{ scale: zoomLevel }]
        }
      ]}
    >
      <Text style={styles.entityTitle}>{entity.name}</Text>
      <View style={styles.attributeList}>
        {entity.attributes.map((attr, index) => (
          <Text key={index} style={styles.attribute}>
            {attr}
          </Text>
        ))}
      </View>
    </View>
  );

  const renderZoomControls = () => (
    <View style={styles.zoomControls}>
      <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
        <Text style={styles.zoomButtonText}>-</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.zoomButton} onPress={handleResetZoom}>
        <Text style={styles.zoomButtonText}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
        <Text style={styles.zoomButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading ERD from {erdUrl}</Text>
        <Text style={styles.projectText}>Project: {projectId}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadERDData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderZoomControls()}
      
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.erdCanvas,
          { 
            width: 800 * zoomLevel,
            height: 600 * zoomLevel
          }
        ]}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        maximumZoomScale={3}
        minimumZoomScale={0.5}
        zoomScale={zoomLevel}
      >
        {entities.map(renderEntity)}
        
        {/* Connection lines would be rendered here */}
        {relationships.map((rel) => (
          <View key={rel.id} style={styles.relationship}>
            <Text style={styles.relationshipLabel}>
              {rel.type}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.infoPanel}>
        <Text style={styles.infoText}>
          Project: {projectId} | Entities: {entities.length} | 
          Relations: {relationships.length} | Zoom: {Math.round(zoomLevel * 100)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  projectText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  zoomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  zoomButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 6,
  },
  zoomButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  erdCanvas: {
    backgroundColor: 'white',
    position: 'relative',
  },
  entity: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  entityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#007AFF',
    paddingBottom: 4,
  },
  attributeList: {
    flex: 1,
  },
  attribute: {
    fontSize: 12,
    color: '#333',
    paddingVertical: 2,
  },
  relationship: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 4,
    borderRadius: 4,
  },
  relationshipLabel: {
    fontSize: 10,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  infoPanel: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default ERDViewer;
