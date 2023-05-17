import React, {useEffect, useState} from 'react';
import MainContainer from './src/navigation/MainContainer';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <MainContainer />
    </PaperProvider>
  );
}
