/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useChessboardProps } from '../context/props-context/hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

type BackgroundProps = {
  letters: boolean;
  numbers: boolean;
};

interface BaseProps extends BackgroundProps {
  white: boolean;
}

interface RowProps extends BaseProps {
  row: number;
}

interface SquareProps extends RowProps {
  col: number;
}

const Square = React.memo(
  ({ white, row, col, letters, numbers }: SquareProps) => {
    const { colors, isFlipped } = useChessboardProps();
    const backgroundColor = white ? colors.black : colors.white;
    const color = white ? colors.white : colors.black;
    const textStyle = { fontWeight: '500' as const, fontSize: 10, color };
    const newLocal = isFlipped ? col == 7 : col === 0;
    const numberStyle = isFlipped ? [textStyle, style.flexEnd, style.rotate180, { opacity: newLocal ? 1 : 0 }] : [textStyle, { opacity: newLocal ? 1 : 0 }]
    const letterStyle = isFlipped ? [textStyle, style.flexStart, style.rotate180] : [textStyle, style.flexEnd]
    
    return (
      <View
        style={{
          flex: 1,
          backgroundColor,
          padding: 4,
          justifyContent: 'space-between',
          flexDirection: isFlipped ? 'column-reverse' : 'column'
        }}
      >
        {numbers && (
          <Text style={numberStyle}>
            {'' + (8 - row)}
          </Text>
        )}
        {(row === 7 || row === 0) && letters && (
          <Text style={letterStyle}>
            {String.fromCharCode(97 + col)}
          </Text>
        )}
      </View>
    );
  }
);

const Row = React.memo(({ white, row, ...rest }: RowProps) => {
  const offset = white ? 0 : 1;
  return (
    <View style={styles.container}>
      {new Array(8).fill(0).map((_, i) => (
        <Square
          {...rest}
          row={row}
          col={i}
          key={i}
          white={(i + offset) % 2 === 1}
        />
      ))}
    </View>
  );
});

const Background: React.FC = React.memo(() => {
  const { withLetters, withNumbers } = useChessboardProps();
  return (
    <View style={{ flex: 1 }}>
      {new Array(8).fill(0).map((_, i) => (
        <Row
          key={i}
          white={i % 2 === 0}
          row={i}
          letters={withLetters}
          numbers={withNumbers}
        />
      ))}
    </View>
  );
});

export default Background;

const style = StyleSheet.create({
  flexEnd: { alignSelf: 'flex-end' },
  flexStart: { alignSelf: 'flex-start' },
  rotate180: { transform: [{ rotate: '180deg' }] }
})