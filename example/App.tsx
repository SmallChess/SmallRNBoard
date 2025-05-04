import Chessboard, { ChessboardRef } from 'react-native-chessboard';
import { StyleSheet, Animated, StatusBar as RNStatusBar, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import View = Animated.View;
import { useEffect, useRef, useState } from 'react';

export default function App() {
  const ref = useRef<ChessboardRef>(null);
  const [flipped, setFlipped] = useState(false);

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
        isFlipped={flipped}
      />

      <TouchableOpacity onPress={() => setFlipped(p => !p)} style={styles.flipButton} >
        <Text style={styles.flipText} >{flipped ? "Black's Turn" : "White's Turn"}</Text>
      </TouchableOpacity>
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
  flipButton: {
    padding: 10,
    backgroundColor: '#246249',
    borderRadius: 8,
    margin: 10
  },
  flipText: {
    color: '#ffee'
  }
});
