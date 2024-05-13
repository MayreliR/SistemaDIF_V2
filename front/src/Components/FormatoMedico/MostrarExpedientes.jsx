import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import { CardPaciente } from "../Paciente/CardPaciente";

export function MostrarExpedientes() {
    const { token } = useAuth();
    const { noExpediente } = useNoExpediente(); // Obtener noExpediente del contexto
    const [expedientes, setExpedientes] = useState([]);
    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null);
    const navegador = useNavigate()
    const [userGroup, setUserGroup] = useState(null);

    useEffect(() => {
        const getIdUser = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                const group_usuario = response.data.user_info.name
                setUserGroup(group_usuario)
                console.log(response)
            } catch (error) {
                console.error('Error al obtener ID de empleado:', error);
            }
        };
        getIdUser();

    }, [token]);


    const getExpedientes = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/fichas_por_paciente/${noExpediente}`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
            setExpedientes(response.data);
        } catch (error) {
            console.error('Error al obtener ID del historial médico:', error);
        }
    }

    const toggleExpediente = (expedienteId) => {
        if (expedienteSeleccionado === expedienteId) {
            setExpedienteSeleccionado(null); // Si el expediente ya está seleccionado, lo cerramos
        } else {
            setExpedienteSeleccionado(expedienteId); // Si no, lo seleccionamos
        }
    }

    const handleEnfermeria = (fecha) => {
        navegador(`/mostrar_expediente/${fecha}`)
    }


    const handleOdonto = (fecha) => {
        navegador(`/mostrar_expediente_HistO/${fecha}`)
    }

    useEffect(() => {
        if (noExpediente) {
            getExpedientes();
        }
    }, [noExpediente, token]);

    return (
        <div className="container">
            <div className="mt-3 expediente-container">
                <CardPaciente id={noExpediente}></CardPaciente>

                {expedientes.map(expediente => (
                    <div key={expediente.id} className="expediente-item">
                        <div className="expediente-info" onClick={() => toggleExpediente(expediente.id)}>
                            <i className={`bi bi-folder${expediente.id === expedienteSeleccionado ? "2-open" : ""} folder cursor-pointer`}></i>
                            <p className="texto_1 cursor-pointer"> {expediente.fecha}</p>
                        </div>
                        {expediente.id === expedienteSeleccionado && (
                            <div className="">
                                <p className="texto_2 cursor-pointer" onClick={() => handleEnfermeria(expediente.fecha)}>Ficha Tecnica Enfermeria</p>
                                {userGroup == "Medico" && (
                                    <>
                                        <p className="texto_2">Ficha Tecnica Medica</p>
                                        <p className="texto_2">Historial clinico</p>
                                        <p className="texto_2">Recetas</p>
                                    </>)}
                                {userGroup == "Odontologo" && (
                                    <>
                                        <p className="texto_2 cursor-pointer" onClick={() => handleOdonto(expediente.fecha)}>Historial clinico dental</p>
                                        <p className="texto_2">Nota evolucion</p>
                                        <p className="texto_2">Nota subsecuente</p>
                                    </>)}

                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};