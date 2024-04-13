import { Text, View } from 'react-native';

type InputErrorProps = {
    messages?: string[];
    className?: string;
}

const InputError = ({ messages = [], className = '' }: InputErrorProps) => (
    <>
        {messages.length > 0 && (
            <>
                {messages.map((message, index) => (
                    <View key={index}>
                        <Text
                            className={`${className} text-base/[1.25rem] text-[#DE2626] dark:text-[#FEAAAA]`}>
                            {message}
                        </Text>
                    </View>
               ))}
            </>
        )}
    </>
)

export default InputError
