import { Text, Pressable } from 'react-native';
import { Link } from 'expo-router';


const LinkTagButton = ({ tag, text }: { tag: string; text: string }) => {

  return (
    <Link href={`/projects?tag=${tag}`} asChild>
      <Pressable
        className="bg-[#d1d5db] mb-2 mx-1 inline-flex items-center justify-center rounded-sm px-3 py-2 duration-300 hover:bg-primary dark:bg-[#2C303B] dark:hover:bg-primary"
        >
        <Text
          className="text-sm text-black hover:text-white dark:text-white"
          >
          {text}
        </Text>
      </Pressable>
    </Link>
  );    


}  

export default LinkTagButton;
