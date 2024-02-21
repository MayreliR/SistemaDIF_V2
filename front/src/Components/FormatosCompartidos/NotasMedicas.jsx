import { CardPaciente } from "../Paciente/CardPaciente"
export function NotasMedicas() {
    return (
        <div>
            <h3 className='subtitulo'>Notas médicas</h3>

            <div className='ml-10 mb-5 container'>
                <div className="ml-10 mb-3">
                    <CardPaciente />
                </div>

                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="fecha">Fecha:</label>
                        <input className="entrada" id='fecha' name='fecha' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="hora">Hora:</label>
                        <input className="entrada" id='hora' name='hora' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="servicio">Servicio:</label>
                        <input className="entrada" id='servicio' name='servicio' type="text" />
                    </div>
                </div>
            </div>

            <div className='ml-10 mb-5 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="anotacion">Anotación del médico:</label>
                        <textarea id="anotacion" placeholder="..." className="text-amplio" rows="5" cols="10" />
                    </div>
                </div>
            </div>

            <div className='ml-10 mb-5 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="medico">Médico:</label>
                        <input className="datos_lectura" id='medico' name='medico' type="text" readOnly />
                        <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                        <input className="datos_lectura" id='cedula' name='cedula' type="text" readOnly />
                        <label className='etiqueta' htmlFor="firma">Firma:</label>
                    </div>
                </div>
            </div>

            <div className="pt-1 mb-3 text-center">
                <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
            </div>
        </div>
    )
}