import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react';
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import BuscarPacientePsico from '../Paciente/BuscarPacientePsico'


export function MostrarFTP() {
    const navegador = useNavigate()
    const { token } = useAuth()       
    const { noExpediente, fecha } = useParams()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [empleado, setEmpleado] = useState([]);
    const [ficha, setFicha] = useState([]);

    useEffect(() => {
        const getNoEmpleado = async () => {
            try {

                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                const no_Empleado = response.data.user_info.no_trabajador
                setNoEmpleado(no_Empleado)
                setEmpleado(response.data.user_info)
                console.log(response)
            } catch (error) {
                console.error('Error al obtener ID de empleado:', error);
            }
        };

        getNoEmpleado();
    }, [token]);

    const getFicha = async (data) => {
        try {
            const url = `http://127.0.0.1:8000/api/get_ficha_psicologia/${noExpediente}/${fecha}/`
            const response = await axios.get(url,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
            setFicha(response.data)
            console.log(data)
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    useEffect(() => {
        getFicha()
    }, [token]);

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_psicologia">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Ficha técnica de psicología</li>
                    </ol>
                </nav>
            </div>

            <div className='m-2'>
                <h3 className="mt-4 mb-4 subtitulo">Ficha técnica de psicología</h3>
            </div>

            <h3 className="subtitulo_2">Datos del paciente</h3>
            <div className="ml-10 container">
                <div className='row'>
                    <div className=" col">
                        <label className=' etiqueta' htmlFor="fecha">Fecha: </label>
                        <input className="entrada" id='fecha' name='fecha' type="date"
                            value={ficha?.fecha_visita} readOnly/>
                    </div>

                    <div className="mt-2 col">
                        <label className=' etiqueta' htmlFor="tipo_cons">Tipo de consulta: </label>
                        <input className="entrada" id='tipo_cons' name='tipo_cons' type="text"
                            value={ficha?.visita?.tipo_consulta} readOnly/>
                    </div>

                    <div className="col">
                        <label className='mt-2 etiqueta' htmlFor="visita">Visita: </label>
                        <input className="entrada" id='visita' name='visita' type="text"
                            value={ficha?.visita?.tipo_visita} readOnly/>
                    </div>
                </div>

                <div className="mt-2 row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="escolaridad">Escolaridad:</label>
                        <input className="entrada" id='escolaridad' name='escolaridad' type="text"
                            value={ficha?.visita?.escolaridad} readOnly/>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="acompania">Acompañante:</label>
                        <input className="entrada" id='acompania' name='acompania' type="text"
                            value={ficha?.visita?.acompaniante} readOnly/>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="parentesco">Parentesco:</label>
                        <input className="entrada" id='parentesco' name='parentesco' type="text"
                            value={ficha?.visita?.parentesco} readOnly/>
                    </div>
                </div>

                <h3 className="subtitulo_2">Datos del paciente</h3>
                <div className="mt-2 mb-3 row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="motivo_consulta">Motivo de consulta</label>
                        <textarea id="motivo_consulta" placeholder="..." className="text-amplio"
                            value={ficha?.visita?.motivo_consulta} readOnly/>
                    </div>
                </div>

                <div className="mt-2 mb-3 row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="antecedentes">Antecedentes</label>
                        <textarea id="antecedentes" placeholder="..." className="text-amplio"
                            value={ficha?.diagnostico?.antecedentes} readOnly/>
                    </div>
                </div>

                <div className="mt-2 row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="impresion_diagnostica">Impresión diagnóstica</label>
                        <textarea id="impresion_diagnostica" placeholder="..." className="text-amplio"
                            value={ficha?.diagnostico?.impresion_diagnostica} readOnly/>
                    </div>
                </div>

                <div className="mt-2 mb-3 row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="tratamiento">Tratamiento:</label>
                        <textarea id="tratamiento" placeholder="..." className="text-amplio"
                            value={ficha?.tratamiento?.tratamiento} readOnly/>
                    </div>
                </div>

                <div className="mt-2 mb-3 row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="sugerencias">Sugerencias y recomendaciones:</label>
                        <textarea id="sugerencias" placeholder="..." className="text-amplio"
                            value={ficha?.tratamiento?.sugerencia} readOnly/>
                    </div>
                </div>

                <div className="mt-2 mb-3 row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="valoracion">Valoración PE:</label>
                        <textarea id="valoracion" placeholder="..." className="text-amplio"
                            value={ficha?.tratamiento?.valoracion} readOnly/>
                    </div>
                </div>

                <div className="mt-5 mb-4 text-center">
                    <label className="etiqueta" htmlFor="psicologo">Psicólogo(A)</label>
                    <input className="datos_lectura" id='psicologo' name='psicologo' type="text"
                        value={empleado.nombre_empleado} readOnly />

                    <label className="etiqueta" htmlFor="cedula_psi">Cédula</label>
                    <input className="datos_lectura" id='cedula_psi' name='cedula_psi' type="text"
                        value={empleado.cedula} readOnly />
                </div>
            </div>
        </div>
    )
}
