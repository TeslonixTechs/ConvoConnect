import { SafeAreaView } from "react-native-safe-area-context"
import { View, TextInput, TouchableOpacity, Text } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { useState,useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import books from './JSON/Bibleverse.json'
const BibleVerse = ({route, navigation}) => {
  const { params } = route;
  const book = params?.book;
  const chapter = params?.chapter
  const [data,setdata] = useState([])
  const [count,setcount] = useState(1)
  const fetchData = () => {
    try {
        const bookSearch = books.books.find(b => b.book === book);
        console.log(bookSearch)
        if (bookSearch) {
            const chapterData = bookSearch.chapters.find(chap => chap.chapter === chapter.toString());
            console.log(chapterData)
            if (chapterData) {
                setdata(chapterData.verses);
            } else {
                console.log(`Chapter ${chapter} not found in book ${book}.`);
            }
        } else {
            console.log(`Book ${book} not found.`);
        }
    } catch (error) {
        console.log('Error fetching chapter data:');
    }
};
useEffect(()=>{
  fetchData()
},[book,chapter]) 
const fontsize = [10,12,14,16,24]
const navigateToChapter = (num) => {
  const nextchapter = parseInt(chapter, 10) + num;
  const getChapter = books.books.find(b => b.book === book);
  const totalChapters = getChapter.chapters.length;
  const firstChapter = getChapter.chapters[0].chapter
  console.log(nextchapter)
  if (nextchapter >= firstChapter && nextchapter <= totalChapters) {
      navigation.navigate("Verse",{book:book,chapter:nextchapter})
  }
  else if (nextchapter < firstChapter) {
      return
  }
  else if (nextchapter > totalChapters) {
      return
  }
}; 
const handlecountplus=()=>{
  if(count>4){
      return count<6
  }
  setcount(add=>add+1)

  if(count===5){
      return
  }
}
const handlecountminus=()=>{
  if(count<2){
      return
  }
  setcount(add=>add-1)
  if(count===1){
      return
  }
}
  return (
    <SafeAreaView className="h-full flex w-screen">
      <View className="w-screen bg-slate-100 py-7 items-center">
      <View className="bg-green-950 h-14 w-64 rounded-xl flex justify-center items-center"><Text className="text-3xl text-white font-bold">{book}</Text></View>
      </View>
      <View className="flex flex-row w-screen bg-slate-100 justify-center gap-4 items-center">
        <TouchableOpacity onPress={()=>navigateToChapter(-1)} className="bg-amber-600 flex justify-center items-center rounded-full h-10 w-10" ><Icon name="arrow-left" size={27} color="#f7fafc" /></TouchableOpacity>
        <Text className="text-3xl font-bold">Chapter {chapter}</Text>
        <TouchableOpacity onPress={()=>navigateToChapter(+1)} className="bg-green-950 flex justify-center items-center rounded-full h-10 w-10"><Icon name="arrow-right" size={27} color="#f7fafc" /></TouchableOpacity>
    </View>
    <ScrollView className="flex-1 w-screen mt-4 pb-5">
      {data.map((item)=>(
        <View key={item.verse} className="flex flex-col">
          <Text style={{fontSize:fontsize[count-1]}}>{item.verse}. {item.text}</Text>
        </View>
      ))}
    </ScrollView>
    <View className="flex flex-row gap-3 w-screen h-fit py-2 bg-slate-100 items-center justify-center ">
      <TouchableOpacity className=" items-center bg-amber-500 h-10 rounded-xl w-10 flex justify-center" onPress={handlecountminus}><Icon name="minus" size={25} /></TouchableOpacity>
      <View className="flex justify-center w-fit items-center h-fit gap-1"><Text className="text-lg">fontsize</Text><Text className="text-3xl">{count}</Text></View>
      <TouchableOpacity onPress={handlecountplus} className=" items-center bg-amber-500 h-10 rounded-xl w-10 flex justify-center"><Icon name="plus" size={25} /></TouchableOpacity>
    </View>
    <View className="h-24 w-screen flex flex-row bg-green-950 py-5 px-3 justify-between">
        <TouchableOpacity onPress={() => navigation.navigate("Chapter",{book:book})} className="h-12 w-12 rounded-full bg-amber-500 flex justify-center items-center">
            <Icon name="arrow-left" size={37} color="#011" />
        </TouchableOpacity>
        <Icon onPress={() => navigation.navigate("Page")} name="home" color="orange" size={60} />
    </View>
    </SafeAreaView>
  )
}

export default BibleVerse;