import { Text, Pressable, Linking, Alert } from 'react-native';
import { useCallback } from 'react';

const TagButton = ({ url, text }: { url: string; text: string; }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  
  return (
    <Pressable
      onPress={handlePress}
      className="bg-[#d1d5db] mb-2 mx-1 inline-flex items-center justify-center rounded-sm px-3 py-2 duration-300 hover:bg-primary dark:bg-[#2C303B] dark:hover:bg-primary"
      >
      <Text
        className="text-sm text-black hover:text-white dark:text-white"
        >
        {text}
      </Text>
    </Pressable>
  );
}

export default TagButton;
