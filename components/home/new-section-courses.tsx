import React from 'react'
import { Text, View } from 'react-native'
import RecentCoursesCard from './latest-course'
import Section from './section'

const NewSectionCourses = () => {
  return (
    <Section
        title='Nuevos Cursos'
    >   
        <View>
            <RecentCoursesCard
                orientation='horizontal'
                title='Fiscalidad Critpo'
                description='Luis Hernandez'
                image={require('@/assets/images/course_placeholder.jpg')}
                progress={0}
                showProgressBar={false}
            />
        </View>
        <Text>New view</Text>      
    </Section>
  )
}

export default NewSectionCourses