import React, { Component, PropTypes } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  Path,
  Group,
  Shape,
  Surface,
  Transform
} from 'ReactNativeART';
import * as graphUltis from './graphUltis';

const windowWidth = Dimensions.get('window').width;
const width = windowWidth * 0.8;

class Graph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const yAccessor = this.props.yAccessor;
    const xAccessor = this.props.xAccessor;
    const data      = this.props.data;
    const TickWidth = 47;

    if (! data.length) {
      return <View style={styles.container} />;
    }

    const lineGraph = graphUltis.createLineGraph({
      data,
      xAccessor,
      yAccessor,
      width: width,
      height: 100
    });
    const path = lineGraph.path;
    const ticks = lineGraph.ticks;
    const tickXFormat = lineGraph.scale.x.tickFormat(null, '%I:%M:%S');

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Surface width={width} height={130}>
            <Group x={0} y={0}>
              <Shape
                d={path}
                stroke='#ffffff'
                strokeWidth={2}
              />
            </Group>
          </Surface>

          <View key={'ticksX'}>
            {ticks.map((tick, index) => {
              const tickStyles = {};
              tickStyles.width = TickWidth;
              tickStyles.left = tick.x - (TickWidth / 2);
              tickStyles.color = '#ffffff';

              return (
                <Text key={index} style={[styles.tickLabelX, tickStyles]}>
                  {tickXFormat(new Date(tick.datum.time * 1000))}
                </Text>
              );
            })}
          </View>

          <View key={'ticksY'} style={styles.ticksYContainer}>
            {ticks.map((tick, index) => {
              const value = yAccessor(tick.datum);

              const tickStyles = {};
              tickStyles.width = TickWidth;
              tickStyles.left = tick.x - Math.round(TickWidth * 0.5);

              tickStyles.top = tick.y + 2 - Math.round(TickWidth * 0.55);

              return (
                <View key={index} style={[styles.tickLabelY, tickStyles]}>
                  <Text style={styles.tickLabelYText}>
                    {value} {this.props.unit}
                  </Text>
                </View>
              );
            })}
          </View>

          <View key={'ticksYDot'} style={styles.ticksYContainer}>
            {ticks.map((tick, index) => (
              <View
                key={index}
                style={[styles.ticksYDot, {
                  left: tick.x - 3,
                  top: tick.y - 3,
                }]}
              />
            ))}
          </View>
        </View>
      </View>
    );
  }
}

Graph.propTypes = {
  data: PropTypes.array.isRequired,
  xAccessor: PropTypes.func.isRequired,
  yAccessor: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    width: windowWidth,
    backgroundColor: '#11a8ab',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapper: {

  },

  tickLabelX: {
    fontFamily: 'Ubuntu-Light',
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    textAlign: 'center',
  },

  ticksYContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  tickLabelY: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
  },

  tickLabelYText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Ubuntu-Light',
  },

  ticksYDot: {
    position: 'absolute',
    width: 7,
    height: 7,
    backgroundColor: '#ffffff',
    borderRadius: 100,
  },
})

export default Graph;