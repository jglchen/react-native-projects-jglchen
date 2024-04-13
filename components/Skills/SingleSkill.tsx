import { Skill } from "@/types/skill";
import { Image, Pressable } from 'react-native';
import { getImageSource } from '@/lib/imagesource';

const SingleSkill = ({ skill, selectSkill, skillSelected, imageStyle }: { skill: Skill; selectSkill: (s: string)  => void; skillSelected: string; imageStyle:{width: number; height: number;}}) => {
    const { srno, image, id } = skill;

    return (
        <Pressable
            onPress={() => selectSkill(id)}
            className={`block relative aspect-square cursor-pointer opacity-100 transition-all duration-300 hover:opacity-65 bg-white rounded-lg ${skillSelected === id ? "border-4 border-[#DC2626]": ""}`}
            >
            <Image 
                className="p-2"
                source={getImageSource(image)} style={imageStyle}
                resizeMode={id === 'typescript' ? 'cover': 'contain'}
                />
        </Pressable>
   )    
}

export default SingleSkill;


