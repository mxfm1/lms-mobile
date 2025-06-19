import { colors } from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Section from './section'

export type RecentCourse = {
    icon: keyof typeof Ionicons.glyphMap;
    chapterLabel:string;
    chapterDescription:string;
    isLast?:boolean
}

type RecentCourseSectionProps ={
    courses: RecentCourse[] | null
}

const RecentCourseSection = ({
   courses
}:RecentCourseSectionProps) => {
  return (
   <Section
    title='Seguir Viendo'
   >
        {courses && courses.length > 0 && (
            courses.map((course,index) => (
                <RecentCoursesComponent 
                    key={index}
                    isLast={course.isLast}
                />
            ))
        )}
   </Section>
  )
}

type RecentCoursesProps = {
    isLast?:boolean
}
const RecentCoursesComponent = ({
    isLast
}:RecentCoursesProps) => {
    return (
        <Pressable 
            style={({pressed}) => [
                coursesStyles.container,
                !isLast && coursesStyles.recentCourseSeparator,
                {opacity: pressed ? 0.6 :1}
            ]}

            >
            <View style={coursesStyles.courseIconContainer}>
                <Ionicons name='clipboard' size={20} />
            </View>
            <View style={coursesStyles.textContainer}>
                <Text style={coursesStyles.courseTitle}>Ingenieria en Ejecucion- Modulo 2</Text>
                <Text style={coursesStyles.courseDescription}>Escuela de Mantencion</Text>
            </View>
            <View style={coursesStyles.forwardIconContainter}>
                <Ionicons name='chevron-forward' size={20} color={'white'}/>
            </View>
        </Pressable>
    )
}

const coursesStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 4,
        alignContent: 'center',
        paddingVertical: 4
    },
    courseIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 24,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        gap: 4,

    },
    courseTitle: {
        fontSize:14,
        fontWeight: '600',
        color: 'white'

    },
    courseDescription: {
        fontSize: 12,
        color: colors.profileTextColor
    },
    recentCourseSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: colors.separatorColor
    },
    forwardIconContainter: {
        // alignContent: 'center',
        justifyContent: 'center'
    }
})

export default RecentCourseSection