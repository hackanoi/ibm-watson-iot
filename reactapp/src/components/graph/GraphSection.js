import React, { Component } from 'react';
import { Alert, View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import Graph from './Graph';
import { GRAPH_DATA_ENDPOINT } from '../../config';

const width = Dimensions.get('window').width * 0.8;

class GraphSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: [],
      humidity: [],
      light: []
    }
  }

  componentDidMount() {
    setInterval(() => {
      fetch(GRAPH_DATA_ENDPOINT)
        .then(response => {
          if (! response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(response => {
          response.reverse();
          const temperature = response.reduce((carry, item, index, array) => {
            carry.push({time: item.timestamp, value: item.temperature});
            return carry;
          }, []);
          const humidity = response.reduce((carry, item, index, array) => {
            carry.push({time: item.timestamp, value: item.humidity});
            return carry;
          }, []);
          const light = response.reduce((carry, item, index, array) => {
            carry.push({time: item.timestamp, value: item.light});
            return carry;
          }, []);
          this.setState({temperature, humidity, light});
        })
        .catch(error => {
          Alert.alert('Error', error.message || 'Error when fetching graph data from server');
        });
    }, 3000);
  }

  render() {
    const graphProps = {};
    graphProps.yAccessor = (d) => d.value;
    graphProps.xAccessor = (d) => new Date(d.time);
    graphProps.width = width;
    graphProps.height = 100;

    return (
      <ScrollView
        style={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        pagingEnabled={true}
      >
        <Graph {...graphProps} data={this.state.temperature} unit="&deg;C" />
        <Graph {...graphProps} data={this.state.humidity} unit="%" />
        <Graph {...graphProps} data={this.state.light} unit="lux" />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
  }
});

export default GraphSection;