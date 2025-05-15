import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type ProfileAvatarProps = {
    profileUrl?:string;
}

const ProfileAvatar = ({
    profileUrl
}:ProfileAvatarProps) => {
  return (
    <View style={styles.container}>
      <Image 
       source={profileUrl 
        ? {uri: profileUrl}
        : require('@/assets/images/intro.png')}   
        style={styles.avatar}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#36454F'
    }
})

export default ProfileAvatar