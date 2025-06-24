import { HTTPcourseRepo } from '@/infraestructure/api/courses'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const {width,height} = Dimensions.get('window')
const IMAGE_SIZE = 80;
const IAMGE_SPACE = 10

const courses = () => {
  const bgRef = useRef<FlatList<any>>(null)
  const thumbnailRef = useRef<FlatList<any>>(null)
  const [activeIndex,setActiveIndex] = useState<number>(0)
  const[images,setImages] = useState(null)
  const repo = new HTTPcourseRepo

  useEffect(() => {
    const fetchImages = async() => {
      const images = await repo.getCoursesPhotos()

      setImages(images)

    }

    fetchImages()
  },[])

 if(!images){
  return (
      <View>
        <Text>Cannot load the images</Text>
      </View>
  )
 }

  const handleIndexChange = (index:number) => {
      bgRef.current?.scrollToOffset({
        offset: width * index,
        animated:true
      })
      if(index * (IMAGE_SIZE + IAMGE_SPACE) - IMAGE_SIZE/ 2 > width / 2 ){
        thumbnailRef.current?.scrollToOffset({
          offset: index * (IMAGE_SIZE + IAMGE_SPACE) - width / 2 + IMAGE_SIZE / 2,
          animated: true
        })
      }
  }
  const handleBGChange = (index:number) => {
    setActiveIndex(index)
    if(index * (IMAGE_SIZE + IAMGE_SPACE) - IMAGE_SIZE/ 2 > width / 2 ){
    thumbnailRef.current?.scrollToOffset({
      offset: index * (IMAGE_SIZE + IAMGE_SPACE) - width / 2 + IMAGE_SIZE / 2,
      animated: true
    })
  }
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={bgRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
  
          const index = Math.round(ev.nativeEvent.contentOffset.x / width)
          // setActiveIndex(index)
          handleBGChange(index)
          // setActiveIndex(index)
          // handleIndexChange(index)

          // const index = 
          // setActiveIndex(index)
          // setActiveIndex(INDEX)
        }}
        pagingEnabled
        renderItem={({item}) => (
          <View style={{width,height}}>
            <Image 
              source={{uri: item.src.portrait }}
              style={[styles.imageStyle]}
            />
          </View>
        )}
      />
      <FlatList
        ref={thumbnailRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 12}}
        style={{position: 'absolute', bottom: 10}}
        renderItem={({item,index}) => (
         <TouchableOpacity onPress={() => {
          setActiveIndex(index)
          handleIndexChange(index)
         }}>
           <Image
            key={index}
            source={{uri:item.src.portrait}}
            style={{
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              borderRadius:12,
              marginRight:IAMGE_SPACE,
              borderWidth: 2,
              borderColor: index === activeIndex ? '#fff' : 'transparent' 
            }}
          />
         </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: '100%',
    // backgroundColor:'#000'
  },
  imageStyle: {
    width: '100%',
    height: height
  }
})

export default courses