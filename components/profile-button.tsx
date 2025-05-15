import { colors } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

type ProfileButtonProps = {
    label:string;
    icon?:keyof typeof Ionicons.glyphMap
}

// const ProfileButton = ({
//     label,
//     icon
// }:ProfileButtonProps) => {

//     const colorScheme = useColorScheme()
//     const isDarkTheme = colorScheme === 'dark'
//   return (
//     <Pressable 
//         onPress={() => {}}
//         style={({pressed})=> [
//             styles.button,
//             {backgroundColor: pressed ? '#374151' : '#4B5563'}
//         ]}>
//       <View style={styles.buttonContent}>
//         <Ionicons name={icon ? icon : 'layers'} size={24} style={{color: isDarkTheme ? 'white' : 'black'}}/>
//         <Text style={styles.buttonText}>
//             {label}
//         </Text>
//       </View>
//       <Ionicons name='arrow-forward'size={24} style={{color: isDarkTheme ? 'white': 'black'}}/>
//     </Pressable>
//   )
// }

const styles = StyleSheet.create({
    button: {
       width: '100%',
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       backgroundColor: '#4B5563',
       borderRadius: 10,
       paddingVertical: 12,
       paddingHorizontal: 16,
       gap:10,
    },
    buttonContent: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
})


const NewProfileButton = ({
    label,
    icon
}:ProfileButtonProps) => {
    const colorScheme = useColorScheme()
    const isDarkTheme = colorScheme === 'dark'

    return (
        <Pressable
            onPress={() => {}}
            style={({pressed}) => [
                // styles.button,
                {
                    opacity: pressed ? 0.6 : 1,                    
                }
            ]}
           >
            <LinearGradient
                colors={[colors.primary,colors.dark]}
                start={{x:0,y:0}}
                end={{x:0.9,y:1}}
                style={newStyles.container}
            >
            
                <View style={newStyles.buttonContent}>
                    <Ionicons name={icon} size={24} color={'white'}/>
                    <Text style={newStyles.buttonText}>{label}</Text>
                </View>
            </LinearGradient>
        </Pressable>
    )
}

const newStyles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal:6,
        borderRadius: 8,
    },
    buttonContent: {
        flexDirection: 'row',
        alignContent: 'center',
        gap: 10,
        paddingLeft: 8,
    },
    buttonText:{
        color: colors.profileTextColor,
        fontSize: 16,
        fontWeight: 500,
    }
})

export default NewProfileButton

const sectionData = [
    {
      title: 'Mi cuenta',
      data: [
        { label: 'Perfil', icon: 'person' },
        { label: 'Membresía', icon: 'card' },
        { label: 'Salir', icon: 'log-out' },
      ],
    },
    {
      title: 'Preferencias',
      data: [
        { label: 'Notificaciones', icon: 'notifications' },
        { label: 'Seguridad', icon: 'shield-checkmark' },
      ],
    },
  ];
  

//   const ProfileButtonSection = () => {
//     return (
//       <SectionList
//         sections={sectionData}
//         keyExtractor={(item, index) => item.label + index}
//         renderItem={({ item }) => (
//           <View style={styles.buttonWrapper}>
//             <NewProfileButton label={item.label} icon={item.icon} />
//           </View>
//         )}
//         renderSectionHeader={({ section: { title } }) => (
//           <Text style={styles.sectionHeader}>{title}</Text>
//         )}
//         contentContainerStyle={styles.container}
//       />
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       paddingHorizontal: 16,
//       paddingTop: 16,
//       paddingBottom: 40,
//       gap: 8,
//     },
//     sectionHeader: {
//       fontSize: 18,
//       fontWeight: '700',
//       marginBottom: 8,
//       marginTop: 16,
//       color: '#6B7280',
//     },
//     buttonWrapper: {
//       marginBottom: 10,
//     },
//   });