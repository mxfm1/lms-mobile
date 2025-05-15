import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MembershipBadge = () => {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>Premium</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: '#097969',
        paddingHorizontal:12,
        paddingVertical: 4,
        alignContent:'center',
        borderRadius: 20,
        zIndex: 20,
    },
    badgeText: {
        color: 'white'
    }
})
export default MembershipBadge