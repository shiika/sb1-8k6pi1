import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ClipboardItem } from './components/ClipboardItem';
import { useClipboardHistory } from './hooks/useClipboardHistory';

const App = () => {
  const { history, copyToClipboard } = useClipboardHistory();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Clipboard History</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {history.map((item) => (
          <ClipboardItem
            key={item.id}
            content={item.content}
            timestamp={item.timestamp}
            onPress={() => copyToClipboard(item.content)}
          />
        ))}
        {history.length === 0 && (
          <Text style={styles.emptyText}>No clipboard history yet</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 20,
  },
});