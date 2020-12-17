import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import withObservables from '@nozbe/with-observables';

// We observe and render the counter in a separate component so that we don't have to wait for the database
// until we can render the component. You can also prefetch all data before displaying the list
const RawCounter = ({count}) => count;
const isAndroid = Platform.OS === 'android';

const Counter = withObservables(['observable'], ({observable}) => ({
  count: observable,
}))(RawCounter);

export function ListItem({title, countObservable, onPress}) {
  return isAndroid ? (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.listItemCounter}>
          <Counter observable={countObservable} />
        </Text>
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={styles.listItem}
      activeOpacity={0.5}>
      <Text style={styles.listItemTitle} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.listItemCounter}>
        <Counter observable={countObservable} />
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#f0f0f0',
    height: Platform.select({android: 56, ios: 44}),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: -1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  listItemTitle: {flex: 1, fontWeight: '500'},
  listItemCounter: {width: 30, textAlign: 'right', opacity: 0.6},
});
