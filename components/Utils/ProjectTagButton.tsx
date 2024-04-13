import { Text, Pressable } from 'react-native';
import { Link } from 'expo-router';


const ProjectTagButton = ({ tag, text }: { tag: string; text: string }) => {

  return (
    <Link href={`/projects?tag=${tag}`} asChild>
      <Pressable
        className="mb-2 mx-1 inline-flex items-center justify-center rounded-full bg-primary px-3 py-2 duration-300 hover:bg-gray-light"
        >
        <Text
          className="text-sm font-semibold text-white hover:text-gray-dark"
          >
          {text}
        </Text>
      </Pressable>
    </Link>
  );    


}  

export default ProjectTagButton;
