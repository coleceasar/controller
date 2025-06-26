import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Navigation, Crosshair, Shield, Eye, Clock, Smartphone, TriangleAlert as AlertTriangle, Zap, RefreshCw, Search, Globe, Wifi, Satellite } from 'lucide-react-native';

export default function LocationTracking() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingMode, setTrackingMode] = useState('enhanced'); // standard, enhanced, satellite
  const [isScanning, setIsScanning] = useState(false);
  
  const [trackedLocations, setTrackedLocations] = useState([
    {
      id: 1,
      contact: 'John Mwangi',
      number: '+254 712 345 678',
      location: 'Nairobi CBD - Kenyatta Avenue',
      coordinates: '-1.2921, 36.8219',
      timestamp: '2024-01-15 14:30',
      accuracy: '2m',
      type: 'realtime',
      status: 'active',
      ipAddress: '196.201.214.10',
      carrier: 'Safaricom',
      deviceInfo: 'Samsung Galaxy S21',
      movement: 'Walking - 3.2 km/h'
    },
    {
      id: 2,
      contact: 'Grace Wanjiku',
      number: '+254 722 987 654',
      location: 'Mombasa - Fort Jesus Area',
      coordinates: '-4.0435, 39.6682',
      timestamp: '2024-01-15 14:25',
      accuracy: '5m',
      type: 'gps',
      status: 'active',
      ipAddress: '196.201.214.25',
      carrier: 'Airtel Kenya',
      deviceInfo: 'iPhone 13 Pro',
      movement: 'Stationary'
    },
    {
      id: 3,
      contact: 'Unknown Device',
      number: '+254 701 456 789',
      location: 'Kisumu - Kondele Market',
      coordinates: '-0.0917, 34.7680',
      timestamp: '2024-01-15 14:20',
      accuracy: '15m',
      type: 'cell_tower',
      status: 'suspicious',
      ipAddress: '196.201.214.45',
      carrier: 'Telkom Kenya',
      deviceInfo: 'Unknown Android',
      movement: 'Moving - 45 km/h (Vehicle)'
    },
    {
      id: 4,
      contact: 'Peter Kamau',
      number: '+254 733 210 987',
      location: 'Eldoret - University Area',
      coordinates: '0.5143, 35.2698',
      timestamp: '2024-01-15 14:15',
      accuracy: '3m',
      type: 'wifi',
      status: 'monitored',
      ipAddress: '196.201.214.67',
      carrier: 'Safaricom',
      deviceInfo: 'Huawei P40',
      movement: 'Stationary'
    },
    {
      id: 5,
      contact: 'Society Chairman',
      number: '+254 720 111 222',
      location: 'Nakuru - Town Center',
      coordinates: '-0.3031, 36.0800',
      timestamp: '2024-01-15 14:10',
      accuracy: '1m',
      type: 'satellite',
      status: 'priority',
      ipAddress: '196.201.214.89',
      carrier: 'Safaricom',
      deviceInfo: 'iPhone 14 Pro Max',
      movement: 'Walking - 2.8 km/h'
    },
  ]);

  const trackPhoneNumber = () => {
    Alert.prompt(
      'Track Phone Number Location',
      'Enter Kenyan phone number to track in real-time:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Track', 
          onPress: (phoneNumber) => {
            if (phoneNumber) {
              setIsScanning(true);
              
              // Simulate tracking process
              setTimeout(() => {
                const locations = ['Nairobi CBD', 'Westlands', 'Karen', 'Kileleshwa', 'Parklands'];
                const carriers = ['Safaricom', 'Airtel Kenya', 'Telkom Kenya'];
                const devices = ['Samsung Galaxy', 'iPhone', 'Huawei', 'Oppo', 'Tecno'];
                
                const mockLocation = locations[Math.floor(Math.random() * locations.length)];
                const mockCarrier = carriers[Math.floor(Math.random() * carriers.length)];
                const mockDevice = devices[Math.floor(Math.random() * devices.length)];
                const mockIP = `196.201.214.${Math.floor(Math.random() * 255)}`;
                const mockCoords = `${(-1.2 + Math.random() * 0.4).toFixed(4)}, ${(36.7 + Math.random() * 0.3).toFixed(4)}`;
                
                setIsScanning(false);
                
                Alert.alert(
                  'Real-Time Location Found',
                  `📱 Number: ${phoneNumber}\n📍 Location: ${mockLocation}, Nairobi\n🗺️ Coordinates: ${mockCoords}\n🌐 IP Address: ${mockIP}\n📡 Carrier: ${mockCarrier}\n📱 Device: ${mockDevice}\n⏰ Last Update: ${new Date().toLocaleTimeString()}\n🎯 Accuracy: ${Math.floor(Math.random() * 10) + 1}m\n🚶 Movement: ${Math.random() > 0.5 ? 'Moving' : 'Stationary'}\n\n✅ Real-time tracking activated`,
                  [
                    { text: 'OK' },
                    { 
                      text: 'Add to Monitor', 
                      onPress: () => {
                        const newLocation = {
                          id: trackedLocations.length + 1,
                          contact: 'Tracked Number',
                          number: phoneNumber,
                          location: `${mockLocation}, Nairobi`,
                          coordinates: mockCoords,
                          timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
                          accuracy: `${Math.floor(Math.random() * 10) + 1}m`,
                          type: 'realtime' as const,
                          status: 'tracking' as const,
                          ipAddress: mockIP,
                          carrier: mockCarrier,
                          deviceInfo: mockDevice,
                          movement: Math.random() > 0.5 ? 'Moving' : 'Stationary'
                        };
                        setTrackedLocations(prev => [newLocation, ...prev]);
                      }
                    }
                  ]
                );
              }, 3000);
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
      'Track IP Address Location',
      'Enter IP address to geolocate:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Track', 
          onPress: (ipAddress) => {
            if (ipAddress) {
              setIsScanning(true);
              
              setTimeout(() => {
                const cities = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];
                const isps = ['Safaricom', 'Airtel Kenya', 'Telkom Kenya', 'Jamii Telecommunications'];
                
                const mockCity = cities[Math.floor(Math.random() * cities.length)];
                const mockISP = isps[Math.floor(Math.random() * isps.length)];
                const mockCoords = `${(-4 + Math.random() * 4).toFixed(4)}, ${(34 + Math.random() * 6).toFixed(4)}`;
                
                setIsScanning(false);
                
                Alert.alert(
                  'IP Geolocation Results',
                  `🌐 IP: ${ipAddress}\n📍 Location: ${mockCity}, Kenya\n🗺️ Coordinates: ${mockCoords}\n🏢 ISP: ${mockISP}\n🌍 Country: Kenya\n🏙️ Region: ${mockCity} County\n⏰ Last Seen: ${new Date().toLocaleTimeString()}\n📊 Confidence: ${Math.floor(Math.random() * 30) + 70}%\n\n✅ IP successfully geolocated`
                );
              }, 2000);
            }
          }
        }
      ],
      'plain-text',
      '196.201.214.'
    );
  };

  const massLocationScan = () => {
    Alert.alert(
      'Mass Location Scanning',
      'Scan all active devices in Kenya for location data?\n\nThis will:\n• Scan all network carriers\n• Track active mobile devices\n• Monitor IP addresses\n• Generate location database\n\nEstimated devices: 25,000+',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Start Scan', 
          style: 'destructive',
          onPress: () => {
            setIsScanning(true);
            Alert.alert('Mass Scan Started', 'Scanning all Kenya networks for active devices. This may take several minutes...');
            
            setTimeout(() => {
              setIsScanning(false);
              Alert.alert('Scan Complete', `Mass location scan completed:\n\n📱 Devices Found: 24,847\n📍 Locations Mapped: 24,203\n🌐 IP Addresses: 18,956\n⚠️ Suspicious Activity: 127\n🔒 Encrypted Devices: 15,432\n\nAll data has been added to the monitoring database.`);
            }, 8000);
          }
        }
      ]
    );
  };

  const viewLocationDetails = (location: any) => {
    Alert.alert(
      'Location Intelligence',
      `📱 Contact: ${location.contact}\n📞 Number: ${location.number}\n📍 Location: ${location.location}\n🗺️ Coordinates: ${location.coordinates}\n🎯 Accuracy: ${location.accuracy}\n🌐 IP: ${location.ipAddress}\n📡 Carrier: ${location.carrier}\n📱 Device: ${location.deviceInfo}\n🚶 Movement: ${location.movement}\n⏰ Last Update: ${location.timestamp}\n📊 Tracking: ${location.type.toUpperCase()}\n🔒 Status: ${location.status.toUpperCase()}`,
      [
        { text: 'OK' },
        { 
          text: 'Real-Time Track', 
          onPress: () => Alert.alert('Real-Time Tracking', `Now tracking ${location.contact} in real-time.\n\nUpdates every 30 seconds.\nMovement alerts enabled.\nGeofence monitoring active.`)
        },
        { 
          text: 'View History', 
          onPress: () => Alert.alert('Location History', `Location history for ${location.contact}:\n\n• 14:30 - Nairobi CBD\n• 14:15 - Westlands\n• 14:00 - Parklands\n• 13:45 - Kasarani\n• 13:30 - Thika Road\n\nTotal distance: 15.2 km\nAverage speed: 25 km/h`)
        }
      ]
    );
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'realtime':
        return <Zap size={16} color="#10B981" />;
      case 'gps':
        return <MapPin size={16} color="#2563EB" />;
      case 'cell_tower':
        return <Wifi size={16} color="#F59E0B" />;
      case 'wifi':
        return <Wifi size={16} color="#8B5CF6" />;
      case 'satellite':
        return <Satellite size={16} color="#EF4444" />;
      default:
        return <MapPin size={16} color="#64748B" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'suspicious':
        return '#EF4444';
      case 'monitored':
        return '#F59E0B';
      case 'priority':
        return '#8B5CF6';
      case 'tracking':
        return '#2563EB';
      default:
        return '#64748B';
    }
  };

  const filteredLocations = trackedLocations.filter(location =>
    location.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.number.includes(searchQuery) ||
    location.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.ipAddress.includes(searchQuery)
  );

  const LocationItem = ({ location }: any) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => viewLocationDetails(location)}
    >
      <View style={styles.locationIcon}>
        {getLocationIcon(location.type)}
      </View>
      <View style={styles.locationContent}>
        <View style={styles.locationHeader}>
          <Text style={styles.locationContact}>{location.contact}</Text>
          <Text style={styles.locationTime}>{location.timestamp.split(' ')[1]}</Text>
        </View>
        <Text style={styles.locationNumber}>{location.number}</Text>
        <Text style={styles.locationAddress}>📍 {location.location}</Text>
        <Text style={styles.locationMovement}>🚶 {location.movement}</Text>
        <View style={styles.locationDetails}>
          <View style={styles.locationDetail}>
            <Globe size={12} color="#94A3B8" />
            <Text style={styles.locationDetailText}>{location.ipAddress}</Text>
          </View>
          <View style={styles.locationDetail}>
            <Crosshair size={12} color="#94A3B8" />
            <Text style={styles.locationDetailText}>{location.accuracy}</Text>
          </View>
          <View style={styles.locationDetail}>
            <Wifi size={12} color="#94A3B8" />
            <Text style={styles.locationDetailText}>{location.carrier}</Text>
          </View>
        </View>
      </View>
      <View style={styles.locationActions}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(location.status) }]}>
          <Text style={styles.statusText}>{location.status}</Text>
        </View>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{location.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Advanced Location Tracking</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.modeButton, { backgroundColor: 
              trackingMode === 'satellite' ? '#EF4444' : 
              trackingMode === 'enhanced' ? '#F59E0B' : '#10B981' 
            }]}
            onPress={() => {
              const modes = ['standard', 'enhanced', 'satellite'];
              const currentIndex = modes.indexOf(trackingMode);
              const nextMode = modes[(currentIndex + 1) % modes.length];
              setTrackingMode(nextMode);
              Alert.alert('Tracking Mode', `Switched to ${nextMode.toUpperCase()} tracking mode`);
            }}
          >
            <Satellite size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search numbers, locations, IPs..."
            placeholderTextColor="#64748B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.controlsSection}>
          <Text style={styles.sectionTitle}>Tracking Controls</Text>
          <View style={styles.controlsGrid}>
            <TouchableOpacity style={styles.controlButton} onPress={trackPhoneNumber}>
              <Smartphone size={24} color="#FFFFFF" />
              <Text style={styles.controlButtonText}>Track Phone</Text>
              <Text style={styles.controlButtonSubtext}>Real-time location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, { backgroundColor: '#8B5CF6' }]} onPress={trackIPAddress}>
              <Globe size={24} color="#FFFFFF" />
              <Text style={styles.controlButtonText}>Track IP</Text>
              <Text style={styles.controlButtonSubtext}>Geolocate address</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.controlButton, { backgroundColor: '#EF4444' }]} 
              onPress={massLocationScan}
              disabled={isScanning}
            >
              <Eye size={24} color="#FFFFFF" />
              <Text style={styles.controlButtonText}>
                {isScanning ? 'Scanning...' : 'Mass Scan'}
              </Text>
              <Text style={styles.controlButtonSubtext}>
                {isScanning ? 'Please wait' : 'Scan all Kenya'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>Tracking Status</Text>
          <View style={styles.statusCard}>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <Shield size={20} color="#10B981" />
                <Text style={styles.statusText}>Mode: {trackingMode.toUpperCase()}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: '#10B981' }]}>
                <Text style={styles.statusBadgeText}>ACTIVE</Text>
              </View>
            </View>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <MapPin size={20} color="#2563EB" />
                <Text style={styles.statusText}>Tracked Devices: {trackedLocations.length}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: '#2563EB' }]}>
                <Text style={styles.statusBadgeText}>MONITORING</Text>
              </View>
            </View>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <Zap size={20} color="#F59E0B" />
                <Text style={styles.statusText}>Real-time Updates: ON</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: '#F59E0B' }]}>
                <Text style={styles.statusBadgeText}>LIVE</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.locationsSection}>
          <View style={styles.locationsHeader}>
            <Text style={styles.sectionTitle}>Tracked Locations</Text>
            <View style={styles.locationsStats}>
              <View style={styles.locationsStat}>
                <Eye size={16} color="#2563EB" />
                <Text style={styles.locationsStatText}>{filteredLocations.length} tracked</Text>
              </View>
              <View style={styles.locationsStat}>
                <AlertTriangle size={16} color="#EF4444" />
                <Text style={styles.locationsStatText}>
                  {filteredLocations.filter(l => l.status === 'suspicious').length} suspicious
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.locationsList}>
            {filteredLocations.map((location) => (
              <LocationItem key={location.id} location={location} />
            ))}
          </View>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>⚠️ Legal Notice</Text>
          <Text style={styles.disclaimerText}>
            Location tracking requires proper authorization and consent. This system is for demonstration purposes only. Real-world implementation must comply with privacy laws and telecommunications regulations.
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  controlsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
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
  statusSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
  locationsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  locationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationsStats: {
    flexDirection: 'row',
    gap: 16,
  },
  locationsStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationsStatText: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
  },
  locationsList: {
    gap: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  locationContent: {
    flex: 1,
    marginLeft: 12,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationContact: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  locationTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  locationNumber: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 4,
  },
  locationMovement: {
    fontSize: 13,
    color: '#F59E0B',
    marginBottom: 8,
  },
  locationDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  locationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDetailText: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
  },
  locationActions: {
    alignItems: 'center',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#374151',
    borderRadius: 4,
  },
  typeText: {
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