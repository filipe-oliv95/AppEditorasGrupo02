import React, { createContext, useState } from "react";
import jwt_decode from 'jwt-decode';

//Contexto
export const DataContext = createContext({});

//Contexto Provider
export const DataProvider = ({ children }) => {
    const [dadosUsuario, setDadosUsuario] = useState('');

    //essa constante receberá como parâmero um jwt do backend e o decodificará
    const armazenarDadosUsuario = ( jwt ) => {
        var jwtDecodificado = jwt_decode(jwt);

        //.user - chave do json retornado pelo backend que contem os dados do usuario logado
        //a partir da linha abaixo, o conteudo de usuário será a string:
        //{\"id\":1,\"username\":\"user\",\"email\":\"user@mail.com\",\"roles\":[\"ROLE_USER\"]}
        var usuario = jwtDecodificado.user;

        //a string json é transformada em um objeto Javascript
        usuario = JSON.parse(usuario);

        //setando os dados de usuário em um array
        setDadosUsuario({
            id: usuario?.id,
            nome: usuario?.username,
            email: usuario?.email,
            token: jwt
        })
        //o ponto de interrogação (?) é usado para caso o item seja nulo, retorna nulo e nao da erro
        //para acessar os dados, apenas informar dadosUsuario.id
    }

    return (
        //o contexto criado será retornado
        <DataContext.Provider value={{
            dadosUsuario,
            armazenarDadosUsuario
        }}>
            { children }
        </DataContext.Provider>
    )
}