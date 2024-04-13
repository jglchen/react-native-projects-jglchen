import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Projects } from '@/types/projects';
import ProjectDescr from '@/components/Projects/ProjectDescr';
import ProjectSidebar from '@/components/Projects/ProjectSidebar';

const ProjectDetailsPage = () => {
	const {t, i18n} = useTranslation(); 
	const { slug } = useLocalSearchParams();
	const [projects, setProjects] = useState<Projects[]>([]);
	const [project, setProject] = useState<Projects | null>(null);
	const [tagList, setTagList] = useState<string[]>([]);
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
		
		async function getProjectBySlug(){
			const projectsData = await AsyncStorage.getItem('allprojects');
			const _id = `projects/${slug}${locale === 'zhtw' ? '_zh-tw':''}.mdx`;
	        if (!projectsData){
				const data = await fetchAllProjects();
				await AsyncStorage.setItem('allprojects', JSON.stringify(projectsData));
				await AsyncStorage.setItem('allprojects_time', Date());
				const projects = data.filter((item: Projects) => item.locale.replace('-','') === locale);
				const project = data.find((item: Projects) => item._id === _id);
				setProjects(projects);
				setProject(project);
			}else{
				const projects = JSON.parse(projectsData).filter((item: Projects) => item.locale.replace('-','') === locale);
				const project = JSON.parse(projectsData).find((item: Projects) => item._id === _id);
				setProjects(projects);
				setProject(project);
			}
		}
		
		if (slug){
			getProjectBySlug();
		}
	
	},[i18n.language, slug]);

	useEffect(() => {
		async function fetchTagList(){
			const res = await fetch('https://projects-jglchen.vercel.app/api/taglist');
			if (!res.ok) {
			  // This will activate the closest `error.js` Error Boundary
			  throw new Error('Failed to fetch data')
			}
			const data = await res.json();
			return data;
		}

		async function getTagList(){
			const taglistData = await AsyncStorage.getItem('taglist');
			const dataStoreTime = await AsyncStorage.getItem('taglist_time');
			if (taglistData && (Date.parse(dataStoreTime ?? '') > Date.now() - maxStoragePeriod)){
				setTagList(JSON.parse(taglistData));
			}else{
				const data = await fetchTagList();
				await AsyncStorage.setItem('taglist', JSON.stringify(data));
				await AsyncStorage.setItem('taglist_time', Date());
				setTagList(data);
			}
		}		
	  
		getTagList();
	},[]);
	
	return (
		<SafeAreaView className="flex-1 dark:bg-slate-800">
			<ScrollView>
				<Stack.Screen options={{ headerShown: false }} />
				<View className="mx-auto max-w-c-1280 px-4 md:px-8 2xl:px-0">
					<View className="container">
						<View className="-mx-4 mt-4 flex flex-wrap">
							<View className="w-full px-4 lg:w-8/12">
								{project &&
								<ProjectDescr 
									project={project}
									/>
								}
							</View>
							<View className="w-full px-4 lg:w-4/12">
								<ProjectSidebar 
                                    slug={slug as string}
									projects={projects}
                                    tagList={tagList}
                                    />
 							</View>
						</View>
					</View>
				</View>
			</ScrollView>
    	</SafeAreaView>
	);
};

export default ProjectDetailsPage;