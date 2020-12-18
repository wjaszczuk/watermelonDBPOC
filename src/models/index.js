import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {mySchema} from './schema';
import {Database} from '@nozbe/watermelondb';
import Blog from './Blog';
import Post from './Post';
import Comment from './Comment';
import {schemaMigrations as migrations} from './schemaMigrations';
import {dbSync} from './dbSync';

const adapter = new SQLiteAdapter({
  dbName: 'WatermelonDemo',
  schema: mySchema,
  migrations,
});

export const database = new Database({
  adapter,
  modelClasses: [Blog, Post, Comment],
  actionsEnabled: true,
});

export const synchronize = dbSync(database);
