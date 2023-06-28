import * as SecureStore from 'expo-secure-store';

const save = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }
  catch (error) {
    console.log('Erro ao persistir dados: ' + error);
  }
  let livros = await getValueFor(key);
  console.log('Livro armazenado SAVE: ' + JSON.stringify(livros))
}

const saveIncremental = async (key, value) => {
  let arrayDadosAtuais = null;
  let arrayIncremental = [];
  // console.log('Dados recebidos do modal: ' + value) 

  try {
    arrayDadosAtuais = await getValueFor(key);
    // console.log("ANTES DO PARSE depois getValue" + arrayDadosAtuais);
    arrayDadosAtuais = JSON.parse(arrayDadosAtuais);
    // console.log('Parse do arrayDadosAtuais: ' + arrayDadosAtuais) 

    //  se existe dados atualmente, incrementa
    if (arrayDadosAtuais !== null && arrayDadosAtuais !== undefined) {
      arrayIncremental = arrayDadosAtuais;

      if (arrayIncremental.includes(value)) { // checa se já está nos favoritos
        alert('O livro já está na lista de favoritos!');
        return;
      } else {
        arrayIncremental.push(value);
        await save(key, arrayIncremental);
        alert('Livro adicionado aos favoritos!');
      }

      console.log('Dados livros salvos depois de null: ' + JSON.stringify(arrayDadosAtuais))
      // console.log('Dados livros salvos atualmente: ' + JSON.stringify(arrayIncremental))
    }
    else {  // se não existe, insere
      arrayIncremental.push(value);
      await save(key, arrayIncremental);
      alert('Livro adicionado aos favoritos!');
    }
  } catch (error) {
    console.log('Error ao persistir dados' + error);
  }

  let livros = await getValueFor(key);
  console.log('Stored data: ' + JSON.stringify(livros));
}

const getValueFor = async (key) => {
  let result = null;
  try {
    result = await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log('Erro ao recuperar dados: ' + error);
  }
  return result;
}

const deleteLivros = async (key) => {
  console.log("ENTROU DELETE id:" + key);

  await SecureStore.deleteItemAsync(key);
};

export { save, getValueFor, deleteLivros, saveIncremental };
