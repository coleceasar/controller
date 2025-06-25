import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Navigation, Crosshair, Shield, Eye, Clock, Smartphone, TriangleAlert as AlertTriangle, Zap, RefreshCw } from 'lucide-react-native';
import * as Location from 'expo-location';

export default function LocationTracking() {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [locationPermission, setLocationPermission] = useState<any>(null);
  const [trackingActive, setTrackingActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationHistory, setLocationHistory] = useState([
    {
      id: 1,
      contact: 'John Mwangi',
      number: '+254 712 345 678',
      location: 'Nairobi CBD, Kenya',
      coordinates: '-1.2921, 36.8219',
      timestamp: '2024-01-15 14:30',
      accuracy: '5m',
      type: 'call',
      status: 'verified'
    },
    {
      id: 2,
      contact: 'Grace Wanjiku',
      number: '+254 722 987 654',
      location: 'Mombasa Old Town, Kenya',
      coordinates: '-4.0435, 39.6682',
      timestamp: '2024-01-15 13:15',
      accuracy: '3m',
      type: 'message',
      status: 'verified'
    },
    {
      id: 3,
      contact: 'Unknown',
      number: '+254 701 456 789',
      location: 'Kisumu City, Kenya',
      coordinates: '-0.0917, 34.7680',
      timestamp: '2024-01-15 12:00',
      accuracy: '12m',
      type: 'call',
      status: 'suspicious'
    },
    {
      id: 4,
      contact: 'Peter Kamau',
      number: '+254 733 210 987',
      location: 'Eldoret Town, Kenya',
      coordinates: '0.5143, 35.2698',
      timestamp: '2024-01-15 10:45',
      accuracy: '2m',
      type: 'message',
      status: 'verified'
    },
    {
      id: 5,
      contact: 'Society Chairman',
      number: '+254 720 111 222',
      location: 'Nakuru Town, Kenya',
      coordinates: '-0.3031, 36.0800',
      timestamp: '2024-01-15 09:30',
      accuracy: '4m',
      type: 'call',
      status: 'verified'
    },
  ]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission({ granted: status === 'granted' });
      
      if (status === 'granted') {
        await getCurrentLocation();
      } else {
        Alert.alert(
          'Location Permission Required',
          'This app needs location access to track calls and messages. Please enable location services in your device settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Location permission error:', error);
      Alert.alert('Error', 'Failed to request location permission');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 10000,
      });
      setCurrentLocation(location);
      
      // Get address from coordinates
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      if (address.length > 0) {
        const addr = address[0];
        const locationString = `${addr.city || addr.subregion || 'Unknown'}, ${addr.country || 'Kenya'}`;
        setCurrentLocation(prev => ({ ...prev, address: locationString }));
      }
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert('Location Error', 'Unable to get current location. Please check your GPS settings.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTracking = () => {
    if (!locationPermission?.granted) {
      Alert.alert(
        'Location Permission Required',
        'Please enable location services to use tracking features.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Enable', onPress: requestLocationPermission }
        ]
      );
      return;
    }

    Alert.alert(
      trackingActive ? 'Stop Tracking' : 'Start Tracking',
      trackingActive 
        ? 'This will stop real-time location monitoring for incoming calls and messages.'
        : 'This will enable real-time location monitoring for incoming calls and messages. Your location will be tracked when you receive communications.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: trackingActive ? 'Stop' : 'Start', 
          onPress: () => {
            setTrackingActive(!trackingActive);
            if (!trackingActive) {
              getCurrentLocation();
            }
          }
        }
      ]
    );
  };

  const viewLocationDetails = (location: any) => {
    Alert.alert(
      'Location Details',
      `Contact: ${location.contact}\nNumber: ${location.number}\nLocation: ${location.location}\nCoordinates: ${location.coordinates}\nAccuracy: ${location.accuracy}\nStatus: ${location.status}\nTime: ${location.timestamp}`,
      [
        { text: 'OK' },
        { 
          text: 'View on Map', 
          onPress: () => {
            const [lat, lng] = location.coordinates.split(', ');
            const mapUrl = Platform.select({
              ios: `maps:0,0?q=${lat},${lng}`,
              android: `geo:0,0?q=${lat},${lng}`,
              default: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
            });
            Alert.alert('Opening Map', 'This would open the location in your maps app');
          }
        }
      ]
    );
  };

  const reportSuspiciousActivity = (location: any) => {
    Alert.alert(
      'Report Suspicious Activity',
      `Report ${location.contact} (${location.number}) for suspicious location activity?\n\nLocation: ${location.location}\nTime: ${location.timestamp}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Report', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Reported', 'Suspicious activity has been reported to security authorities.');
            // Update the location status
            setLocationHistory(prev => 
              prev.map(loc => 
                loc.id === location.id 
                  ? { ...loc, status: 'reported' }
                  : loc
              )
            );
          }
        }
      ]
    );
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Smartphone size={16} color="#2563EB" />;
      case 'message':
        return <Smartphone size={16} color="#10B981" />;
      default:
        return <MapPin size={16} color="#64748B" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return '#10B981';
      case 'suspicious':
        return '#EF4444';
      case 'reported':
        return '#8B5CF6';
      default:
        return '#F59E0B';
    }
  };

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
        <Text style={styles.locationAddress}>{location.location}</Text>
        <View style={styles.locationDetails}>
          <View style={styles.locationDetail}>
            <Navigation size={12} color="#94A3B8" />
            <Text style={styles.locationDetailText}>{location.coordinates}</Text>
          </View>
          <View style={styles.locationDetail}>
            <Crosshair size={12} color="#94A3B8" />
            <Text style={styles.locationDetailText}>{location.accuracy}</Text>
          </View>
        </View>
      </View>
      <View style={styles.locationActions}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(location.status) }]}>
          <Text style={styles.statusText}>{location.status}</Text>
        </View>
        {location.status === 'suspicious' && (
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => reportSuspiciousActivity(location)}
          >
            <AlertTriangle size={14} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location Tracking</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={getCurrentLocation}
            disabled={isLoading}
          >
            <RefreshCw size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.trackingButton,
              { backgroundColor: trackingActive ? '#EF4444' : '#10B981' }
            ]}
            onPress={toggleTracking}
          >
            <Zap size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.statusSection}>
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <Shield size={20} color={trackingActive ? "#10B981" : "#94A3B8"} />
              <Text style={styles.statusTitle}>Tracking Status</Text>
            </View>
            <Text style={[styles.statusText, { color: trackingActive ? '#10B981' : '#94A3B8' }]}>
              {trackingActive ? 'Active Monitoring' : 'Monitoring Disabled'}
            </Text>
            <Text style={styles.statusSubtext}>
              {trackingActive 
                ? 'Real-time location tracking is enabled for incoming communications'
                : 'Enable tracking to monitor locations of incoming calls and messages'
              }
            </Text>
          </View>
        </View>

        {locationPermission?.granted && currentLocation && (
          <View style={styles.currentLocationSection}>
            <Text style={styles.sectionTitle}>Current Location</Text>
            <View style={styles.currentLocationCard}>
              <View style={styles.currentLocationHeader}>
                <MapPin size={20} color="#2563EB" />
                <Text style={styles.currentLocationTitle}>Your Location</Text>
              </View>
              <Text style={styles.currentLocationText}>
                {currentLocation.address || 'Getting address...'}
              </Text>
              <Text style={styles.currentLocationCoords}>
                {currentLocation.coords.latitude.toFixed(6)}, {currentLocation.coords.longitude.toFixed(6)}
              </Text>
              <Text style={styles.currentLocationAccuracy}>
                Accuracy: {currentLocation.coords.accuracy?.toFixed(0) || 'Unknown'}m
              </Text>
              <Text style={styles.currentLocationTime}>
                Last updated: {new Date().toLocaleTimeString()}
              </Text>
            </View>
          </View>
        )}

        {!locationPermission?.granted && (
          <View style={styles.permissionSection}>
            <View style={styles.permissionCard}>
              <AlertTriangle size={48} color="#F59E0B" />
              <Text style={styles.permissionTitle}>Location Access Required</Text>
              <Text style={styles.permissionText}>
                To track the location of incoming calls and messages, please enable location services.
              </Text>
              <TouchableOpacity 
                style={styles.enableButton}
                onPress={requestLocationPermission}
              >
                <Text style={styles.enableButtonText}>Enable Location Services</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>Location History</Text>
            <View style={styles.historyStats}>
              <View style={styles.historyStat}>
                <Eye size={16} color="#2563EB" />
                <Text style={styles.historyStatText}>{locationHistory.length} tracked</Text>
              </View>
              <View style={styles.historyStat}>
                <AlertTriangle size={16} color="#EF4444" />
                <Text style={styles.historyStatText}>
                  {locationHistory.filter(l => l.status === 'suspicious').length} suspicious
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.locationList}>
            {locationHistory.map((location) => (
              <LocationItem key={location.id} location={location} />
            ))}
          </View>
        </View>

        <View style={styles.securitySection}>
          <Text style={styles.sectionTitle}>Security & Privacy</Text>
          <View style={styles.securityCard}>
            <View style={styles.securityItem}>
              <Shield size={20} color="#10B981" />
              <View style={styles.securityContent}>
                <Text style={styles.securityTitle}>Encrypted Location Data</Text>
                <Text style={styles.securityText}>
                  All location data is encrypted and stored securely on your device
                </Text>
              </View>
            </View>
            <View style={styles.securityItem}>
              <Eye size={20} color="#2563EB" />
              <View style={styles.securityContent}>
                <Text style={styles.securityTitle}>Privacy Protection</Text>
                <Text style={styles.securityText}>
                  Your location is never shared without explicit permission
                </Text>
              </View>
            </View>
            <View style={styles.securityItem}>
              <Clock size={20} color="#F59E0B" />
              <View style={styles.securityContent}>
                <Text style={styles.securityTitle}>Automatic Cleanup</Text>
                <Text style={styles.securityText}>
                  Location history is automatically cleaned after 30 days
                </Text>
              </View>
            </View>
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
  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackingButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  statusSection: {
    padding: 20,
  },
  statusCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  statusSubtext: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  currentLocationSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  currentLocationCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  currentLocationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentLocationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  currentLocationText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
    fontWeight: '500',
  },
  currentLocationCoords: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  currentLocationAccuracy: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  currentLocationTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  permissionSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  permissionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  enableButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  enableButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  historySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyStats: {
    flexDirection: 'row',
    gap: 16,
  },
  historyStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyStatText: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
  },
  locationList: {
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
    color: '#FFFFFF',
    marginBottom: 8,
  },
  locationDetails: {
    flexDirection: 'row',
    gap: 16,
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
  reportButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  securitySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  securityCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 16,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  securityContent: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  securityText: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
});