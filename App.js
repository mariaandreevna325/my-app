import React, { useState } from 'react'; 
import { StatusBar, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Button, FlatList } from 'react-native';

export default function App() { 
  const [notification, setNotification] = useState("Ход крестика");
  const [board, setBoard] = useState(Array(9).fill(" "));
  const [score, setScore] = useState({ X: 0, O: 0 });

  const handleCellPress = (index) => {
    if (board[index] === " ") {
      const newBoard = [...board];
      const currentPlayer = getCurrentPlayer();
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const winner = calculateWinner(newBoard);
      if (winner) { 
        setNotification(`Игрок ${winner} победил!`); 
        setScore({ ...score, [winner]: score[winner] + 1 }); 
      } else if (newBoard.every(cell => cell !== " ")) { 
        setNotification("Ничья!"); 
      } else { 
        setNotification(`Игрок ${currentPlayer === "X" ? "O" : "X"}'s ход`); 
      }
    }
  };

  const getCurrentPlayer = () => {
    const xCount = board.filter(cell => cell === 'X').length;
    const oCount = board.filter(cell => cell === 'O').length;
    return xCount === oCount ? 'X' : 'O';
  };

  const calculateWinner = (board) => { 
    const lines = [ 
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) { 
      const [a, b, c] = lines[i]; 
      if (board[a] && board[a] === board[b] && board[a] === board[c]) { 
        return board[a]; 
      }
    }
    return null; 
  };

  const restartGame = () => { 
    setNotification("Ход нолика"); 
    setBoard(Array(9).fill(" "));
  };

  const renderCell = ({ item, index }) => (
    <TouchableOpacity
      style={styles.boardCell} 
      onPress={() => handleCellPress(index)} 
    >
      <Text style={styles.cellText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
          <Text style={styles.gameTitle}>Крестики-Нолики</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>X: {score.X}</Text>
            <Text style={styles.scoreText}>O: {score.O}</Text>
          </View>
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>{notification}</Text>
          </View>
          <FlatList
            style={styles.list}
            data={board}
            numColumns={3}
            renderItem={renderCell}
            keyExtractor={(item, index) => index.toString()}
          />
          <StatusBar style="auto" />
          <View style={styles.restartButtonContainer}>
            <Button title="Перезапуск" onPress={restartGame} />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  gameTitle: {
    marginTop: 60,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  restartButtonContainer: {
    marginTop: 10, 
    borderRadius: 100, 
    marginBottom: 270,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  scoreText: {
    fontSize: 18,
  },
  notificationContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  notificationText: {
    fontSize: 18,
  },
  list: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  boardCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    height: 100,
  },
  cellText: {
    fontSize: 36,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.2,
  },
  gameBoard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//ghbdtn
//vdvmdnvom