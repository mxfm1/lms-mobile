import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LogoutOverlay = () => {
  return (
    <View style={styles.logoutOverlay}>
    <View style={styles.logoutBox}>
      <Text style={styles.logoutText}>Cerrando sesión...</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    logoutOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
        logoutBox: {
        backgroundColor: '#1f2937',
        padding: 20,
        borderRadius: 4,
    },
        logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    })
export default LogoutOverlay