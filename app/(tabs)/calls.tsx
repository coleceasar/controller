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
  Plus,
  Globe,
  Wifi,
  Shield
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
      location: 'Nairobi CBD, Kenya',
      ipAddress: '196.201.214.10',
      carrier: 'Safaricom',
      encrypted: true,
      status: 'answered',
      recorded: true
    },
    {
      id: 2,
      contact: 'Grace Wanjiku',
      number: '+254 722 987 654',
      type: 'outgoing',
      duration: '02:45',
      timestamp: '2024-01-15 13:15',
      location: 'Mombasa Old Town, Kenya',
      ipAddress: '196.201.214.25',
      carrier: 'Airtel Kenya',
      encrypted: true,
      status: 'answered',
      recorded: true
    },
    {
      id: 3,
      contact: 'Unknown Caller',
      number: '+254 701 456 789',
      type: 'missed',
      duration: '00:00',
      timestamp: '2024-01-15 12:00',
      location: 'Kisumu City, Kenya',
      ipAddress: '196.201.214.45',
      carrier: 'Telkom Kenya',
      encrypted: false,
      status: 'missed',
      recorded: false,
      flagged: true
    },
    {
      id: 4,
      contact: 'Peter Kamau',
      number: '+254 733 210 987',
      type: 'incoming',
      duration: '08:15',
      timestamp: '2024-01-15 10:45',
      location: 'Eldoret Town, Kenya',
      ipAddress: '196.201.214.67',
      carrier: 'Safaricom',
      encrypted: true,
      status: 'answered',
      recorded: true
    },
    {
      id: 5,
      contact: 'Society Chairman',
      number: '+254 720 111 222',
      type: 'outgoing',
      duration: '12:30',
      timestamp: '2024-01-15 09:30',
      location: 'Nakuru City, Kenya',
      ipAddress: '196.201.214.89',
      carrier: 'Safaricom',
      encrypted: true,
      status: 'answered',
      recorded: true
    },
  ]);

  const interceptCall = (number: string, contact: string) => {
    Alert.alert(
      'Call Interception',
      `Intercept call from ${contact} (${number})?\n\nThis will:\n• Record the conversation\n• Track location in real-time\n• Monitor network activity\n• Log all metadata`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Intercept', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Call Intercepted', `Now monitoring call from ${contact}. All data is being recorded and analyzed.`);
            // Add intercepted call to history
            const newCall = {
              id: callHistory.length + 1,
              contact: contact,
              number: number,
              type: 'intercepted' as const,
              duration: '00:00',
              timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
              location: 'Tracking...',
              ipAddress: 'Resolving...',
              carrier: 'Detecting...',
              encrypted: true,
              status: 'monitoring' as const,
              recorded: true
            };
            setCallHistory(prev => [newCall, ...prev]);
          }
        }
      ]
    );
  };

  const trackNumber = () => {
    Alert.prompt(
      'Track Phone Number',
      'Enter Kenyan phone number to track (+254 format):',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Track', 
          onPress: (phoneNumber) => {
            if (phoneNumber) {
              // Validate Kenyan phone number format
              const kenyanNumberRegex = /^(\+254|0)[17]\d{8}$/;
              const cleanNumber = phoneNumber.replace(/\s/g, '');
              
              if (kenyanNumberRegex.test(cleanNumber)) {
                const formattedNumber = cleanNumber.startsWith('+254') 
                  ? cleanNumber.replace(/(\+254)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')
                  : cleanNumber.replace(/^0/, '+254 ').replace(/(\+254)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
                
                // Simulate tracking results
                const mockLocation = ['Nairobi CBD', 'Mombasa Island', 'Kisumu Central', 'Eldoret Town', 'Nakuru City'][Math.floor(Math.random() * 5)];
                const mockIP = `196.201.214.${Math.floor(Math.random() * 255)}`;
                const mockCarrier = ['Safaricom', 'Airtel Kenya', 'Telkom Kenya'][Math.floor(Math.random() * 3)];
                
                Alert.alert(
                  'Phone Tracking Results',
                  `📱 Number: ${formattedNumber}\n📍 Location: ${mockLocation}, Kenya\n🌐 IP Address: ${mockIP}\n📡 Carrier: ${mockCarrier}\n⏰ Last Active: ${new Date().toLocaleTimeString()}\n🔒 Status: Active\n\n⚠️ This is a demonstration. Real tracking requires authorization.`
                );
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

  const viewCallDetails = (call: any) => {
    Alert.alert(
      'Call Details',
      `Contact: ${call.contact}\nNumber: ${call.number}\nDuration: ${call.duration}\nLocation: ${call.location}\nIP Address: ${call.ipAddress}\nCarrier: ${call.carrier}\nTime: ${call.timestamp}\nEncrypted: ${call.encrypted ? 'Yes' : 'No'}\nRecorded: ${call.recorded ? 'Yes' : 'No'}${call.flagged ? '\n⚠️ FLAGGED AS SUSPICIOUS' : ''}`,
      [
        { text: 'OK' },
        { 
          text: 'Track Location', 
          onPress: () => Alert.alert('Location Tracking', `Tracking ${call.contact} in real-time...\n\nCurrent location: ${call.location}\nMovement: Stationary\nAccuracy: 5 meters`)
        },
        call.recorded && { 
          text: 'Play Recording', 
          onPress: () => Alert.alert('Call Recording', `Playing recorded call with ${call.contact}...\n\nDuration: ${call.duration}\nQuality: High\nTranscription: Available`)
        }
      ].filter(Boolean)
    );
  };

  const getCallIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming size={16} color="#10B981" />;
      case 'outgoing':
        return <PhoneOutgoing size={16} color="#2563EB" />;
      case 'missed':
        return <PhoneMissed size={16} color="#EF4444" />;
      case 'intercepted':
        return <Shield size={16} color="#8B5CF6" />;
      default:
        return <Phone size={16} color="#64748B" />;
    }
  };

  const filteredCalls = callHistory.filter(call => {
    const matchesSearch = call.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         call.number.includes(searchQuery) ||
                         call.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || call.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const CallItem = ({ call }: any) => (
    <TouchableOpacity style={[styles.callItem, call.flagged && styles.flaggedCall]} onPress={() => viewCallDetails(call)}>
      <View style={styles.callIcon}>
        {getCallIcon(call.type)}
      </View>
      <View style={styles.callContent}>
        <View style={styles.callHeader}>
          <Text style={styles.callContact}>{call.contact}</Text>
          <Text style={styles.callTime}>{call.timestamp.split(' ')[1]}</Text>
        </View>
        <Text style={styles.callNumber}>{call.number}</Text>
        <Text style={styles.callLocation}>📍 {call.location}</Text>
        <View style={styles.callDetails}>
          <View style={styles.callDetail}>
            <Clock size={12} color="#94A3B8" />
            <Text style={styles.callDetailText}>{call.duration}</Text>
          </View>
          <View style={styles.callDetail}>
            <Globe size={12} color="#94A3B8" />
            <Text style={styles.callDetailText}>{call.ipAddress}</Text>
          </View>
          <View style={styles.callDetail}>
            <Wifi size={12} color="#94A3B8" />
            <Text style={styles.callDetailText}>{call.carrier}</Text>
          </View>
          {call.encrypted && (
            <View style={styles.encryptedBadge}>
              <Text style={styles.encryptedText}>🔒</Text>
            </View>
          )}
          {call.recorded && (
            <View style={styles.recordedBadge}>
              <Text style={styles.recordedText}>🎙️</Text>
            </View>
          )}
          {call.flagged && (
            <View style={styles.flaggedBadge}>
              <Text style={styles.flaggedText}>⚠️</Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity 
        style={styles.interceptButton}
        onPress={() => interceptCall(call.number, call.contact)}
      >
        <Shield size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Call Monitoring & Interception</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.trackButton} onPress={trackNumber}>
            <MapPin size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search calls, numbers, locations, IPs..."
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
          {['all', 'incoming', 'outgoing', 'missed', 'intercepted'].map((type) => (
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
          onPress={trackNumber}
        >
          <Phone size={20} color="#FFFFFF" />
          <Text style={styles.quickActionText}>Track Number</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.quickActionButton, { backgroundColor: '#8B5CF6' }]}
          onPress={() => Alert.alert('Mass Surveillance', 'Activating mass call monitoring for all Kenya networks...')}
        >
          <Shield size={20} color="#FFFFFF" />
          <Text style={styles.quickActionText}>Mass Monitor</Text>
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

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚠️ Call interception requires legal authorization. This is a demonstration system.
        </Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  trackButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8B5CF6',
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
  flaggedCall: {
    borderColor: '#EF4444',
    borderWidth: 2,
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
    marginBottom: 4,
  },
  callLocation: {
    fontSize: 13,
    color: '#10B981',
    marginBottom: 8,
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  callDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  callDetailText: {
    fontSize: 11,
    color: '#94A3B8',
    marginLeft: 4,
  },
  encryptedBadge: {
    marginRight: 8,
  },
  encryptedText: {
    fontSize: 12,
  },
  recordedBadge: {
    marginRight: 8,
  },
  recordedText: {
    fontSize: 12,
  },
  flaggedBadge: {
    marginRight: 8,
  },
  flaggedText: {
    fontSize: 12,
  },
  interceptButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8B5CF6',
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
  disclaimer: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#FECACA',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#991B1B',
    textAlign: 'center',
  },
});