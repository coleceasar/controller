import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, Phone, MessageCircle, Users, MapPin, Eye, Lock, Activity, TriangleAlert as AlertTriangle, Zap, RefreshCw } from 'lucide-react-native';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCalls: 47,
    totalMessages: 123,
    totalContacts: 28,
    activeLocations: 12,
    securityLevel: 'High',
    encryptionStatus: 'Active'
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'call', contact: 'John Mwangi', time: '2 min ago', status: 'incoming', location: 'Nairobi' },
    { id: 2, type: 'message', contact: 'Grace Wanjiku', time: '5 min ago', status: 'outgoing', location: 'Mombasa' },
    { id: 3, type: 'location', contact: 'Society Chairman', time: '10 min ago', status: 'tracked', location: 'Nakuru' },
    { id: 4, type: 'call', contact: 'Peter Kamau', time: '15 min ago', status: 'missed', location: 'Eldoret' },
  ]);

  const [securityAlerts, setSecurityAlerts] = useState([
    { id: 1, type: 'warning', message: 'Unusual activity detected from unknown number (+254 701 456 789)', time: '1 hour ago' },
    { id: 2, type: 'info', message: 'System backup completed successfully', time: '3 hours ago' },
    { id: 3, type: 'success', message: 'Location tracking activated for society members', time: '5 hours ago' },
  ]);

  const [systemStatus, setSystemStatus] = useState({
    callTracking: true,
    messageTracking: true,
    locationServices: true,
    encryption: true,
    lastUpdate: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalCalls: prev.totalCalls + Math.floor(Math.random() * 2),
        totalMessages: prev.totalMessages + Math.floor(Math.random() * 3),
      }));
      
      setSystemStatus(prev => ({
        ...prev,
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergencyMode = () => {
    Alert.alert(
      'Emergency Mode',
      'This will activate enhanced security protocols and location tracking for all society members. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Activate', 
          onPress: () => {
            Alert.alert('Emergency Mode Activated', 'All society members will be notified and tracking will be enhanced.');
            setSystemStatus(prev => ({ ...prev, emergencyMode: true }));
          }
        }
      ]
    );
  };

  const refreshData = () => {
    Alert.alert('Refreshing Data', 'System data has been updated');
    setSystemStatus(prev => ({
      ...prev,
      lastUpdate: new Date().toLocaleTimeString()
    }));
  };

  const viewSystemLogs = () => {
    Alert.alert(
      'System Logs',
      'Recent system activity:\n\n• Location services: Active\n• Call monitoring: 47 calls tracked\n• Message encryption: All messages secured\n• Last backup: 3 hours ago\n• Security status: All systems operational'
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
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityContact}>{item.contact}</Text>
        <Text style={styles.activityLocation}>{item.location}</Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
      <View style={[styles.activityStatus, { backgroundColor: 
        item.status === 'incoming' ? '#10B981' :
        item.status === 'outgoing' ? '#2563EB' :
        item.status === 'missed' ? '#EF4444' : '#F59E0B'
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
            <Text style={styles.title}>Communication Control Center</Text>
            <Text style={styles.subtitle}>Kenya Society Management System</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.refreshButton} onPress={refreshData}>
              <RefreshCw size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyMode}>
              <AlertTriangle size={20} color="#FFFFFF" />
            </TouchableOpacity>
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
              onPress={() => Alert.alert('Call Stats', `${stats.totalCalls} calls tracked\n• Incoming: 28\n• Outgoing: 15\n• Missed: 4`)}
            />
            <StatCard 
              icon={MessageCircle} 
              title="Messages" 
              value={stats.totalMessages} 
              color="#10B981"
              onPress={() => Alert.alert('Message Stats', `${stats.totalMessages} messages tracked\n• Sent: 67\n• Received: 56\n• Encrypted: 100%`)}
            />
            <StatCard 
              icon={Users} 
              title="Contacts" 
              value={stats.totalContacts} 
              color="#8B5CF6"
              onPress={() => Alert.alert('Contact Stats', `${stats.totalContacts} contacts managed\n• Society: 15\n• Family: 8\n• Work: 5`)}
            />
            <StatCard 
              icon={MapPin} 
              title="Locations" 
              value={stats.activeLocations} 
              color="#F59E0B"
              onPress={() => Alert.alert('Location Stats', `${stats.activeLocations} locations tracked\n• Nairobi: 5\n• Mombasa: 3\n• Other: 4`)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Status</Text>
          <View style={styles.statusCard}>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <Shield size={20} color="#10B981" />
                <Text style={styles.statusText}>Security Level: {stats.securityLevel}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: '#10B981' }]}>
                <Text style={styles.statusBadgeText}>ACTIVE</Text>
              </View>
            </View>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <Lock size={20} color="#2563EB" />
                <Text style={styles.statusText}>Encryption: {stats.encryptionStatus}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: '#2563EB' }]}>
                <Text style={styles.statusBadgeText}>ENABLED</Text>
              </View>
            </View>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <Activity size={20} color="#F59E0B" />
                <Text style={styles.statusText}>Last Update: {systemStatus.lastUpdate}</Text>
              </View>
              <TouchableOpacity 
                style={[styles.statusBadge, { backgroundColor: '#374151' }]}
                onPress={viewSystemLogs}
              >
                <Text style={styles.statusBadgeText}>VIEW LOGS</Text>
              </TouchableOpacity>
            </View>
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
              <View key={alert.id} style={styles.alertItem}>
                <View style={styles.alertIcon}>
                  <AlertTriangle 
                    size={16} 
                    color={
                      alert.type === 'warning' ? '#F59E0B' : 
                      alert.type === 'info' ? '#2563EB' : '#10B981'
                    } 
                  />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  <Text style={styles.alertTime}>{alert.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#2563EB' }]}
              onPress={() => Alert.alert('Emergency Call', 'This would initiate emergency protocols')}
            >
              <Phone size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Emergency Call</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#10B981' }]}
              onPress={() => Alert.alert('Bulk Message', 'This would send a message to all society members')}
            >
              <MessageCircle size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Bulk Message</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#F59E0B' }]}
              onPress={() => Alert.alert('Track All', 'This would activate tracking for all contacts')}
            >
              <MapPin size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Track All</Text>
            </TouchableOpacity>
          </View>
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
  refreshButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
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
  statusCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
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
  quickActions: {
    margin: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});