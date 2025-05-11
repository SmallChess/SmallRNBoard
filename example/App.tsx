import Chessboard, { ChessboardRef } from 'react-native-chessboard';
import { StyleSheet, Animated, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import View = Animated.View;
import { useEffect, useRef } from 'react';

export default function App() {
  const ref = useRef<ChessboardRef>(null);

  useEffect(() => {
    (async () => {
      await ref.current?.move({ from: 'e2', to: 'e4' });
      await ref.current?.move({ from: 'e7', to: 'e5' });
      await ref.current?.move({ from: 'd1', to: 'f3' });
      await ref.current?.move({ from: 'a7', to: 'a6' });
      await ref.current?.move({ from: 'f1', to: 'c4' });
      await ref.current?.move({ from: 'a6', to: 'a5' });
      // await ref.current?.move({ from: 'f3', to: 'f7' });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Chessboard
        ref={ref}
        onMove={({ state }) => {
          if (state.in_checkmate) {
            console.log('Life goes on.');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '55%',
  },
});
