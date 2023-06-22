import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { ENDERECO_API } from '../../views/util/Constantes';

export default function FormEnderecoCliente () {

    const { state } = useLocation();

    const [idEnderecoCliente, setIdEnderecoCliente] = useState();
    const [rua, setRua] = useState();
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState();
    const [cep, setCep] = useState();
    const [cidade, setCidade] = useState();
    const [estado, setEstado] = useState();
    const [complemento, setComplemento] = useState();

    useEffect(() => {

        if (state != null && state.id != null) {

            axios.get(ENDERECO_API + "api/endereco/" + state.id)
            .then((response) => {
                
                setIdEnderecoCliente(response.data.idEnderecoCliente)
                setRua(response.data.rua)
                setNumero(response.data.numero)
                setBairro(response.data.bairro)
                setCep(response.data.cep)
                setCidade(response.data.cidade)
                setEstado(response.data.estado)
                setComplemento(response.data.complemento)
            })
        }
        
    }, [state])

    function salvar() {

		let enderecoRequest = {

			rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            cidade: cidade,
            estado: estado,
            complemento: complemento,
		}

        if (idEnderecoCliente != null) { //Alteração:

            axios.put(ENDERECO_API + "api/endereco/" + idEnderecoCliente, enderecoRequest)
		    .then((response) => { console.log('Endereço do cliente alterado com sucesso.') })
		    .catch((error) => { console.log('Erro ao alter o endereço do cliente.') })

        } else { //Cadastro:
        
            axios.post(ENDERECO_API + "api/endereco/", enderecoRequest)
		    .then((response) => { console.log('Endereço do cliente cadastrado com sucesso.') })
		    .catch((error) => { console.log('Erro ao incluir o endereço do cliente.') })

        }
	}

    return (

        <div>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    { idEnderecoCliente === undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Endereço do Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    { idEnderecoCliente !== undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Endereço do Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Input
                                required
                                fluid
                                label='Rua'
                                maxLength="200"
                                value={rua}
                                onChange={e => setRua(e.target.value)}
                            />


                            <Form.Input
                                required
                                fluid
                                label='Número'
                                maxLength="200"
                                value={numero}
                                onChange={e => setNumero(e.target.value)}
                            />

                            <Form.Input
                                required
                                fluid
                                label='Bairro'
                                maxLength="200"
                                value={bairro}
                                onChange={e => setBairro(e.target.value)}
                            />

                            <Form.Input
                                required
                                fluid
                                label='CEP'
                                maxLength="200"
                                value={cep}
                                onChange={e => setCep(e.target.value)}
                            />

                            <Form.Input
                                required
                                fluid
                                label='Cidade'
                                maxLength="200"
                                value={cidade}
                                onChange={e => setCidade(e.target.value)}
                            />

                            <Form.Input
                                required
                                fluid
                                label='Estado'
                                maxLength="200"
                                value={estado}
                                onChange={e => setEstado(e.target.value)}
                            />

                            <Form.Input
                                required
                                fluid
                                label='Complemento'
                                maxLength="200"
                                value={complemento}
                                onChange={e => setComplemento(e.target.value)}
                            />

                        </Form>

                        <div style={{marginTop: '4%'}}>

                            <Button
                                label='Voltar'
                                circular
                                color='orange'
                                icon='reply'
                                as={Link} 
                                to='/list-endereco-cliente'
                            />

                            <Button
                                label='Salvar'
                                circular
                                color='blue'
                                icon='save'
                                floated='right'
                                onClick={() => salvar()}
                            />

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    );

}