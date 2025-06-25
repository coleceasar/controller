import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Send, Search, Lock, MapPin, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Shield, Plus, Users } from 'lucide-react-native';

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const [conversations, setConversations] = useState([
    {
      id: 1,
      contact: 'John Mwangi',
      number: '+254 712 345 678',
      lastMessage: 'Asante sana for the update. Everything looks good.',
      timestamp: '2024-01-15 14:30',
      unread: 2,
      encrypted: true,
      location: 'Nairobi, Kenya',
      status: 'delivered'
    },
    {
      id: 2,
      contact: 'Grace Wanjiku',
      number: '+254 722 987 654',
      lastMessage: 'Tunaweza kuongea kesho about the meeting?',
      timestamp: '2024-01-15 13:15',
      unread: 0,
      encrypted: true,
      location: 'Mombasa, Kenya',
      status: 'read'
    },
    {
      id: 3,
      contact: 'Society Group',
      number: 'Group Chat',
      lastMessage: 'Meeting imescheduled for 3 PM leo',
      timestamp: '2024-01-15 12:00',
      unread: 5,
      encrypted: true,
      location: 'Multiple',
      status: 'sent'
    },
    {
      id: 4,
      contact: 'Peter Kamau',
      number: '+254 733 210 987',
      lastMessage: 'Habari za kazi? How is everything going?',
      timestamp: '2024-01-15 10:45',
      unread: 1,
      encrypted: true,
      location: 'Eldoret, Kenya',
      status: 'delivered'
    },
    {
      id: 5,
      contact: 'Society Chairman',
      number: '+254 720 111 222',
      lastMessage: 'Security meeting tomorrow at 10 AM',
      timestamp: '2024-01-15 09:30',
      unread: 0,
      encrypted: true,
      location: 'Nakuru, Kenya',
      status: 'read'
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Mwangi',
      content: 'Habari yako? How are things going?',
      timestamp: '2024-01-15 14:25',
      type: 'received',
      encrypted: true,
      location: 'Nairobi, Kenya'
    },
    {
      id: 2,
      sender: 'Me',
      content: 'Poa sana! Everything is going well. Asante for checking in!',
      timestamp: '2024-01-15 14:27',
      type: 'sent',
      encrypted: true,
      location: 'Current Location'
    },
    {
      id: 3,
      sender: 'John Mwangi',
      content: 'Asante sana for the update. Everything looks good.',
      timestamp: '2024-01-15 14:30',
      type: 'received',
      encrypted: true,
      location: 'Nairobi, Kenya'
    },
  ]);

  const sendMessage = async () => {
    if (newMessage.trim() && selectedContact) {
      // For SMS sending, we'll use the device's SMS app
      const smsUrl = Platform.select({
        ios: `sms:${selectedContact.number.replace(/\s/g, '')}&body=${encodeURIComponent(newMessage)}`,
        android: `sms:${selectedContact.number.replace(/\s/g, '')}?body=${encodeURIComponent(newMessage)}`,
        default: `sms:${selectedContact.number.replace(/\s/g, '')}`
      });

      try {
        const canOpen = await Linking.canOpenURL(smsUrl);
        if (canOpen) {
          await Linking.openURL(smsUrl);
          
          // Add message to local history
          const message = {
            id: messages.length + 1,
            sender: 'Me',
            content: newMessage,
            timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
            type: 'sent' as const,
            encrypted: true,
            location: 'Current Location'
          };
          
          setMessages([...messages, message]);
          setNewMessage('');
          
          // Update conversation
          setConversations(prev => 
            prev.map(conv => 
              conv.id === selectedContact.id 
                ? { ...conv, lastMessage: newMessage, timestamp: message.timestamp }
                : conv
            )
          );
        } else {
          Alert.alert('Error', 'Unable to send SMS. Please check your device settings.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to send message');
      }
    }
  };

  const sendBulkMessage = () => {
    Alert.prompt(
      'Send Bulk Message to Society',
      'Enter message to send to all society members:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send to All', 
          onPress: async (message) => {
            if (message) {
              const societyNumbers = [
                '+254720111222',
                '+254722333444',
                '+254733555666',
                '+254711777888'
              ];
              
              const smsUrl = Platform.select({
                ios: `sms:${societyNumbers.join(',')}&body=${encodeURIComponent(message)}`,
                android: `sms:${societyNumbers.join(';')}?body=${encodeURIComponent(message)}`,
                default: `sms:${societyNumbers.join(',')}`
              });

              try {
                const canOpen = await Linking.canOpenURL(smsUrl);
                if (canOpen) {
                  await Linking.openURL(smsUrl);
                  Alert.alert('Success', 'Bulk message sent to society members');
                } else {
                  Alert.alert('Error', 'Unable to send bulk SMS');
                }
              } catch (error) {
                Alert.alert('Error', 'Failed to send bulk message');
              }
            }
          }
        }
      ],
      'plain-text',
      'Society meeting reminder...'
    );
  };

  const addNewContact = () => {
    Alert.prompt(
      'Send Message to New Contact',
      'Enter phone number (Kenyan format: +254 7XX XXX XXX)',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: (phoneNumber) => {
            if (phoneNumber) {
              // Validate Kenyan phone number format
              const kenyanNumberRegex = /^(\+254|0)[17]\d{8}$/;
              const cleanNumber = phoneNumber.replace(/\s/g, '');
              
              if (kenyanNumberRegex.test(cleanNumber)) {
                const formattedNumber = cleanNumber.startsWith('+254') 
                  ? cleanNumber.replace(/(\+254)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')
                  : cleanNumber.replace(/^0/, '+254 ').replace(/(\+254)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
                
                const newContact = {
                  id: conversations.length + 1,
                  contact: 'New Contact',
                  number: formattedNumber,
                  lastMessage: '',
                  timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
                  unread: 0,
                  encrypted: true,
                  location: 'Unknown',
                  status: 'new'
                };
                
                setConversations(prev => [newContact, ...prev]);
                setSelectedContact(newContact);
              } else {
                Alert.alert('Invalid Number', 'Please enter a valid Kenyan phone number');
              }
            }
          }
        }
      ],
      'plain-text',
      '+254 7'
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={12} color="#10B981" />;
      case 'read':
        return <CheckCircle size={12} color="#2563EB" />;
      case 'sent':
        return <Clock size={12} color="#F59E0B" />;
      case 'flagged':
        return <AlertCircle size={12} color="#EF4444" />;
      default:
        return <Clock size={12} color="#64748B" />;
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.number.includes(searchQuery)
  );

  const ConversationItem = ({ conversation }: any) => (
    <TouchableOpacity
      style={[
        styles.conversationItem,
        selectedContact?.id === conversation.id && styles.selectedConversation
      ]}
      onPress={() => setSelectedContact(conversation)}
    >
      <View style={styles.conversationIcon}>
        <MessageCircle size={20} color="#2563EB" />
      </View>
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationContact}>{conversation.contact}</Text>
          <Text style={styles.conversationTime}>
            {conversation.timestamp.split(' ')[1]}
          </Text>
        </View>
        <Text style={styles.conversationMessage} numberOfLines={1}>
          {conversation.lastMessage}
        </Text>
        <View style={styles.conversationFooter}>
          <View style={styles.conversationDetails}>
            <MapPin size={10} color="#94A3B8" />
            <Text style={styles.conversationLocation}>{conversation.location}</Text>
          </View>
          <View style={styles.conversationStatus}>
            {conversation.encrypted && (
              <Lock size={10} color="#10B981" />
            )}
            {getStatusIcon(conversation.status)}
            {conversation.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{conversation.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const MessageItem = ({ message }: any) => (
    <View style={[
      styles.messageItem,
      message.type === 'sent' ? styles.sentMessage : styles.receivedMessage
    ]}>
      <View style={[
        styles.messageContent,
        message.type === 'sent' ? styles.sentMessageContent : styles.receivedMessageContent
      ]}>
        <Text style={[
          styles.messageText,
          message.type === 'sent' ? styles.sentMessageText : styles.receivedMessageText
        ]}>
          {message.content}
        </Text>
        <View style={styles.messageFooter}>
          <Text style={[
            styles.messageTime,
            message.type === 'sent' ? styles.sentMessageTime : styles.receivedMessageTime
          ]}>
            {message.timestamp.split(' ')[1]}
          </Text>
          {message.encrypted && (
            <Lock size={10} color={message.type === 'sent' ? '#FFFFFF' : '#10B981'} />
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Secure Messages</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.bulkButton} onPress={sendBulkMessage}>
            <Users size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={addNewContact}>
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.conversationsList}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search conversations..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <ScrollView style={styles.conversations} showsVerticalScrollIndicator={false}>
            {filteredConversations.map((conversation) => (
              <ConversationItem key={conversation.id} conversation={conversation} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.chatArea}>
          {selectedContact ? (
            <>
              <View style={styles.chatHeader}>
                <Text style={styles.chatTitle}>{selectedContact.contact}</Text>
                <Text style={styles.chatSubtitle}>{selectedContact.number}</Text>
              </View>
              
              <ScrollView style={styles.messagesList} showsVerticalScrollIndicator={false}>
                {messages.map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}
              </ScrollView>
              
              <View style={styles.messageInput}>
                <TextInput
                  style={styles.messageTextInput}
                  placeholder="Type a secure message..."
                  placeholderTextColor="#64748B"
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={sendMessage}
                >
                  <Send size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.emptyChat}>
              <MessageCircle size={48} color="#64748B" />
              <Text style={styles.emptyChatText}>Select a conversation</Text>
              <Text style={styles.emptyChatSubtext}>
                Choose a contact to start secure messaging
              </Text>
              <TouchableOpacity style={styles.startChatButton} onPress={addNewContact}>
                <Plus size={20} color="#FFFFFF" />
                <Text style={styles.startChatText}>Start New Chat</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  bulkButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  conversationsList: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#334155',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  conversations: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  selectedConversation: {
    backgroundColor: '#1E293B',
  },
  conversationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversationContent: {
    flex: 1,
    marginLeft: 12,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationContact: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  conversationTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  conversationMessage: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationLocation: {
    fontSize: 10,
    color: '#94A3B8',
    marginLeft: 4,
  },
  conversationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
  },
  unreadText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  chatArea: {
    flex: 2,
  },
  chatHeader: {
    padding: 16,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  chatSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 2,
  },
  messagesList: {
    flex: 1,
    padding: 16,
  },
  messageItem: {
    marginBottom: 16,
  },
  sentMessage: {
    alignItems: 'flex-end',
  },
  receivedMessage: {
    alignItems: 'flex-start',
  },
  messageContent: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
  },
  sentMessageContent: {
    backgroundColor: '#2563EB',
  },
  receivedMessageContent: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  sentMessageText: {
    color: '#FFFFFF',
  },
  receivedMessageText: {
    color: '#FFFFFF',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 4,
  },
  messageTime: {
    fontSize: 12,
  },
  sentMessageTime: {
    color: '#BFDBFE',
  },
  receivedMessageTime: {
    color: '#94A3B8',
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  messageTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyChatText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyChatSubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 24,
  },
  startChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  startChatText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});