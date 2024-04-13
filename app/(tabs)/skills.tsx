import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Projects } from '@/types/projects';
import Skills from "@/components/Skills";

export default function SkillsScreen() {
  const {t, i18n} = useTranslation(); 
  const [projects, setProjects] = useState<Projects[]>([]);
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
	    	if (!projectsData){
				const data = await fetchAllProjects();
				await AsyncStorage.setItem('allprojects', JSON.stringify(projectsData));
				await AsyncStorage.setItem('allprojects_time', Date());
				const projects = data.filter((item: Projects) => item.locale.replace('-','') === locale);
				setProjects(projects);
			}else{
				const projects = JSON.parse(projectsData).filter((item: Projects) => item.locale.replace('-','') === locale);
				setProjects(projects);
			}
		}

    	getAllProjects();
	
	},[i18n.language]);

  return (
    <SafeAreaView className="flex-1 dark:bg-slate-800">
	  <ScrollView>
		<View className="mx-auto mt-4 xl:mt-5">
          <View className="container">
            <Text className="mx-auto text-center text-[#1f2937] dark:text-[#e5e7eb] md:w-4/5 lg:w-3/5 xl:w-[46%] px-4">
              {t('SkillsPage.description')}
            </Text>
          </View>
        </View>
        <View className="py-2">
          <View className="container">
            <Skills 
              projects={projects}
              />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
