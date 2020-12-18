import React, {Component, Fragment} from 'react';
import {SafeAreaView, Alert, Text, View, Image, TextInput} from 'react-native';
import {ScrollView} from 'react-navigation';

import {generate100, generate10k} from '../models/generate';
import Button from './helpers/Button';
import styles from './helpers/styles';
import BlogList from './BlogList';

import logoSrc from './assets/logo-app.png';

class Root extends Component {
  state = {
    isGenerating: false,
    search: '',
    isSearchFocused: false,
    synchronizationInProgress: false,
  };

  generateWith = async (generator) => {
    this.setState({isGenerating: true});

    const count = await generator(this.props.database);
    Alert.alert(`Generated ${count} records!`);

    this.setState({isGenerating: false});
  };

  generate100 = () => this.generateWith(generate100);

  generate10k = () => this.generateWith(generate10k);

  handleTextChanges = (v) => this.setState({search: v});

  handleOnFocus = () => this.setState({isSearchFocused: true});

  handleOnBlur = () => this.setState({isSearchFocused: false});

  onlineSync = () => {
    this.setState({synchronizationInProgress: true});
    this.props.synchronize().finally(() => {
      this.setState({synchronizationInProgress: false});
    });
  };

  removeBlogs = async () => {
    this.setState({synchronizationInProgress: false});
    await this.props.database.action(async () => {
      try {
        const blogs = await this.props.database.collections
          .get('blogs')
          .query()
          .fetch();

        const deleted = blogs.map((blogs) => blogs.prepareDestroyPermanently());

        await this.props.database.batch(...deleted);
        this.setState({synchronizationInProgress: true});
      } catch (e) {}
      this.setState({synchronizationInProgress: false});
    });
  };

  render() {
    const {
      search,
      isGenerating,
      isSearchFocused,
      synchronizationInProgress,
    } = this.state;
    const {database, navigation} = this.props;

    return (
      <ScrollView>
        <SafeAreaView>
          {!isSearchFocused && (
            <Fragment>
              <Image style={styles.logo} source={logoSrc} />
              <View style={styles.marginContainer}>
                {!synchronizationInProgress && (
                  <>
                    <Text style={styles.header}>Generate:</Text>
                    <View style={styles.buttonContainer}>
                      <Button
                        title="100 records"
                        onPress={this.generate100}
                        disabled={this.state.synchronizationInProgress}
                      />
                      <Button
                        title="10,000 records"
                        onPress={this.generate10k}
                        disabled={this.state.synchronizationInProgress}
                      />
                      <Button
                        title="Online sync"
                        onPress={this.onlineSync}
                        disabled={this.state.synchronizationInProgress}
                      />
                      <Button title="Remove blogs" onPress={this.removeBlogs} />
                    </View>
                  </>
                )}
                {synchronizationInProgress && (
                  <Text>Online synchronization</Text>
                )}
              </View>
            </Fragment>
          )}

          <TextInput
            style={{padding: 5, fontSize: 16}}
            placeholder="Search ..."
            defaultValue=""
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            onChangeText={this.handleTextChanges}
          />
          {!isGenerating && (
            <BlogList
              database={database}
              search={search}
              navigation={navigation}
            />
          )}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default Root;
