import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface ClipboardItemProps {
  content: string;
  timestamp: string;
  onPress: () => void;
}

export const ClipboardItem = ({ content, timestamp, onPress }: ClipboardItemProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.content} numberOfLines={2}>
          {content}
        </Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666666',
  },
});