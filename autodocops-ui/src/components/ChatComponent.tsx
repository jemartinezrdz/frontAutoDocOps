import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatComponentProps {
  projectId?: string;
  onSendMessage?: (message: string) => void;
}

export function ChatComponent({ projectId: _projectId, onSendMessage }: ChatComponentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: '¡Hola! Soy tu asistente de documentación. Puedes preguntarme sobre tu API, endpoints, modelos de datos y más.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTypingEffect = (text: string, messageId: string) => {
    let currentText = '';
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, content: currentText, isTyping: true }
              : msg
          )
        );
        index++;
      } else {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, isTyping: false }
              : msg
          )
        );
        clearInterval(typingInterval);
        setIsLoading(false);
      }
    }, 30); // Typing speed
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Call external handler if provided
    if (onSendMessage) {
      onSendMessage(inputText.trim());
    }

    // Simulate API response with typing effect
    setTimeout(() => {
      const botMessageId = (Date.now() + 1).toString();
      const botMessage: ChatMessage = {
        id: botMessageId,
        content: '',
        isUser: false,
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages(prev => [...prev, botMessage]);

      // Simulate different responses based on input
      let response = '';
      const input = inputText.toLowerCase();
      
      if (input.includes('endpoint') || input.includes('api')) {
        response = 'Basándome en tu documentación, tienes varios endpoints disponibles:\n\n• GET /api/projects - Lista todos los proyectos\n• POST /api/projects - Crea un nuevo proyecto\n• GET /api/projects/{id} - Obtiene un proyecto específico\n\n¿Te gustaría saber más detalles sobre algún endpoint en particular?';
      } else if (input.includes('modelo') || input.includes('schema')) {
        response = 'Los modelos principales en tu API incluyen:\n\n• Project: Representa un proyecto con campos como id, name, description, repositoryUrl\n• User: Información del usuario con id, email, name\n• ChatMessage: Mensajes del chat con content, projectId, timestamp\n\n¿Necesitas ver la estructura completa de algún modelo?';
      } else if (input.includes('error') || input.includes('problema')) {
        response = 'Para ayudarte con errores, necesito más información:\n\n• ¿Qué endpoint estás intentando usar?\n• ¿Cuál es el código de error que recibes?\n• ¿Podrías compartir el payload que estás enviando?\n\nCon estos detalles podré darte una solución más específica.';
      } else {
        response = `Entiendo que preguntas sobre "${inputText}". Puedo ayudarte con:\n\n• Información sobre endpoints y métodos HTTP\n• Estructura de modelos y schemas\n• Ejemplos de requests y responses\n• Documentación de parámetros\n• Resolución de errores comunes\n\n¿Podrías ser más específico sobre qué aspecto te interesa?`;
      }

      simulateTypingEffect(response, botMessageId);
    }, 1000);
  };

  const renderMessage = (message: ChatMessage) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessage : styles.botMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          message.isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text style={[
          styles.messageText,
          message.isUser ? styles.userText : styles.botText,
        ]}>
          {message.content}
          {message.isTyping && <Text style={styles.cursor}>|</Text>}
        </Text>
        <Text style={[
          styles.timestamp,
          message.isUser ? styles.userTimestamp : styles.botTimestamp,
        ]}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Escribiendo...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Pregunta sobre tu API..."
          placeholderTextColor="#999"
          multiline
          maxLength={500}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <Ionicons 
            name="send" 
            size={20} 
            color={(!inputText.trim() || isLoading) ? '#ccc' : '#fff'} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageContainer: {
    marginVertical: 4,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#ffffff',
  },
  botText: {
    color: '#1a1a1a',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  botTimestamp: {
    color: '#999',
  },
  cursor: {
    opacity: 0.7,
  },
  loadingContainer: {
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
    backgroundColor: '#f8f9fa',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#e9ecef',
  },
});

