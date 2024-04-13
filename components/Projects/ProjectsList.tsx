import { Projects } from '@/types/projects';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import {useTranslation} from 'react-i18next';
import ProjectsDisplay from './ProjectsDisplay';

const ProjectsList = ({ projects }: { projects: Projects[]; }) => {
	const { tag } = useLocalSearchParams();
    const {t, i18n} = useTranslation(); 
    
    if (!projects.length) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-2xl text-black dark:text-white">
                {t('ProjectPage.nowork')}
                </Text>
            </View>
        );
    } 
    
    return (
        <ProjectsDisplay 
            projects={projects}
           />
    );
};

export default ProjectsList;
