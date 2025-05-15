import Chessboard, { ChessboardRef } from 'react-native-chessboard';
import { StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import View = Animated.View;
import { useRef, useState } from 'react';

export default function App() {
    const ref = useRef<ChessboardRef>(null);
    const [flipped, setFlipped] = useState(false);

    const handleFlip = ()=>{
        // ref.current?.flip();
        setFlipped(p => !p)
    }

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
            <TouchableOpacity onPress={handleFlip} style={styles.flipButton} >
                <Text style={styles.flipText} >Flip</Text>
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
        paddingTop: '55%'
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
