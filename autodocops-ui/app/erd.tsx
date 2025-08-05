import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ERDViewer } from '../src/components/ERDViewer';

export default function ERDScreen() {
  // In a real app, these would come from route params or context
  const projectId = "demo-project-1";
  const erdUrl = "https://api.autodocops.com/erd/demo-project-1";

  return (
    <View style={styles.container}>
      <ERDViewer 
        projectId={projectId}
        erdUrl={erdUrl}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

