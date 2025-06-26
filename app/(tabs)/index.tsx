import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, Phone, MessageCircle, Users, MapPin, Eye, Lock, Activity, TriangleAlert as AlertTriangle, Zap, RefreshCw, Search, Globe, Wifi } from 'lucide-react-native';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCalls: 47,
    totalMessages: 123,
    totalContacts: 28,
    activeLocations: 12,
    securityLevel: 'High',
    encryptionStatus: 'Active',
    networkConnections: 156,
    ipAddressesTracked: 89
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [trackingMode, setTrackingMode] = useState('standard'); // standard, enhanced, emergency

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'call', contact: 'John Mwangi', time: '2 min ago', status: 'incoming', location: 'Nairobi CBD', ip: '196.201.214.10' },
    { id: 2, type: 'message', contact: 'Grace Wanjiku', time: '5 min ago', status: 'outgoing', location: 'Mombasa Old Town', ip: '196.201.214.25' },
    { id: 3, type: 'location', contact: 'Society Chairman', time: '10 min ago', status: 'tracked', location: 'Nakuru Town', ip: '196.201.214.45' },
    { id: 4, type: 'network', contact: 'Unknown Device', time: '15 min ago', status: 'detected', location: 'Eldoret', ip: '196.201.214.67' },
  ]);

  const [networkDevices, setNetworkDevices] = useState([
    { id: 1, ip: '196.201.214.10', location: 'Nairobi CBD', device: 'Samsung Galaxy S21', carrier: 'Safaricom', status: 'active' },
    { id: 2, ip: '196.201.214.25', location: 'Mombasa', device: 'iPhone 13', carrier: 'Airtel', status: 'active' },
    { id: 3, ip: '196.201.214.45', location: 'Nakuru', device: 'Huawei P30', carrier: 'Telkom', status: 'inactive' },
    { id: 4, ip: '196.201.214.67', location: 'Eldoret', device: 'Oppo A74', carrier: 'Safaricom', status: 'monitoring' },
  ]);

  const [securityAlerts, setSecurityAlerts] = useState([
    { id: 1, type: 'warning', message: 'Unusual network activity detected from IP 196.201.214.89', time: '1 hour ago', severity: 'high' },
    { id: 2, type: 'info', message: 'New device connected to monitoring network', time: '2 hours ago', severity: 'medium' },
    { id: 3, type: 'success', message: 'Location tracking activated for 15 new contacts', time: '3 hours ago', severity: 'low' },
    { id: 4, type: 'critical', message: 'Potential security breach detected - Enhanced monitoring activated', time: '4 hours ago', severity: 'critical' },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalCalls: prev.totalCalls + Math.floor(Math.random() * 2),
        totalMessages: prev.totalMessages + Math.floor(Math.random() * 3),
        networkConnections: prev.networkConnections + Math.floor(Math.random() * 5),
        ipAddressesTracked: prev.ipAddressesTracked + Math.floor(Math.random() * 2),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergencyMode = () => {
    Alert.alert(
      'Emergency Tracking Mode',
      'This will activate maximum surveillance protocols:\n\n• Enhanced location tracking\n• Network monitoring\n• IP address scanning\n• Real-time alerts\n\nContinue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Activate', 
          style: 'destructive',
          onPress: () => {
            setTrackingMode('emergency');
            Alert.alert('Emergency Mode Activated', 'Maximum surveillance protocols are now active. All network activity is being monitored.');
          }
        }
      ]
    );
  };

  const trackPhoneNumber = () => {
    Alert.prompt(
      'Track Phone Number',
      'Enter Kenyan phone number to track (+254 format):',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Track', 
          onPress: (phoneNumber) => {
            if (phoneNumber) {
              // Simulate tracking
              const mockLocation = ['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret', 'Nakuru'][Math.floor(Math.random() * 5)];
              const mockIP = `196.201.214.${Math.floor(Math.random() * 255)}`;
              
              Alert.alert(
                'Tracking Results',
                `Phone: ${phoneNumber}\nLocation: ${mockLocation}, Kenya\nIP Address: ${mockIP}\nCarrier: Safaricom\nStatus: Active\n\nNote: This is a demonstration. Real tracking requires proper authorization.`
              );
            }
          }
        }
      ],
      'plain-text',
      '+254 7'
    );
  };

  const trackIPAddress = () => {
    Alert.prompt(
      'Track IP Address',
      'Enter IP address to locate:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Track', 
          onPress: (ipAddress) => {
            if (ipAddress) {
              // Simulate IP tracking
              const mockLocation = ['Nairobi CBD', 'Mombasa Island', 'Kisumu Central', 'Eldoret Town', 'Nakuru City'][Math.floor(Math.random() * 5)];
              const mockISP = ['Safaricom', 'Airtel Kenya', 'Telkom Kenya', 'Jamii Telecommunications'][Math.floor(Math.random() * 4)];
              
              Alert.alert(
                'IP Location Results',
                `IP: ${ipAddress}\nLocation: ${mockLocation}, Kenya\nISP: ${mockISP}\nCountry: Kenya\nRegion: ${mockLocation.split(' ')[0]}\n\nNote: This is a demonstration of IP geolocation.`
              );
            }
          }
        }
      ],
      'plain-text',
      '196.201.214.'
    );
  };

  const StatCard = ({ icon: Icon, title, value, color, onPress }: any) => (
    <TouchableOpacity style={[styles.statCard, { borderLeftColor: color }]} onPress={onPress}>
      <View style={styles.statContent}>
        <Icon size={20} color={color} />
        <View style={styles.statText}>
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ActivityItem = ({ item }: any) => (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        {item.type === 'call' && <Phone size={16} color="#2563EB" />}
        {item.type === 'message' && <MessageCircle size={16} color="#10B981" />}
        {item.type === 'location' && <MapPin size={16} color="#F59E0B" />}
        {item.type === 'network' && <Wifi size={16} color="#8B5CF6" />}
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityContact}>{item.contact}</Text>
        <Text style={styles.activityLocation}>{item.location}</Text>
        <Text style={styles.activityIP}>IP: {item.ip}</Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
      <View style={[styles.activityStatus, { backgroundColor: 
        item.status === 'incoming' ? '#10B981' :
        item.status === 'outgoing' ? '#2563EB' :
        item.status === 'tracked' ? '#F59E0B' :
        item.status === 'detected' ? '#8B5CF6' : '#EF4444'
      }]}>
        <Text style={styles.activityStatusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Kenya Communication Control Center</Text>
            <Text style={styles.subtitle}>Advanced Surveillance & Tracking System</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.trackButton} onPress={trackPhoneNumber}>
              <Phone size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ipButton} onPress={trackIPAddress}>
              <Globe size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyMode}>
              <AlertTriangle size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search phone numbers, IPs, or locations..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Overview</Text>
          <View style={styles.statsGrid}>
            <StatCard 
              icon={Phone} 
              title="Total Calls" 
              value={stats.totalCalls} 
              color="#2563EB"
              onPress={() => Alert.alert('Call Analytics', `${stats.totalCalls} calls monitored\n• Incoming: 28\n• Outgoing: 15\n• Intercepted: 4`)}
            />
            <StatCard 
              icon={MessageCircle} 
              title="Messages" 
              value={stats.totalMessages} 
              color="#10B981"
              onPress={() => Alert.alert('Message Analytics', `${stats.totalMessages} messages tracked\n• Sent: 67\n• Received: 56\n• Encrypted: 100%`)}
            />
            <StatCard 
              icon={MapPin} 
              title="Locations" 
              value={stats.activeLocations} 
              color="#F59E0B"
              onPress={() => Alert.alert('Location Analytics', `${stats.activeLocations} locations tracked\n• Nairobi: 5\n• Mombasa: 3\n• Other: 4`)}
            />
            <StatCard 
              icon={Wifi} 
              title="Network IPs" 
              value={stats.ipAddressesTracked} 
              color="#8B5CF6"
              onPress={() => Alert.alert('Network Analytics', `${stats.ipAddressesTracked} IP addresses tracked\n• Active: 45\n• Monitoring: 32\n• Blocked: 12`)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tracking Controls</Text>
          <View style={styles.controlsGrid}>
            <TouchableOpacity style={styles.controlButton} onPress={trackPhoneNumber}>
              <Phone size={24} color="#FFFFFF" />
              <Text style={styles.controlButtonText}>Track Phone</Text>
              <Text style={styles.controlButtonSubtext}>Locate any Kenyan number</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={trackIPAddress}>
              <Globe size={24} color="#FFFFFF" />
              <Text style={styles.controlButtonText}>Track IP</Text>
              <Text style={styles.controlButtonSubtext}>Geolocate IP addresses</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.controlButton, { backgroundColor: trackingMode === 'emergency' ? '#EF4444' : '#F59E0B' }]}
              onPress={() => setTrackingMode(trackingMode === 'emergency' ? 'standard' : 'enhanced')}
            >
              <Eye size={24} color="#FFFFFF" />
              <Text style={styles.controlButtonText}>
                {trackingMode === 'emergency' ? 'Emergency' : trackingMode === 'enhanced' ? 'Enhanced' : 'Standard'}
              </Text>
              <Text style={styles.controlButtonSubtext}>Surveillance mode</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Network Devices</Text>
          <View style={styles.devicesList}>
            {networkDevices.map((device) => (
              <TouchableOpacity key={device.id} style={styles.deviceItem}>
                <View style={styles.deviceIcon}>
                  <Wifi size={20} color="#8B5CF6" />
                </View>
                <View style={styles.deviceContent}>
                  <Text style={styles.deviceIP}>{device.ip}</Text>
                  <Text style={styles.deviceLocation}>{device.location}</Text>
                  <Text style={styles.deviceInfo}>{device.device} • {device.carrier}</Text>
                </View>
                <View style={[styles.deviceStatus, { backgroundColor: 
                  device.status === 'active' ? '#10B981' :
                  device.status === 'monitoring' ? '#F59E0B' : '#64748B'
                }]}>
                  <Text style={styles.deviceStatusText}>{device.status}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {recentActivity.map((item) => (
              <ActivityItem key={item.id} item={item} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Alerts</Text>
          <View style={styles.alertsList}>
            {securityAlerts.map((alert) => (
              <View key={alert.id} style={[styles.alertItem, {
                borderLeftColor: alert.severity === 'critical' ? '#EF4444' :
                                alert.severity === 'high' ? '#F59E0B' :
                                alert.severity === 'medium' ? '#2563EB' : '#10B981'
              }]}>
                <View style={styles.alertIcon}>
                  <AlertTriangle 
                    size={16} 
                    color={
                      alert.severity === 'critical' ? '#EF4444' :
                      alert.severity === 'high' ? '#F59E0B' :
                      alert.severity === 'medium' ? '#2563EB' : '#10B981'
                    } 
                  />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  <Text style={styles.alertTime}>{alert.time}</Text>
                </View>
                <View style={[styles.alertSeverity, { backgroundColor:
                  alert.severity === 'critical' ? '#EF4444' :
                  alert.severity === 'high' ? '#F59E0B' :
                  alert.severity === 'medium' ? '#2563EB' : '#10B981'
                }]}>
                  <Text style={styles.alertSeverityText}>{alert.severity}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>⚠️ Legal Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            This system is for demonstration purposes only. Real-world implementation requires:
            {'\n'}• Proper legal authorization
            {'\n'}• Compliance with telecommunications laws
            {'\n'}• User consent for tracking
            {'\n'}• Government/law enforcement approval
            {'\n\n'}Unauthorized surveillance is illegal and punishable by law.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollView: {
    flex: 1,
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
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  trackButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  ipButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emergencyButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
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
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    borderLeftWidth: 4,
    borderColor: '#334155',
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statTitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  controlsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  controlButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 8,
  },
  controlButtonSubtext: {
    color: '#BFDBFE',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  devicesList: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceContent: {
    flex: 1,
    marginLeft: 12,
  },
  deviceIP: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deviceLocation: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 2,
  },
  deviceInfo: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  deviceStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  deviceStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityList: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityContact: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityLocation: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  activityIP: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  activityTime: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  activityStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activityStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  alertsList: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    borderLeftWidth: 4,
    paddingLeft: 12,
  },
  alertIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContent: {
    flex: 1,
    marginLeft: 12,
  },
  alertMessage: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  alertTime: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  alertSeverity: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  alertSeverityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  disclaimer: {
    margin: 20,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#991B1B',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#7F1D1D',
    lineHeight: 20,
  },
});