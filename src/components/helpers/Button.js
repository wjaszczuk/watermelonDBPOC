import React from 'react';
import {Button as RNButton, View} from 'react-native';

import styles from './styles';

const Button = ({title, onPress, disabled = false}) => (
  <View style={styles.button}>
    <RNButton title={title} onPress={onPress} color="#EC5B59" disabled={disabled}/>
  </View>
);

export default Button;
