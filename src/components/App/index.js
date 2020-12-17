import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../HomeScreen';
import {PostScreen} from '../PostScreen';
import {DatabaseContext} from '../DatabaseContext';
import {ModerationQueueScreen} from '../ModerationQueueScreen';
import {BlogScreen} from '../BlogScreen';

const Stack = createStackNavigator();

export function App() {
  return (
    <DatabaseContext>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Blog" component={BlogScreen} />
          <Stack.Screen
            name="ModerationQueue"
            component={ModerationQueueScreen}
          />
          <Stack.Screen name="Post" component={PostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DatabaseContext>
  );
}
