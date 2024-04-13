import { Projects } from '@/types/projects';
import { View } from 'react-native';
import ProjectItem from './ProjectItem';

const ProjectsDisplay = ({ projects }: { projects: Projects[]; }) => {
    return (
        
        <View className="mx-auto max-w-c-1280 px-4 md:px-8 xl:px-0">
            <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5 xl:gap-10">
            {projects.map((project) => 
                <ProjectItem 
                    key={project._id}
                    project={project} 
                    />
            )}
            </View>
        </View>
    );
} 

export default ProjectsDisplay;
