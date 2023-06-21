import React, { createContext, useState } from "react";
import jwt_decode from 'jwt-decode';

//Contexto
export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [dadosUsuarios, setDadosUsuarios] = useState('');

    // Provedor do contexto.
    const armazenarDadosUsuario = (jwt) => {
        var jwtDecodificado = jwt_decode(jwt);

        // .user = chave do json retornado pelo backend que contem os dados do ususario logado.
        // A partir da linha a baixo, o conteudo do usuario sera a string:
        // {\"id\":1,\"username\":\"user\",\"email\":\"user@mail.com\",\"roles\":[\"ROLE_USER\"]}
        var usuario = jwtDecodificado.user;
        // Na linha de baixo a string json eh transformada em objeto javascript.
        usuario = JSON.parse(usuario);

        setDadosUsuarios({
            id: usuario?.id,
            nome: usuario?.username,
            email: usuario?.email,
            token: jwt
        })
    }

    return (
        <DataContext.Provider value={{
            dadosUsuarios,
            armazenarDadosUsuario
        }}>
            {children}
        </DataContext.Provider>
    );
}