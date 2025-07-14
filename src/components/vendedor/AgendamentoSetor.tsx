'use client'

import { useState } from 'react'
import { useSetores } from '@/hooks/useSetores'
import { Calendar, Clock, MapPin, Save, AlertCircle, CheckCircle } from 'lucide-react'

export default function AgendamentoSetor() {
    const { setores, agendarVendedor } = useSetores()
    const [formData, setFormData] = useState({
        setorId: '',
        data: '',
        horaInicio: '',
        horaFim: '',
        observacoes: ''
    })
    const [loading, setLoading] = useState(false)
    const [sucesso, setSucesso] = useState(false)
    const [erro, setErro] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSucesso(false)
        setErro('')

        try {
            const dataInicio = new Date(`${formData.data}T${formData.horaInicio}:00`)
            const dataFim = new Date(`${formData.data}T${formData.horaFim}:00`)

            // Validações no frontend
            if (dataInicio >= dataFim) {
                throw new Error('Horário de início deve ser anterior ao horário de fim')
            }

            if (dataInicio < new Date()) {
                throw new Error('Não é possível agendar para datas passadas')
            }

            await agendarVendedor({
                setorId: parseInt(formData.setorId),
                dataInicio: dataInicio.toISOString(),
                dataFim: dataFim.toISOString(),
                observacoes: formData.observacoes || undefined
            })

            setSucesso(true)
            setFormData({
                setorId: '',
                data: '',
                horaInicio: '',
                horaFim: '',
                observacoes: ''
            })

            // Limpar mensagem de sucesso após 5 segundos
            setTimeout(() => setSucesso(false), 5000)
        } catch (error: any) {
            setErro(error.message || 'Erro ao agendar no setor')
        } finally {
            setLoading(false)
        }
    }

    const formatarDataMinima = () => {
        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0)
        return hoje.toISOString().split('T')[0]
    }

    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-primary mb-4">
                    <MapPin className="h-5 w-5" />
                    Agendar no Setor
                </h2>

                {/* Mensagem de sucesso */}
                {sucesso && (
                    <div className="alert alert-success mb-4">
                        <CheckCircle className="h-4 w-4" />
                        <span>Agendamento realizado com sucesso!</span>
                    </div>
                )}

                {/* Mensagem de erro */}
                {erro && (
                    <div className="alert alert-error mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <span>{erro}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-neutral/65">Setor da UFRN</legend>
                        <select 
                            className="select select-bordered w-full"
                            value={formData.setorId}
                            onChange={(e) => setFormData({...formData, setorId: e.target.value})}
                            required
                        >
                            <option value="">Selecione um setor</option>
                            {setores.map(setor => (
                                <option key={setor.id} value={setor.id}>
                                    {setor.sigla} - {setor.nome}
                                </option>
                            ))}
                        </select>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-neutral/65">Data</legend>
                        <input
                            type="date"
                            className="input w-full"
                            value={formData.data}
                            onChange={(e) => setFormData({...formData, data: e.target.value})}
                            min={formatarDataMinima()}
                            required
                        />
                    </fieldset>

                    <div className="grid grid-cols-2 gap-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-neutral/65">Hora Início</legend>
                            <input
                                type="time"
                                className="input input-bordered w-full"
                                value={formData.horaInicio}
                                onChange={(e) => setFormData({...formData, horaInicio: e.target.value})}
                                required
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-neutral/65">Hora Fim</legend>
                            <input
                                type="time"
                                className="input input-bordered w-full"
                                value={formData.horaFim}
                                onChange={(e) => setFormData({...formData, horaFim: e.target.value})}
                                required
                            />
                        </fieldset>
                    </div>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-neutral/65">Observações</legend>
                        <textarea
                            className="textarea h-20 w-full"
                            placeholder="Informações sobre produtos, promoções, etc..."
                            value={formData.observacoes}
                            onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                        />
                    </fieldset>

                    <div className="alert alert-info">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">
                            Você será posicionado no setor selecionado durante o horário informado.
                        </span>
                    </div>

                    <div className="card-actions justify-end">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Agendando...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Agendar no Setor
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
} 