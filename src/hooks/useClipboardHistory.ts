import { useState, useEffect } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ClipboardEntry {
  id: string;
  content: string;
  timestamp: string;
}

export const useClipboardHistory = () => {
  const [history, setHistory] = useState<ClipboardEntry[]>([]);

  useEffect(() => {
    loadHistory();
    const interval = setInterval(checkClipboard, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('clipboardHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const saveHistory = async (newHistory: ClipboardEntry[]) => {
    try {
      await AsyncStorage.setItem('clipboardHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const checkClipboard = async () => {
    const content = await Clipboard.getString();
    if (content && (!history.length || history[0].content !== content)) {
      const newEntry = {
        id: Date.now().toString(),
        content,
        timestamp: new Date().toLocaleString(),
      };
      const newHistory = [newEntry, ...history].slice(0, 50);
      setHistory(newHistory);
      saveHistory(newHistory);
    }
  };

  const copyToClipboard = (content: string) => {
    Clipboard.setString(content);
  };

  return {
    history,
    copyToClipboard,
  };
};