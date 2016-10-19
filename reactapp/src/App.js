import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import Graph from './components/graph/GraphSection';
import Records from './components/records/RecordsSection';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Graph />
        <Records records={[]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

export default App;