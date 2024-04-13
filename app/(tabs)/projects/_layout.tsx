import { Stack } from 'expo-router';

const ProjectsLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ 
					headerShown: false 
			}} />
		</Stack>
	);
};

export default ProjectsLayout;