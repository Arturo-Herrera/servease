import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const CustomAlert = ({ message, type, visible, onHide }) => {
  const [translateY] = React.useState(new Animated.Value(-100));

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onHide();
          });
        }, 2000);
      });
    }
  }, [visible, translateY, onHide]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }], backgroundColor: type === 'success' ? 'green' : 'red' }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 90,
    left: 50,
    right: 50,
    padding: 15,
    zIndex: 1000,
    alignItems: 'center',
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomAlert;