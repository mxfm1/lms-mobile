import { colors } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type HomeBannerProps = {
  title: string;
  description: string;
  buttonLabel?: string;
  onClose:() => void
};

const HomeBanner = ({
  title,
  description,
  buttonLabel,
  onClose
}: HomeBannerProps) => {
  return (
    <LinearGradient
      colors={[colors.metalicBlue, colors.dark]}
      style={styles.bannerContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >   
        <Pressable
            onPress={() => onClose()} 
            style={{position:'absolute', top:8, right:12}}>
            <Ionicons name='close'size={20} color={'white'} />
        </Pressable>

      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
        {buttonLabel && (
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.iconContainer}>
        <Ionicons name='rocket' size={36} color='white' />
      </View>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    bannerContainer:{
        paddingHorizontal:10,
        paddingVertical: 12,
        borderRadius: 12,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    textContainer: {
        flex:7,
        gap:8,
    },
    iconContainer: {
        justifyContent: 'center',
        alignContent:'center',
        paddingRight: 12
    },
    titleText:{
        fontSize:20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom:4,
    },
    descriptionText: {
        color: colors.profileTextColor,
        fontSize:12,
        paddingLeft: 12,
    },
     button: {
        alignSelf: 'center',
        backgroundColor: colors.dark,
        paddingHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },

});

export default HomeBanner;
