'use client'

import { useState, useEffect } from 'react'
import { useSetores, Setor, VendedorAgendado } from '@/hooks/useSetores'
import { Calendar, Clock, MapPin, Save, AlertCircle, CheckCircle, List, Map, Eye } from 'lucide-react'
import { MapaSetores } from '../../mapa'
import StatusModal from './StatusModal'
import MeusAgendamentos from './MeusAgendamentos'
import ReservasList from './ReservasList'
import { reservasMock } from './mockReservas'

export default function AgendamentoSetor() {
    const { setores, agendarVendedor, carregarMeusAgendamentos, atualizarStatusAgendamento } = useSetores()
    const [visualizacao, setVisualizacao] = useState<'mapa' | 'agendamentos' | 'reservas'>('mapa')
    const [agendamentos, setAgendamentos] = useState<VendedorAgendado[]>([])
    const [loadingAgendamentos, setLoadingAgendamentos] = useState(false)
    const [setorSelecionadoMapa, setSetorSelecionadoMapa] = useState<Setor | null>(null)
    const [loadingStatus, setLoadingStatus] = useState<number | null>(null)
    const [mensagemStatus, setMensagemStatus] = useState<string | null>(null)
    const [mostrarApenasAtivos, setMostrarApenasAtivos] = useState(false)
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

    // Carregar agendamentos quando a visualização mudar para agendamentos
    useEffect(() => {
        if (visualizacao === 'agendamentos') {
            carregarAgendamentos()
        }
    }, [visualizacao])

    // Sincronizar setor selecionado no mapa com o input
    useEffect(() => {
        if (setorSelecionadoMapa && setorSelecionadoMapa.id.toString() !== formData.setorId) {
            setFormData(prev => ({
                ...prev,
                setorId: setorSelecionadoMapa.id.toString()
            }))
        }
    }, [setorSelecionadoMapa])

    // Sincronizar input com setor selecionado no mapa
    useEffect(() => {
        if (formData.setorId && setores.length > 0) {
            const setor = setores.find(s => s.id.toString() === formData.setorId)
            if (setor && (!setorSelecionadoMapa || setorSelecionadoMapa.id !== setor.id)) {
                setSetorSelecionadoMapa(setor)
            }
        } else if (!formData.setorId && setorSelecionadoMapa) {
            setSetorSelecionadoMapa(null)
        }
    }, [formData.setorId, setores])

    const carregarAgendamentos = async () => {
        setLoadingAgendamentos(true)
        try {
            const meusAgendamentos = await carregarMeusAgendamentos()
            setAgendamentos(meusAgendamentos)
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error)
        } finally {
            setLoadingAgendamentos(false)
        }
    }

    // Filtrar agendamentos baseado no estado
    const agendamentosFiltrados = mostrarApenasAtivos 
        ? agendamentos.filter(agendamento => 
            agendamento.status === 'AGENDADO' || agendamento.status === 'ATIVO'
          )
        : agendamentos

    // Filtrar agendamentos ativos para o mapa (apenas AGENDADO e ATIVO)
    const agendamentosAtivos = agendamentos.filter(agendamento => 
        agendamento.status === 'AGENDADO' || agendamento.status === 'ATIVO'
    )

    const handleSetorSelecionadoMapa = (setor: Setor) => {
        setSetorSelecionadoMapa(setor)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

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
            setSetorSelecionadoMapa(null)

            // Recarregar agendamentos se estiver na visualização de agendamentos
            if (visualizacao === 'agendamentos') {
                carregarAgendamentos()
            }

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

    const formatarDataHora = (dataIso: string) => {
        return new Date(dataIso).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusBadge = (status: string, agendamentoId: number) => {
        const isLoading = loadingStatus === agendamentoId

        if (isLoading) {
            return <span className="badge badge-ghost opacity-50">Atualizando...</span>
        }

        return (
            <StatusModal
                currentStatus={status}
                agendamentoId={agendamentoId}
                onStatusChange={handleAtualizarStatus}
                loading={isLoading}
            />
        )
    }

    const getNomeSetor = (setorId: number) => {
        const setor = setores.find(s => s.id === setorId)
        return setor ? `${setor.sigla} - ${setor.nome}` : 'Setor não encontrado'
    }

    const handleAtualizarStatus = async (agendamentoId: number, novoStatus: string) => {
        setLoadingStatus(agendamentoId)
        try {
            await atualizarStatusAgendamento(agendamentoId, novoStatus)
            
            // Atualizar o agendamento na lista local
            setAgendamentos(prev => prev.map(agendamento => 
                agendamento.agendamentoId === agendamentoId 
                    ? { ...agendamento, status: novoStatus as any }
                    : agendamento
            ))
            
            // Mostrar mensagem de sucesso
            const statusText = novoStatus === 'ATIVO' ? 'ativado' : 'finalizado'
            setMensagemStatus(`Agendamento ${statusText} com sucesso!`)
            
            // Limpar mensagem após 3 segundos
            setTimeout(() => setMensagemStatus(null), 3000)
        } catch (error: any) {
            console.error('Erro ao atualizar status:', error)
            setMensagemStatus('Erro ao atualizar status do agendamento')
            setTimeout(() => setMensagemStatus(null), 3000)
        } finally {
            setLoadingStatus(null)
        }
    }



    return (
        <div className="card card-side bg-base-100 shadow-lg items-center">
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

                {/* Mensagem de status */}
                {mensagemStatus && (
                    <div className="alert alert-info mb-4">
                        <CheckCircle className="h-4 w-4" />
                        <span>{mensagemStatus}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-neutral/65">Setor da UFRN</legend>
                        <select 
                            className="select select-bordered w-full"
                            name="setorId"
                            value={formData.setorId}
                            onChange={handleInputChange}
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
                            name="data"
                            value={formData.data}
                            onChange={handleInputChange}
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
                                name="horaInicio"
                                value={formData.horaInicio}
                                onChange={handleInputChange}
                                required
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-neutral/65">Hora Fim</legend>
                            <input
                                type="time"
                                className="input input-bordered w-full"
                                name="horaFim"
                                value={formData.horaFim}
                                onChange={handleInputChange}
                                required
                            />
                        </fieldset>
                    </div>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-neutral/65">Observações</legend>
                        <textarea
                            className="textarea h-20 w-full"
                            name="observacoes"
                            placeholder="Informações sobre produtos, promoções, etc..."
                            value={formData.observacoes}
                            onChange={handleInputChange}
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

            <div className="w-full p-4">
                {/* Seletor de visualização */}
                <div className="flex justify-center mb-4">
                    <div className="join">
                        <input 
                            className="join-item btn" 
                            type="radio" 
                            name="visualizacao" 
                            aria-label="Mapa"
                            checked={visualizacao === 'mapa'}
                            onChange={() => setVisualizacao('mapa')}
                        />
                        <input 
                            className="join-item btn" 
                            type="radio" 
                            name="visualizacao" 
                            aria-label="Agendamentos"
                            checked={visualizacao === 'agendamentos'}
                            onChange={() => setVisualizacao('agendamentos')}
                        />
                        <input
                            className="join-item btn"
                            type="radio"
                            name="visualizacao"
                            aria-label="Reservas"
                            checked={visualizacao === 'reservas'}
                            onChange={() => setVisualizacao('reservas')}
                        />
                    </div>
                </div>

                {/* Conteúdo baseado na visualização selecionada */}
                {visualizacao === 'mapa' ? (
                    <MapaSetores
                        largura='100%'
                        altura='600px'
                        setorSelecionado={setorSelecionadoMapa}
                        onSetorSelecionado={handleSetorSelecionadoMapa}
                    />
                ) : visualizacao === 'agendamentos' ? (
                    <MeusAgendamentos
                        agendamentos={agendamentos}
                        setores={setores}
                        loading={loadingAgendamentos}
                        onAgendamentosChange={setAgendamentos}
                    />
                ) : (
                    <ReservasList reservas={reservasMock} />
                )}
            </div>
        </div>
    )
} 