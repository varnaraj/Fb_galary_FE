import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Box,
} from 'react-native';
import {Button} from 'react-native-paper';
import GoogleDriveImages from './pages/GoogleDriveImages';

export default function MainContainer() {
  return (
    <View>
      <Text>Hello</Text>

      {/* <GoogleDriveImages folderId={'1-8NA5z9ExBfsxq9P7xpoX4N-i0QniDFw'} /> */}
      {/* https://drive.google.com/drive/folders/1qc5M3nGEZa3FS6113DEXIhWi7ZZ_Ob7B?usp=sharing */}
      <GoogleDriveImages folderId={'1qc5M3nGEZa3FS6113DEXIhWi7ZZ_Ob7B'} />
    </View>
  );
}
