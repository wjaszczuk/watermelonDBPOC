import {AppRegistry} from 'react-native';

import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {mySchema} from './src/models/schema';
import Blog from './src/models/Blog';
import Post from './src/models/Post';
import Comment from './src/models/Comment';

import {createNavigation} from './src/components/helpers/Navigation';

const adapter = new SQLiteAdapter({
  dbName: 'WatermelonDemo',
  schema: mySchema,
});

const database = new Database({
  adapter,
  modelClasses: [Blog, Post, Comment],
  actionsEnabled: true,
});

const Navigation = createNavigation({database});

AppRegistry.registerComponent('watermelonPOC', () => Navigation);
