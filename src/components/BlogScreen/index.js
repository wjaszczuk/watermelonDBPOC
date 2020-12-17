import React from 'react';
import withObservables from '@nozbe/with-observables';
import {
  SafeAreaView,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import {ListItem} from '../ListItem';

const NastyCommentsItem = ({blog, onPress}) => (
  <ListItem
    title="Nasty comments"
    countObservable={blog.nastyComments.observeCount()}
    onPress={onPress}
  />
);

const RawPostItem = ({post, onPress}) => (
  <ListItem
    title={post.title}
    countObservable={post.comments.observeCount()}
    onPress={onPress}
  />
);

const PostItem = withObservables(['post'], ({post}) => ({
  post: post.observe(),
}))(RawPostItem);

export function Blog({blog, posts, navigation}) {
  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        renderItem={({item: post}) => (
          <PostItem
            post={post}
            key={post.id}
            onPress={() => navigation.navigate('Post', {post})}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <Button
              style={styles.button}
              title="Moderate"
              onPress={this.moderate}
            />
            <NastyCommentsItem
              blog={blog}
              onPress={() => navigation.navigate('ModerationQueue', {blog})}
            />
            <Text style={styles.postsListHeader}>Posts: {posts.length}</Text>
          </>
        )}
        keyExtractor={extractId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: Platform.select({android: {marginHorizontal: 12, marginBottom: 15}}),
  postsListHeader: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    padding: 10,
  },
});

const enhance = withObservables(['blog'], ({blog}) => ({
  blog: blog.observe(),
  posts: blog.posts.observe(),
}));

export const BlogScreen = enhance(Blog);
