import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

type SearchCourseSectionProps = {
    query?:string;
    onSearch:(query:string) => void,
    shouldFilter?:boolean;
}


const SearchCourseSection = ({
    query,
    onSearch,
    shouldFilter,
}:SearchCourseSectionProps) => {

  return (
    <View style={styles.searchbarContent}>
      <View style={styles.searchbarContainer}>
        <Ionicons
            style={styles.searchIcon} 
            name='search' 
            size={20} 
            
            />
        <TextInput 
            value=''
            onChange={(value) => {}}
            placeholder='Cursos, Documentacion, etc'
            style={styles.textField}
        />
      </View>
      {shouldFilter && (
        <Pressable style={styles.filterButton}>
            <Ionicons name='filter' size={20} />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    searchbarContent: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap:20,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchbarContainer: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    textField: {

    },
    filterButton:{
        height:44,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 4,
        backgroundColor: 'white',
        width: 40,
        marginRight:12,
    }
})

export default SearchCourseSection