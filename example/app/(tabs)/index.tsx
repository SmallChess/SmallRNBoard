import { View } from 'react-native';
import ChessboardContainer from 'src/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: 300,
          height: 300,
          marginTop: 100,
          marginLeft: 50,
        }}
      >
        <ChessboardContainer />
      </View>
    </GestureHandlerRootView>
  );
}
