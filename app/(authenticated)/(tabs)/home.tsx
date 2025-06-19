import HomeBanner from '@/components/home/home-banner'
import NewSectionCourses from '@/components/home/new-section-courses'
import RecentCourseSection, { RecentCourse } from '@/components/home/recent-course-section'
import RecentSectionCourse from '@/components/home/recent-courses-section'
import SearchCourseSection from '@/components/home/search-course'
import { COLORS, FONT, SIZES } from '@/constants'
import { colors } from '@/theme/colors'
import { useUserAuth } from '@/utils/helpers'
import { LinearGradient } from 'expo-linear-gradient'
import { Redirect, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

const categories = [
  {
    label: 'Reciente',
  },{
    label: 'Recomendado',
  },{
    label: 'Técnicas no Destructivas'
  },{
    label: 'Soldadura'
  },{
    label: 'Estadística'
  }
]

const courses:RecentCourse[]  = [
  {
    icon: 'logo-apple',
    chapterLabel: 'asda',
    chapterDescription: 'Luis Hernandez',
  },
  {
    icon: 'logo-apple',
    chapterLabel: 'asda',
    chapterDescription: 'dsafsa'
  },
  // {
  //   icon: 'logo-apple',
  //   chapterLabel: 'asda',
  //   chapterDescription: 'dsafsa',
  //   isLast: true,
  // },
]

const home = () => {

  const { isSignedIn, isLoading} = useUserAuth()
  const router = useRouter()
  const [active, setActive] = useState<string>('Reciente')
  const [showBanner,setShowBanner] = useState<boolean>(true)

  if(isLoading){
    return <Text>Cargando...</Text>
  }

  if(!isSignedIn){
    return <Redirect href="/login"/>
  }
  return (
    <LinearGradient
      colors={[colors.primary,colors.dark]}
      style={{flex:1, width:'100%'}}
      start={{x:0,y:0}}
      end={{x:0.5,y:1}}
    > 
      <SafeAreaView style={homeStyles.container}>
        <View style={{flex:1}}>
          {/* <View style={homeStyles.topIconsCOntainer}>
            <Ionicons name='menu-outline' size={24} color={'white'}/>
            <Ionicons name='alert' size={24} color={'white'}/>
          </View> */}

          <View style={{marginVertical:12, gap:12,}}>
            <Text style={homeStyles.userText}>Bienvenido Felipe</Text>
          </View>

            <View style={{marginBottom:20}}>
              <SearchCourseSection query='asd' onSearch={()=> {}}/>
            </View>
            {showBanner && (
              <HomeBanner 
                title='Obtiene un 30% de descuento' 
                description='Obtén un descuento al comprar una membresia premium este mes!'
                buttonLabel='Obtener acceso'
                onClose={() => setShowBanner(false)}
                />
            )}

            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:18}}>

              <View>
                <RecentCourseSection 
                  courses={courses}
                />
              </View>


              {/* Explore section */}
              <Text style={homeStyles.categoryText}>Explorar</Text>
              <RecentSectionCourse />

              <View
                style={{marginTop:24, paddingBottom:10}}
              >
                <NewSectionCourses />
              </View>
            </ScrollView>

            <Pressable onPress={() => router.push("/")} style={{marginVertical: 12}}>
              <Text style={{color:'white'}}>Ir al inicio</Text>
            </Pressable>
      
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}



const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    width: '100%',
  },
  topIconsCOntainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft:4,
    color: 'white'
  },
  categoryText: {
    fontSize: 24,
    fontWeight: '500',
    marginLeft: 10,
    color: 'white',
    marginBottom: 12,
    marginTop:40,
  },
  courseCarrouselContainer: {

  },
  categoryLabel: {

  }
})

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: 'white',
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
});

export default home