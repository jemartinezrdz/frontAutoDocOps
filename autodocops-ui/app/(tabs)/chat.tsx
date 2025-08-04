import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ChatComponent } from '../../src/components/ChatComponent';

export default function ChatScreen() {
  const handleSendMessage = (message: string) => {
    // TODO: Integrate with actual API
    console.log('Sending message:', message);
  };

  return (
    <View style={styles.container}>
      <ChatComponent 
        projectId="current-project"
        onSendMessage={handleSendMessage}
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

