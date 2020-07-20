import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Text, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

import styles from './styles';
import Axios from 'axios';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECITYResponse {
  nome: string;
}

const Home = () => {
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  /* const [ufs, setUfs] = useState<string[]>([]);
  const [citys, setCitys] = useState<string[]>([]); */
  const navigation = useNavigation();
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    Axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);
      setUfs(ufInitials);
    });
  }, [])

  useEffect(() => {
    /* if(selectedUf === '0'){
      return;
    } */
    Axios.get<IBGECITYResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const ufcitys = response.data.map(city => city.nome);
      setCitys(ufcitys);
    });

  }, [selectedUf])

  function handleSelectUf() {
    /* uf.preventDefault();
    const value = uf
    setSelectedUf(value); */
  }

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city
    });
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>
        <View style={styles.footer}>

          
          {/* {ufs.map(uf => (
          <RNPickerSelect key={uf} items={[{
            label:uf,value:uf
          }]} 
          onValueChange={handleSelectUf} />))} */}

          
          
           

          <TextInput style={styles.input} placeholder="Digite a UF" value={uf} maxLength={2} autoCapitalize="characters" autoCorrect={false} onChangeText={setUf}/>
          <TextInput style={styles.input} placeholder="Digite a Cidade" value={city} autoCorrect={false} onChangeText={setCity}/>
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#fff" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;