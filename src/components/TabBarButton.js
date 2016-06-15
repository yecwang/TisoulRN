import React, {PropTypes} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default React.createClass({
  displayName: 'TabBarButton',
  propTypes: {
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  },
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.action}
        style={styles.button}
        >
        <Text style={this.props.isSelected && styles.selectedText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selected: {
    backgroundColor: 'yellow'
    //color: '#fff',
    
  },
  selectedText: {
    color: 'green',
    fontWeight: 'bold', 
  }
});
