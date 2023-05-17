import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageViewer from 'react-native-image-zoom-viewer';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import axios from 'axios';

const GoogleDriveImages = ({folderId}) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchGoogleDriveImages();
  }, []);

  const fetchGoogleDriveImages = async () => {
    try {
      //   const folderId = folderId; // Replace with your actual folder ID
      const apiKey = 'AIzaSyCvY4akRc81P9TiWBA19g0miReFO5kipY4'; // Replace with your API key

      const response = await axios.get(
        `https://www.googleapis.com/drive/v3/files`,
        {
          params: {
            q: `'${folderId}' in parents`,
            fields: 'files(id, name)',
            key: apiKey,
          },
        },
      );

      const imageFiles = response.data.files.filter(
        file => file.name.endsWith('.jpg') || file.name.endsWith('.png'),
      );

      const urls = imageFiles.map(
        file => `https://drive.google.com/uc?id=${file.id}`,
      );

      setImageUrls(urls);
    } catch (error) {
      console.error('Error fetching images from Google Drive:', error);
    }
  };

  const handleImageClick = index => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const renderImages = () => {
    const rows = [];
    const perRow = 3; // Number of images per row
    const totalImages = imageUrls.length;

    for (let i = 0; i < totalImages; i += perRow) {
      console.log('hii');
      const rowImages = imageUrls.slice(i, i + perRow);
      const screenWidth = Dimensions.get('window').width;
      const imageWidth = screenWidth * 0.31;

      const images = rowImages.map((url, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleImageClick(i + index)}
          activeOpacity={0.8}>
          <Image
            source={{uri: url}}
            style={[styles.image, {width: imageWidth, height: imageWidth}]}
          />
        </TouchableOpacity>
      ));

      rows.push(
        <View key={i} style={styles.row}>
          {images}
        </View>,
      );
    }

    return rows;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>"Model"</Text>
      {renderImages()}
      {modalVisible && selectedImageIndex !== null && (
        <Modal
          visible={modalVisible}
          transparent
          onRequestClose={() => setModalVisible(false)}>
          <ImageViewer
            imageUrls={imageUrls.map(url => ({url}))}
            index={selectedImageIndex}
            onSwipeDown={() => setModalVisible(false)}
            enableSwipeDown
            renderIndicator={() => null}
            renderHeader={() => (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Icon name="close" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          />
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#F5F7F8',
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    paddingLeft: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default GoogleDriveImages;
