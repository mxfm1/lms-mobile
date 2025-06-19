import { colors } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import UnderlinedText from '../category-text-section';
import ProgressBar from '../progress-bar';

type RecentCoursesProps = {
  title: string;
  description: string;
  image: string;
  progress: number;
  orientation?: 'vertical' | 'horizontal'; 
  showProgressBar?:boolean
};

const RecentCoursesCard = ({
  title,
  description,
  image,
  progress,
  orientation = 'vertical',
  showProgressBar=true,
}: RecentCoursesProps) => {
  const isVertical = orientation === 'vertical';

  return (
    <View
      style={[
        styles.cardContainer,
        isVertical ? styles.vertical : styles.horizontal,
      ]}
    >
      <Image
        style={[styles.courseImage, isVertical ? styles.imageVertical : styles.imageHorizontal]}
        source={require('@/assets/images/course_placeholder.jpg')}
        contentFit="cover"
      />

      <View style={styles.cardContent}>

        
        <View style={styles.textContent}>
          <UnderlinedText label='Crypto' />
          <Text style={styles.courseTitle}>{title}</Text>
          <View style={{paddingTop: 6, gap: 4, flexDirection:'row'}}>
            {/* <ProfileAvatar /> */}
            <Text style={styles.courseDescription}>{description}</Text>
            <Text style={{color:colors.profileTextColor}}> - </Text>
            <Text style={{fontSize:12, fontWeight: 'light'}}>14 feb 2025</Text>
          </View>
        </View>

        <View style={{gap:4}}>
            {showProgressBar && (
              <ProgressBar progress={progress} />
            )}
            <Pressable style={styles.actionButton}>
              <Text style={styles.actionText}>Ver Contenido</Text>
              <Ionicons name="arrow-forward" size={14} color="#fff" />
            </Pressable>
        </View>
            
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    marginRight:6,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: '100%',
    maxWidth: 350,
  },
  vertical: {
    width: 180,
  },
  horizontal: {
    flexDirection: 'row',
    height: 120,
  },
  courseImage: {
    backgroundColor: '#ccc',
  },
  imageVertical: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  imageHorizontal: {
    width: 100,
    height: '100%',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    justifyContent: 'space-between',
  },
  textContent: {
    gap: 4,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
  },
  courseDescription: {
    fontSize: 13,
    color: colors.pressedBackground,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary || '#3B82F6',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
  },
});

export default RecentCoursesCard;
