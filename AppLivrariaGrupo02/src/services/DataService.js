import * as SecureStore from 'expo-secure-store';

const save = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, JSON.stringify(value));
    } catch (error) {
        console.log('Erro ao persistir dados: ' + error)
    }
    let editoras = await getValueFor(key);
    console.log('Editoras armazenadas: ' + JSON.stringify(editoras));
  }

const getValueFor = async (key) => {
    let result = null;

    try {
        result = await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log('Erro ao recuperar dados: ' + error)
    }
    return result;
}

const delEditora = async (key) => {
    await SecureStore.deleteItemAsync(key);
}

export { save, getValueFor, delEditora };