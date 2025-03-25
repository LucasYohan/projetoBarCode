import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Linking } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function App() {

const [temPermissao, setTemPermissao] = useState(null);

const [digitalizado, setDigitalizado] = useState(false);

const [dados, setDados] = useState(null);


useEffect(() => {
  const obterPermissoesDaCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync();
    setTemPermissao(status === 'granted');
  };

  obterPermissoesDaCamera();
}, []);


const lidarComCodigoDigitalizado = ({type, data}) => {
    setDigitalizado(true);
    setDados(data);
    alert(`Codigo de barras do tipo ${type} e dados ${data} foram digitalizados!`)
};


const abrirLink = () => {
  Linking.openURL(dados);
};



if(temPermissao == null){
  return <Text>Solicitando permissão para uso da camera</Text>
}
if(temPermissao == false){
  return <Text>Sem acesso a camera</Text> 
}


return (
    <View style={styles.contaier}>
      <CameraView
      onBarcodeScanned={digitalizado ? undefined : lidarComCodigoDigitalizado}
      barcodeScannerSettings={{
        barcodeTypes: ['qr', 'pdf417']
      }}
      style={StyleSheet.absoluteFillObject}
      />
    <MaterialCommunityIcons
    name='qrcode-scan'
    size={100}  
    color='orange'
    style={styles.icone}
    />
    <Text style={styles.titulo}>Leitor de QR Code</Text>
    {digitalizado && (
      <Button color='orange' title={"Toque para digitalizar novamente"} onPress={() => setDigitalizado(false)}/>
  )}
    {digitalizado && <View style={styles.segBotao}><Button color='orange' title={'Abrir Link: ' + dados} onPress={abrirLink}/></View>}
    </View>
  );
}


const styles = StyleSheet.create({
    contaier: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    icone: {
      marginTop: 20,
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'darkorange'
    },
    segBotao: {
        marginTop: 15
    },
});