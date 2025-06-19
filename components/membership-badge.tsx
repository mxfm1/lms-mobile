import { colors } from '@/theme/colors'
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

type RecentBadgeProps = {
  label:string;
  isSelected?:boolean;
}

export const RecentBadge = ({
  label,
  isSelected
}:RecentBadgeProps) => {
  return (
    <View
      style={[
        styles.badge,
        {backgroundColor: isSelected ? colors.activeBadgeColor : colors.primary}
      ]}
    >
      <Text 
        style={badgeStyles.badgeText}
        numberOfLines={1}
        ellipsizeMode='tail'
        >{label}</Text>
    </View>
  )
}

const badgeStyles = StyleSheet.create({
  badge: {
    borderRadius:20,
    paddingHorizontal: 12,
    paddingVertical:4,
    alignContent: 'center',
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    maxWidth:90,
    // minHeight: 30
  },
  badgeText: {
    color: 'white'
  }
})