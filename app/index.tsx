import { HTTPcourseRepo } from '@/infraestructure/api/courses';
import { colors } from '@/theme/colors';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const {width,height} = Dimensions.get('window')
const obProgresBarArr = [
  {

  },
  {

  },
  {

  }
]

const Index = () => {

  useEffect(() => {
    const getPhotos = async() => {
      const data = await repo.getOnboardingPhotos(3)
      setHomePhotos(data)
    }
    getPhotos()
  },[])

  const router = useRouter()
  const repo = new HTTPcourseRepo
  const imageRef = useRef<FlatList<any>>(null)
  const[homePhotos,setHomePhotos] = useState<[] | null>(null)
  const[activeIndex,setActiveIndex] = useState<number>(0)
  const { signOut,isSignedIn } = useAuth()
  const goToLogin = () => {
    router.push("/login")
  };

  if(!homePhotos){
    return (
      <View>
        <Text>Error al cargar la pagina</Text>
      </View>
    )
  }

  // if(isSignedIn){
  //   return <Redirect href='/home' />
  // }
  
  // console.log("ARRAY FROM HOMESCREEN",homePhotos)
  
  const handleOnboarding = (index:number) => {
    imageRef.current?.scrollToOffset({
        offset: width * index,
        animated:true
      })
    setActiveIndex(index)
  }

  const handleOnBoardingButtom = () => {
    if(activeIndex < homePhotos.length - 1){
      handleOnboarding(activeIndex + 1)
    }else{
      router.push('/login')
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.brandTitle}>Weldely</Text>
      <FlatList
        ref={imageRef}
        data={homePhotos}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={ev => {
          const index = Math.round(ev.nativeEvent.contentOffset.x /width)
          setActiveIndex(index)
        }}
        renderItem={({item,index}) => (
          <View>
              <Image source={{uri:item.src.portrait}} style={styles.image} />
          </View>
        )}
      />
       <View style={styles.progressBarWrapper}>
          <FlatList
            data={obProgresBarArr}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity 
                style={styles.progressBarContainer}
                onPress={() => handleOnboarding(index)}
                >
                <View
                  style={[
                    styles.progressBar,
                    index === activeIndex && styles.progressBarActive,
                  ]}
                />
              </TouchableOpacity>
            )}
          />
          <Pressable 
            onPress={() => handleOnBoardingButtom()}
            style={styles.onBoardingButton}
            >
              <Text 
                style={styles.onBoardingButtonText}>
                {activeIndex < homePhotos.length - 1 ? 'Siguiente': 'Comencemos'}
              </Text>
          </Pressable>
        </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:32,
    width: '100%',
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '500',
    color: '#4a6572',
    fontStyle: 'italic',
    position: 'absolute',
    top: 60,
    zIndex: 30,
    right: '40%'
  },
  image: {
    width: width,
    height: 400
  },
  progressBarWrapper:{
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 80,
    gap:20
  },
  progressBarContainer: {
    marginHorizontal: 10,
  },
  progressBar: {
    height: 8,
    width:32,
    borderRadius: 12,
    backgroundColor: '#ccc',
  },
  progressBarActive: {
    backgroundColor: colors.primary,
    borderRadius: 40,
    transform: [{scale: 1.2}]
  },
  onBoardingButton:{
    borderRadius: 12,
    width: 120,
    padding:8,
    alignSelf:'center',
    justifyContent: 'center',
    backgroundColor: colors.primary
  },
  onBoardingButtonText: {
    color:'white',
    alignSelf: 'center'
  }
});
