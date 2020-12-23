import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert
} from 'react-native';
import Card from '../components/Cards';
import COLORS from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import defaultStyles from '../constants/defaultStyles';

const StartGameScreen = (props) => {
  const {
    screen,
    buttonView,
    inputContainer,
    button,
    input
  } = styles;

  const {
    primaryColor,
    secondaryColor
  } = COLORS;

  const {
    onStartGame
  } = props;

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    // replace any character other than numbers with empty string 
    const validInputText = inputText.replace(/[^0-9]/g, '');
    setEnteredValue(validInputText);
  }

  const resetHandler = _ => {
    setEnteredValue('');
    setConfirmed(false);
  }

  const confirmHandler = _ => {
    const chosenNumber = parseInt(enteredValue);
    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number', 
      'Number has to be greater than 0 and less than 100', 
      [{text: 'Ok', style:'destructive', onPress: resetHandler}]);
      return;
    }

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  }

  let confirmedOutput;

  if(confirmed) {
    confirmedOutput = <Card style={styles.summaryContainer}>
      <Text>You selected: </Text>
      <NumberContainer>
        {selectedNumber}
      </NumberContainer>
      <Button title='Start game' onPress={() => onStartGame(selectedNumber)}/>
    </Card>
    
  }

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={screen}>
      <Text style={defaultStyles.titleText}>Start a new game!</Text>
      <Card style={inputContainer}>
        <Text>Enter a number</Text>
        <Input 
          style={input} 
          keyboardType='numeric'
          maxLength={2}
          onChangeText={numberInputHandler}
          value={enteredValue}
        />
        <View style={buttonView}>
          <View style={button}>
            <Button title='Reset' color={secondaryColor} onPress={resetHandler}/>
          </View>
          <View style={button}>
            <Button title='Confirm' color={primaryColor} onPress={confirmHandler}/>
          </View>
        </View>
      </Card>
      {
        confirmedOutput
      }
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%'
  },
  button: {
    width: 90
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
})

export default StartGameScreen;