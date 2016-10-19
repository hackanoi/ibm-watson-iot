import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

function toReadableTime(timestamp) {
  const time = new Date(timestamp);
  return time.toLocaleTimeString() + ' ' + time.toLocaleDateString();
}

const Record = ({record}) => (
  <TouchableHighlight
    underlayColor='#50597b'
    style={styles.container}
    onPress={() => {}}
  >
    <View>
      <Text style={styles.text}>
        <Icon name="calendar" color="#ffffff" /> { toReadableTime(record.timestamp) }
      </Text>
      <View style={styles.cell}>
        <Text style={styles.text}>
          <Icon name="thermometer" color="#ffffff" /> {record.temperature} &deg;C
        </Text>
        <Text style={styles.text}>
          <Icon name="water" color="#ffffff" /> {record.humidity} %
        </Text>
        <Text style={styles.text}>
          <Icon name="light-bulb" color="#ffffff" /> {record.light} lux
        </Text>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#394264',
    padding: 10
  },
  cell: {
    flexDirection: 'row',
    paddingTop: 10
  },
  text: {
    flex: 1,
    fontFamily: 'Ubuntu-Light',
    color: '#ffffff'
  },
});

export default Record;