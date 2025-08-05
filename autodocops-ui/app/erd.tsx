import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ERDViewer } from '../src/components/ERDViewer';

export default function ERDScreen() {
  return (
    <View style={styles.container}>
      <ERDViewer 
        projectId="current-project"
        erdUrl="https://api.autodocops.com/erd/current-project"
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

