import { colors } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type ProfileButtonData = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap
    isLast?:boolean;
}

type ProfileSectionType = {
    header:string;
    data: ProfileButtonData[]
}

const ProfileSection = ({
    header,
    data
}:ProfileSectionType) => {
  return (
    <LinearGradient
        colors={[colors.primary,colors.dark]}
        start={{x:0,y:0}}
        end={{x:0.8,y:1}}
        style={styles.sectionContainer}
    >
        <Text style={styles.sectionHeader}>{header}</Text>

        <View style={styles.buttonContainer}>
            {data.map((button,index) => (
                <ProfileSectionButton
                    isLast={button.isLast}
                    key={index}
                    label={button.label} 
                    icon={button.icon}
                    />
            ))}
        </View>
    </LinearGradient>
  )
}

type ProfileSectionButtonProps = {
    isLast?:boolean;
    label:string,
    icon?: keyof typeof Ionicons.glyphMap
    color?:string
}

export const ProfileSectionButton = ({
    isLast,
    label,
    icon,
    color
}:ProfileSectionButtonProps) => {
    return (
        <Pressable style={({pressed}) => [
            styles.buttonContent,
            !isLast && styles.buttonBottomBorder,
            {opacity: pressed ? 0.6 : 1}
        ]}>
            <Ionicons name={icon ? icon : 'person'} size={20} color={color ? color : 'white'}/>
            <Text style={[styles.buttonText,{color: color ? color : colors.profileTextColor}]}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal:4,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 600,
        paddingLeft: 8,
        color: 'white'
    },
    buttonContainer: {
        paddingLeft:10,
        marginRight: 10,
    },
    buttonContent: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 4,
        alignContent: 'center',
        gap:8,
    },
    buttonText:{
        color: colors.profileTextColor
    },
    buttonBottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#333333'
    }

})
export default ProfileSection 
