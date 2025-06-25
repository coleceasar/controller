import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Phone, 
  PhoneCall, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed,
  Search,
  Filter,
  MapPin,
  Clock,
  User,
  Plus
} from 'lucide-react-native';

export default function Calls() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [callHistory, setCallHistory] = useState([
    {
      id: 1,
      contact: 'John Mwangi',
      number: '+254 712 345 678',
      type: 'incoming',
      duration: '05:23',
      timestamp: '2024-01-15 14:30',
      location: 'Nairobi, Kenya',
      encrypted: true,
      status: 'answered'
    },
    {
      id: 2,
      contact: 'Grace Wanjiku',
      number: '+254 722 987 654',
      type: 'outgoing',
      duration: '02:45',
      timestamp: '2024-01-15 13:15',
      location: 'Mombasa, Kenya',
      encrypted: true,
      status: 'answered'
    },
    {
      id: 3,
      contact: 'Unknown',
      number: '+254 701 456 789',
      type: 'missed',
      duration: '00:00',
      timestamp: '2024-01-15 12:00',
      location: 'Kisumu, Kenya',
      encrypted: false,
      status: 'missed'
    },
    {
      id: 4,
      contact: 'Peter Kamau',
      number: '+254 733 210 987',
      type: 'incoming',
      duration: '08:15',
      timestamp: '2024-01-15 10:45',
      location: 'Eldoret, Kenya',
      encrypted: true,
      status: 'answered'
    },
    {
      id: 5,
      contact: 'Society Chairman',
      number: '+254 720 111 222',
      type: 'outgoing',
      duration: '12:30',
      timestamp: '2024-01-15 09:30',
      location: 'Nakuru, Kenya',
      encrypted: true,
      status: 'answered'
    },
  ]);

  const makeCall = async (number: string, contact: string) => {
    try {
      // Remove spaces and format number for calling
      const cleanNumber = number.replace(/\s/g, '');
      const callUrl = `tel:${cleanNumber}`;
      
      Alert.alert(
        'Make Call',
        `Call ${contact} at ${number}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Call', 
            onPress: async () => {
              const canOpen = await Linking.canOpenURL(callUrl);
              if (canOpen) {
                await Linking.openURL(callUrl);
                // Add to call history
                const newCall = {
                  id: callHistory.length + 1,
                  contact: contact,
                  number: number,
                  type: 'outgoing' as const,
                  duration: '00:00',
                  timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
                  location: 'Current Location',
                  encrypted: true,
                  status: 'calling' as const
                };
                setCallHistory(prev => [newCall, ...prev]);
              } else {
                Alert.alert('Error', 'Unable to make call. Please check your device settings.');
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to initiate call');
    }
  };

  const addNewContact = () => {
    Alert.prompt(
      'Add New Contact',
      'Enter phone number (Kenyan format: +254 7XX XXX XXX)',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add & Call', 
          onPress: (phoneNumber) => {
            if (phoneNumber) {
              // Validate Kenyan phone number format
              const kenyanNumberRegex = /^(\+254|0)[17]\d{8}$/;
              const cleanNumber = phoneNumber.replace(/\s/g, '');
              
              if (kenyanNumberRegex.test(cleanNumber)) {
                const formattedNumber = cleanNumber.startsWith('+254') 
                  ? cleanNumber.replace(/(\+254)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')
                  : cleanNumber.replace(/^0/, '+254 ').replace(/(\+254)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
                
                makeCall(formattedNumber, 'New Contact');
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

  const viewLocation = (location: string) => {
    Alert.alert('Location Details', `Call originated from: ${location}`);
  };

  const getCallIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming size={16} color="#10B981" />;
      case 'outgoing':
        return <PhoneOutgoing size={16} color="#2563EB" />;
      case 'missed':
        return <PhoneMissed size={16} color="#EF4444" />;
      default:
        return <Phone size={16} color="#64748B" />;
    }
  };

  const filteredCalls = callHistory.filter(call => {
    const matchesSearch = call.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         call.number.includes(searchQuery);
    const matchesFilter = filterType === 'all' || call.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const CallItem = ({ call }: any) => (
    <View style={styles.callItem}>
      <View style={styles.callIcon}>
        {getCallIcon(call.type)}
      </View>
      <View style={styles.callContent}>
        <View style={styles.callHeader}>
          <Text style={styles.callContact}>{call.contact}</Text>
          <Text style={styles.callTime}>{call.timestamp.split(' ')[1]}</Text>
        </View>
        <Text style={styles.callNumber}>{call.number}</Text>
        <View style={styles.callDetails}>
          <View style={styles.callDetail}>
            <Clock size={12} color="#94A3B8" />
            <Text style={styles.callDetailText}>{call.duration}</Text>
          </View>
          <TouchableOpacity 
            style={styles.callDetail}
            onPress={() => viewLocation(call.location)}
          >
            <MapPin size={12} color="#94A3B8" />
            <Text style={styles.callDetailText}>{call.location}</Text>
          </TouchableOpacity>
          {call.encrypted && (
            <View style={styles.encryptedBadge}>
              <Text style={styles.encryptedText}>🔒</Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity 
        style={styles.callButton}
        onPress={() => makeCall(call.number, call.contact)}
      >
        <PhoneCall size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Call Management</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.addButton} onPress={addNewContact}>
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search calls..."
            placeholderTextColor="#64748B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView 
          horizontal 
          style={styles.filterContainer}
          showsHorizontalScrollIndicator={false}
        >
          {['all', 'incoming', 'outgoing', 'missed'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterButton,
                filterType === type && styles.activeFilterButton
              ]}
              onPress={() => setFilterType(type)}
            >
              <Text style={[
                styles.filterText,
                filterType === type && styles.activeFilterText
              ]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => makeCall('+254 720 111 222', 'Society Chairman')}
        >
          <Phone size={20} color="#FFFFFF" />
          <Text style={styles.quickActionText}>Call Chairman</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => makeCall('+254 722 333 444', 'Security Office')}
        >
          <Phone size={20} color="#FFFFFF" />
          <Text style={styles.quickActionText}>Security</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.callsList} showsVerticalScrollIndicator={false}>
        {filteredCalls.map((call) => (
          <CallItem key={call.id} call={call} />
        ))}
        
        {filteredCalls.length === 0 && (
          <View style={styles.emptyState}>
            <Phone size={48} color="#64748B" />
            <Text style={styles.emptyText}>No calls found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        )}
      </ScrollView>
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activeFilterButton: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  quickActionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  callsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  callIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callContent: {
    flex: 1,
    marginLeft: 12,
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  callContact: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  callTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  callNumber: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  callDetailText: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
  },
  encryptedBadge: {
    marginLeft: 'auto',
  },
  encryptedText: {
    fontSize: 12,
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 8,
    textAlign: 'center',
  },
});