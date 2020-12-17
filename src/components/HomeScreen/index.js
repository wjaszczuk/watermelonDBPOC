import React from 'react';
import {SafeAreaView} from 'react-native';
import {useDatabase} from '../../hooks/useDatabase';
import {useNavigation} from '@react-navigation/core';

export function HomeScreen() {
  const database = useDatabase();

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <BlogList database={database} navigation={navigation} />
    </SafeAreaView>
  );
}
