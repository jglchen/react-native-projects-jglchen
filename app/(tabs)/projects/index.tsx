import { SafeAreaView, ScrollView, Text, View, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import {useTranslation} from 'react-i18next';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProjectsList from '@/components/Projects/ProjectsList';
import { Entypo } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

import { Projects } from '@/types/projects';

export default function ProjectsScreen() {
  const {t, i18n} = useTranslation(); 
  const { tag } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();

  const [projects, setProjects] = useState<Projects[]>([]);
  const maxStoragePeriod = 60*60*24*1000;
  const locale = i18n.language ?? 'en';
 
  useEffect(() => {
    async function fetchAllProjects(){
      const res = await fetch('https://projects-jglchen.vercel.app/api/allprojects');
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
      const data = await res.json();
      return data;
    }
    
    async function getAllProjects(){
      const projectsData = await AsyncStorage.getItem('allprojects');
      const dataStoreTime = await AsyncStorage.getItem('allprojects_time');
      if (projectsData && (Date.parse(dataStoreTime ?? '') > Date.now() - maxStoragePeriod)){
        const projects = JSON.parse(projectsData).filter((item: Projects) => {
          if (tag){
            return item.locale.replace('-','') === locale && item.tags?.includes(tag as string);
          }           
          return item.locale.replace('-','') === locale;
        }).sort((a:any, b: any) => b.priority - a.priority);
        
        setProjects(projects);
      }else{
        const data = await fetchAllProjects();
        await AsyncStorage.setItem('allprojects', JSON.stringify(data));
        await AsyncStorage.setItem('allprojects_time', Date());
        const projects = data.filter((item: Projects) => {
          if (tag){
            return item.locale.replace('-','') === locale && item.tags?.includes(tag as string);
          }
          return item.locale.replace('-','') === locale;
        }).sort((a:any, b: any) => b.priority - a.priority);
             
        setProjects(projects);
      }
    }   

    getAllProjects();

  },[i18n.language, tag]);
  
  return (
    <SafeAreaView className="flex-1 dark:bg-slate-800">
      <ScrollView>
        <View className="mx-auto max-w-screen-xl px-4 md:px-8 2xl:px-0 mt-4 xl:mt-5">
          <View className="container">
            {tag &&
            <View className="flex flex-row items-center md:w-4/5 xl:w-1/2 mx-auto mb-2 px-4">
              <Text
                className="font-bold text-xl xl:text-sectiontitle2 text-black dark:text-white "
                >{`${t('ProjectPage.tag')}: ${(tag as string).replace(/_/g,' ')}`}
              </Text>
              <Link href={`/projects`} asChild>
              <Pressable>
                <Entypo
                  name="circle-with-cross"
                  size={24}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginLeft: 10 }}
                />
              </Pressable>
              </Link>
            </View>
            }
            <Text className="mx-auto text-center text-[#1f2937] dark:text-[#e5e7eb] md:w-4/5 lg:w-3/5 xl:w-[46%] px-4">
              {t('ProjectPage.description')}
            </Text>
            <View className="py-2">
              <View className="container">
                <ProjectsList 
                  projects={projects}
                  />
              </View>
            </View>  
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
}
