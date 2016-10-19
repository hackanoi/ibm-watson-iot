import React, { Component, PropTypes } from 'react';
import { Alert, ListView, StyleSheet, Text, View, RefreshControl  } from 'react-native';
import Record from './Record';
import { RECENT_DATA_ENDPOINT } from '../../config';

class RecordsSection extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(this.props.records),
      refreshing: false,
    };

    this._onRefresh = this._onRefresh.bind(this);
  }

  componentDidMount() {
    this._onRefresh();
  }

  _onRefresh() {
    this.setState({refreshing: true});

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    fetch(RECENT_DATA_ENDPOINT)
      .then(response => {
        if (! response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => {
        this.setState({
          refreshing: false,
          dataSource: ds.cloneWithRows(response)
        });
      })
      .catch(error => {
        this.setState({ refreshing: false });
        Alert.alert('Error', error.message || 'Error when fetching data from server');
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => <Record record={rowData} />}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          renderSeparator={(sectionId, rowId, adjacentRowHighlighted) => {
            return <View key={rowId} style={styles.separator}/>
          }}
        />
      </View>
    );
  }
}

RecordsSection.propTypes = {
  records: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#394264',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#11a8ab',
  }
})

export default RecordsSection;