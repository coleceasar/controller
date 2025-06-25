import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings as SettingsIcon, Shield, Lock, Eye, Bell, Database, Smartphone, Key, Download, Trash2, CircleHelp as HelpCircle, LogOut, User, ChevronRight } from 'lucide-react-native';

export default function Settings() {
  const [settings, setSettings] = useState({
    encryption: true,
    locationTracking: true,
    callRecording: false,
    messageEncryption: true,
    notifications: true,
    autoBackup: true,
    biometricLock: false,
    anonymousMode: false,
    dataRetention: 30,
    emergencyMode: false
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const exportData = () => {
    Alert.alert(
      'Export Data',
      'Export all your communication data to a secure file?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Exporting data...') }
      ]
    );
  };

  const clearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your communication history, contacts, and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => console.log('Clearing data...')
        }
      ]
    );
  };

  const resetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Reset all settings to default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          onPress: () => {
            setSettings({
              encryption: true,
              locationTracking: true,
              callRecording: false,
              messageEncryption: true,
              notifications: true,
              autoBackup: true,
              biometricLock: false,
              anonymousMode: false,
              dataRetention: 30,
              emergencyMode: false
            });
          }
        }
      ]
    );
  };

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    value, 
    onPress, 
    showSwitch = false,
    showChevron = false,
    color = '#FFFFFF'
  }: any) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        <Icon size={20} color={color} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color }]}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      {showSwitch && (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: '#374151', true: '#2563EB' }}
          thumbColor={value ? '#FFFFFF' : '#9CA3AF'}
        />
      )}
      {showChevron && (
        <ChevronRight size={20} color="#64748B" />
      )}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: any) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
          <SettingsIcon size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Security & Privacy" />
        
        <SettingItem
          icon={Shield}
          title="End-to-End Encryption"
          description="Encrypt all communications and data"
          value={settings.encryption}
          onPress={() => toggleSetting('encryption')}
          showSwitch={true}
          color="#10B981"
        />
        
        <SettingItem
          icon={Lock}
          title="Biometric Lock"
          description="Use fingerprint or face ID to unlock app"
          value={settings.biometricLock}
          onPress={() => toggleSetting('biometricLock')}
          showSwitch={true}
        />
        
        <SettingItem
          icon={Eye}
          title="Anonymous Mode"
          description="Hide your identity in communications"
          value={settings.anonymousMode}
          onPress={() => toggleSetting('anonymousMode')}
          showSwitch={true}
          color="#F59E0B"
        />
        
        <SettingItem
          icon={Key}
          title="Encryption Keys"
          description="Manage your encryption keys"
          onPress={() => Alert.alert('Encryption Keys', 'Key management interface would open here')}
          showChevron={true}
        />

        <SectionHeader title="Communication" />
        
        <SettingItem
          icon={Smartphone}
          title="Location Tracking"
          description="Track location of incoming calls and messages"
          value={settings.locationTracking}
          onPress={() => toggleSetting('locationTracking')}
          showSwitch={true}
          color="#2563EB"
        />
        
        <SettingItem
          icon={Lock}
          title="Message Encryption"
          description="Encrypt all text messages"
          value={settings.messageEncryption}
          onPress={() => toggleSetting('messageEncryption')}
          showSwitch={true}
          color="#10B981"
        />
        
        <SettingItem
          icon={Smartphone}
          title="Call Recording"
          description="Record calls for security purposes"
          value={settings.callRecording}
          onPress={() => toggleSetting('callRecording')}
          showSwitch={true}
          color="#EF4444"
        />

        <SectionHeader title="Notifications" />
        
        <SettingItem
          icon={Bell}
          title="Push Notifications"
          description="Receive alerts for new communications"
          value={settings.notifications}
          onPress={() => toggleSetting('notifications')}
          showSwitch={true}
        />
        
        <SettingItem
          icon={Shield}
          title="Emergency Mode"
          description="Enhanced security alerts and tracking"
          value={settings.emergencyMode}
          onPress={() => toggleSetting('emergencyMode')}
          showSwitch={true}
          color="#EF4444"
        />

        <SectionHeader title="Data Management" />
        
        <SettingItem
          icon={Database}
          title="Auto Backup"
          description="Automatically backup data to secure storage"
          value={settings.autoBackup}
          onPress={() => toggleSetting('autoBackup')}
          showSwitch={true}
        />
        
        <SettingItem
          icon={Download}
          title="Export Data"
          description="Export all your data to a secure file"
          onPress={exportData}
          showChevron={true}
        />
        
        <SettingItem
          icon={Trash2}
          title="Clear All Data"
          description="Permanently delete all stored data"
          onPress={clearData}
          showChevron={true}
          color="#EF4444"
        />

        <SectionHeader title="Account" />
        
        <SettingItem
          icon={User}
          title="Profile"
          description="Manage your admin profile"
          onPress={() => Alert.alert('Profile', 'Profile settings would open here')}
          showChevron={true}
        />
        
        <SettingItem
          icon={HelpCircle}
          title="Help & Support"
          description="Get help and view documentation"
          onPress={() => Alert.alert('Help', 'Help center would open here')}
          showChevron={true}
        />
        
        <SettingItem
          icon={LogOut}
          title="Sign Out"
          description="Sign out of your admin account"
          onPress={() => Alert.alert('Sign Out', 'Sign out confirmation would appear here')}
          showChevron={true}
          color="#EF4444"
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Communication Management System v1.0.0
          </Text>
          <Text style={styles.footerSubtext}>
            Secure • Private • Encrypted
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
  resetButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#94A3B8',
  },
});