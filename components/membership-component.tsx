import { colors } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import MembershipBadge from './membership-badge';

const MembershipContent = () => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const dynamicStyles = getDynamicStyles(isDark);

  return (
    <LinearGradient
      colors={['#36454F', '#000']}
      style={styles.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
    >
      <View style={styles.badgeContainer}>
        <MembershipBadge />
      </View>

      <View style={styles.container}>
        <Text style={dynamicStyles.membershipTitle}>Membresia</Text>

        <View style={styles.perkRow}>
          <Ionicons name="checkmark-circle" size={18} color={colors.profileTextColor} />
          <Text style={styles.perkText}>Acceso a material formativo</Text>
        </View>
        <View style={styles.perkRow}>
          <Ionicons name="checkmark-circle" size={18} color="#A9A9A9" />
          <Text style={styles.perkText}>Soporte prioritario</Text>
        </View>
        <View style={styles.perkRow}>
          <Ionicons name="checkmark-circle" size={18} color="#A9A9A9" />
          <Text style={styles.perkText}>Certificaciones digitales</Text>
        </View>

        {/* Botón para ver más perks */}
        <TouchableOpacity style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>Ver más beneficios</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    borderRadius: 14,
    overflow: 'hidden',
    // margin: 16,
    minHeight: 220,
    padding: 20,
    position: 'relative',
  },
  container: {
    justifyContent: 'center',
  },
  badgeContainer:{
    position:  'absolute',
    top: 8,
    right: 8,
  },
  membershipBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF8C00',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  membershipBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  perkText: {
    color: '#A9A9A9',
    fontSize: 14,
  },
  seeMoreButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    // alignContent:'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: '#A9A9A9',
  },
  seeMoreText: {
    color: 'white',
    fontWeight: '500',
  },
});

const getDynamicStyles = (isDark: boolean) =>
  StyleSheet.create({
    membershipTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#fff' : '#000',
      marginBottom: 12,
    },
  });

export default MembershipContent;
