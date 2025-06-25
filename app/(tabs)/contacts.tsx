import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, User, Plus, Search, Phone, MessageCircle, MapPin, Shield, UserPlus, CreditCard as Edit3, Trash2, Lock } from 'lucide-react-native';

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [showAddContact, setShowAddContact] = useState(false);
  
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      group: 'society',
      location: 'New York, NY',
      encrypted: true,
      lastContact: '2024-01-15 14:30',
      status: 'active',
      callCount: 23,
      messageCount: 45
    },
    {
      id: 2,
      name: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      email: 'jane.smith@email.com',
      group: 'society',
      location: 'Los Angeles, CA',
      encrypted: true,
      lastContact: '2024-01-15 13:15',
      status: 'active',
      callCount: 15,
      messageCount: 32
    },
    {
      id: 3,
      name: 'Mike Johnson',
      phone: '+1 (555) 321-0987',
      email: 'mike.johnson@email.com',
      group: 'family',
      location: 'Houston, TX',
      encrypted: true,
      lastContact: '2024-01-15 10:45',
      status: 'active',
      callCount: 67,
      messageCount: 123
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      phone: '+1 (555) 654-3210',
      email: 'sarah.wilson@email.com',
      group: 'work',
      location: 'Chicago, IL',
      encrypted: false,
      lastContact: '2024-01-14 16:20',
      status: 'inactive',
      callCount: 8,
      messageCount: 12
    },
    {
      id: 5,
      name: 'Community Center',
      phone: '+1 (555) 111-2222',
      email: 'info@community.org',
      group: 'society',
      location: 'Main Street',
      encrypted: true,
      lastContact: '2024-01-15 09:00',
      status: 'active',
      callCount: 5,
      messageCount: 18
    },
  ]);

  const groups = [
    { id: 'all', name: 'All Contacts', count: contacts.length },
    { id: 'society', name: 'Society', count: contacts.filter(c => c.group === 'society').length },
    { id: 'family', name: 'Family', count: contacts.filter(c => c.group === 'family').length },
    { id: 'work', name: 'Work', count: contacts.filter(c => c.group === 'work').length },
  ];

  const makeCall = (contact: any) => {
    Alert.alert(
      'Make Call',
      `Call ${contact.name} at ${contact.phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling:', contact.name) }
      ]
    );
  };

  const sendMessage = (contact: any) => {
    Alert.alert(
      'Send Message',
      `Send encrypted message to ${contact.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Message', onPress: () => console.log('Messaging:', contact.name) }
      ]
    );
  };

  const editContact = (contact: any) => {
    Alert.alert('Edit Contact', `Edit ${contact.name}?`);
  };

  const deleteContact = (contactId: number) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setContacts(prev => prev.filter(c => c.id !== contactId))
        }
      ]
    );
  };

  const addContact = () => {
    Alert.alert(
      'Add Contact',
      'Contact form would open here',
      [{ text: 'OK' }]
    );
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.phone.includes(searchQuery) ||
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || contact.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const ContactItem = ({ contact }: any) => (
    <View style={styles.contactItem}>
      <View style={styles.contactIcon}>
        <User size={20} color="#2563EB" />
      </View>
      <View style={styles.contactContent}>
        <View style={styles.contactHeader}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <View style={styles.contactActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => makeCall(contact)}
            >
              <Phone size={16} color="#10B981" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => sendMessage(contact)}
            >
              <MessageCircle size={16} color="#2563EB" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => editContact(contact)}
            >
              <Edit3 size={16} color="#F59E0B" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => deleteContact(contact.id)}
            >
              <Trash2 size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.contactPhone}>{contact.phone}</Text>
        <Text style={styles.contactEmail}>{contact.email}</Text>
        
        <View style={styles.contactDetails}>
          <View style={styles.contactDetail}>
            <MapPin size={12} color="#94A3B8" />
            <Text style={styles.contactDetailText}>{contact.location}</Text>
          </View>
          <View style={styles.contactDetail}>
            <Text style={styles.contactDetailText}>
              {contact.callCount} calls • {contact.messageCount} messages
            </Text>
          </View>
        </View>
        
        <View style={styles.contactFooter}>
          <View style={styles.contactBadges}>
            <View style={[styles.groupBadge, { backgroundColor: 
              contact.group === 'society' ? '#2563EB' :
              contact.group === 'family' ? '#10B981' :
              contact.group === 'work' ? '#F59E0B' : '#64748B'
            }]}>
              <Text style={styles.groupBadgeText}>{contact.group}</Text>
            </View>
            {contact.encrypted && (
              <View style={styles.encryptedBadge}>
                <Lock size={10} color="#10B981" />
                <Text style={styles.encryptedText}>Encrypted</Text>
              </View>
            )}
          </View>
          <View style={[styles.statusBadge, { backgroundColor: 
            contact.status === 'active' ? '#10B981' : '#64748B'
          }]}>
            <Text style={styles.statusText}>{contact.status}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contact Management</Text>
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts..."
            placeholderTextColor="#64748B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView 
          horizontal 
          style={styles.groupsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {groups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={[
                styles.groupButton,
                selectedGroup === group.id && styles.activeGroupButton
              ]}
              onPress={() => setSelectedGroup(group.id)}
            >
              <Text style={[
                styles.groupText,
                selectedGroup === group.id && styles.activeGroupText
              ]}>
                {group.name} ({group.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Users size={16} color="#2563EB" />
          <Text style={styles.statText}>{filteredContacts.length} contacts</Text>
        </View>
        <View style={styles.stat}>
          <Shield size={16} color="#10B981" />
          <Text style={styles.statText}>
            {filteredContacts.filter(c => c.encrypted).length} encrypted
          </Text>
        </View>
        <View style={styles.stat}>
          <User size={16} color="#F59E0B" />
          <Text style={styles.statText}>
            {filteredContacts.filter(c => c.status === 'active').length} active
          </Text>
        </View>
      </View>

      <ScrollView style={styles.contactsList} showsVerticalScrollIndicator={false}>
        {filteredContacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
        
        {filteredContacts.length === 0 && (
          <View style={styles.emptyState}>
            <Users size={48} color="#64748B" />
            <Text style={styles.emptyText}>No contacts found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or filter criteria
            </Text>
            <TouchableOpacity style={styles.emptyButton} onPress={addContact}>
              <UserPlus size={20} color="#FFFFFF" />
              <Text style={styles.emptyButtonText}>Add Contact</Text>
            </TouchableOpacity>
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563EB',
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
  groupsContainer: {
    flexDirection: 'row',
  },
  groupButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activeGroupButton: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  groupText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  activeGroupText: {
    color: '#FFFFFF',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1E293B',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
  },
  contactsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  contactContent: {
    flex: 1,
    marginLeft: 12,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactPhone: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  contactEmail: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 12,
  },
  contactDetails: {
    marginBottom: 12,
  },
  contactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactDetailText: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
  },
  contactFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  groupBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  groupBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  encryptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#10B981',
    borderRadius: 6,
  },
  encryptedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
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
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});