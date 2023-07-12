import React, { useEffect, useState } from 'react'

export default function Form({ oldNota }) {

    const [nota, setNota] = useState({
        title: '',
        content: ''
    })

    const handleChange = (e) => {
        let newNota = {
            [e.target.name]: e.target.value,
            [e.target.name]: e.target.value
        }

        setNota({ ...nota, ...newNota })

    }

    const saveNota = async () => {
        let URL = '';
        let params = {};
        if (nota._id) {
            URL = 'http://localhost:5000/api/notas/' + nota._id;
            params = {
                method: 'PATCH',
                body: JSON.stringify(nota),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }else{
            URL = 'http://localhost:5000/api/notas/';
            params = {
                method: 'POST',
                body: JSON.stringify(nota),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
        await fetch(URL, params)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        saveNota();
        setNota({
            'title': '',
            'content': ''
        })
    }

    useEffect(() => {
        setNota(oldNota)
    }, [oldNota]);

    return (
        <div className="card">
            <div className="card-header">Agregar Nota</div>
            <div className="card-body">
                <form action="" onSubmit={onSubmit}>
                    <div className="form-group mb-3">
                        <input name='title' onChange={handleChange} type="text" placeholder='Titulo' className='form-control' />
                    </div>
                    <div className="form-group mb-3">
                        <textarea name="content" onChange={handleChange} className="form-control" placeholder='Contenido de la tarea'></textarea>
                    </div>
                    {nota._id
                        ? <button type='submit' className='btn btn-outline-success btn-sm btn-block'>Actualizar</button>
                        : <button type='submit' className='btn btn-outline-success btn-sm btn-block'>Guardar</button>}
                </form>
            </div>
        </div>
    )
}
