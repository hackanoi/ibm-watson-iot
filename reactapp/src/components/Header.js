import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

const Header = () => (
  <View style={styles.container}>
    <StatusBar hidden={true} />
    <Text style={styles.title}>IoT IBM App</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#394264',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Ubuntu-Medium',
    color: 'white',
    fontSize: 18
  }
});

export default Header;