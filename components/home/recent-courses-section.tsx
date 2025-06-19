import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { RecentBadge } from '../membership-badge'
import RecentCoursesCard from './latest-course'

const categoryBadges = [
  { label: 'Mantenimiento', query: 'mantenimiento' },
  { label: 'Soldadura', query: 'soldadura' },
  { label: 'Ingeniería', query: 'ingenieria' },
  { label: 'Arte', query: 'arte' },
  { label: 'Música', query: 'musica' },
  { label: 'Ensayos', query: 'ensayos' },
  { label: 'Informática', query: 'informatica' },
] as const

type queryType = typeof categoryBadges[number]['query']

const RecentSectionCourse = () => {

    const [isActive,setIsActive] = useState<queryType | null>('mantenimiento')

  return (
    <View style={styles.sectionContainer}>
      
      <View style={{gap:8}}>
        {/* <Text style={styles.courseTitle}>Ver Cursos Recomendados</Text> */}
        <ScrollView style={{marginBottom:12}} horizontal showsHorizontalScrollIndicator={false}>
            {categoryBadges.map((item,index) => {
                const activeCategory = item.query === isActive
                return (
                    <Pressable
                        key={index}
                        onPress={() => setIsActive(item.query)}
                        style={{marginRight: 8}}
                    >
                        <RecentBadge label={item.label} isSelected={activeCategory} />
                    </Pressable>
                )
            })}
        </ScrollView>
      </View>

      <ScrollView style={styles.cardContainer} horizontal showsHorizontalScrollIndicator={false}>
        <RecentCoursesCard 
            title='Mantenimeinto industrial'
            description='Luis Hernandez'
            image=''
            progress={0.15}
        />
        <RecentCoursesCard 
            title='Mantenimeinto industrial'
            description='Luis Hernandez'
            image=''
            progress={0.2}
        />
        <RecentCoursesCard 
            title='Mantenimeinto industrial'
            description='Luis Hernandez'
            image=''
            progress={0.2}
        />
      </ScrollView>
    </View>
  )
}

const styles =  StyleSheet.create({
  sectionContainer: {
    height: 320,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingLeft:10,
    paddingTop: 16,
  },
  cardContainer: {
    paddingBottom:12,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
  }
})

export default RecentSectionCourse