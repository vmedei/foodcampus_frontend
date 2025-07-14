'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRef, useEffect, useState } from 'react'
import AgendamentoSetor from '@/components/vendedor/AgendamentoSetor'
import CadastroProduto from '@/components/vendedor/CadastroProduto'
import ListaProdutos, { ListaProdutosRef } from '@/components/vendedor/ListaProdutos'
import MapaSetores from '../mapa/MapaSetores'
import ModalConfirmacaoStatus from '@/components/vendedor/ModalConfirmacaoStatus'
import { useSetores, VendedorAgendado } from '@/hooks/useSetores'

export default function HomeVendedor() {
    const { user } = useAuth()
    const { carregarMeusAgendamentos, atualizarStatusAgendamento } = useSetores()
    
    const listaProdutosRef = useRef<ListaProdutosRef>(null)
    const [agendamentoAtivo, setAgendamentoAtivo] = useState<VendedorAgendado | null>(null)
    const [modalAberto, setModalAberto] = useState(false)
    const [loadingAtivacao, setLoadingAtivacao] = useState(false)
    const [jaVerificado, setJaVerificado] = useState(false)

    const handleProdutoCriado = () => {
        listaProdutosRef.current?.recarregarProdutos()
    }

    // Verificar agendamentos ativos quando o componente carrega
    useEffect(() => {
        if (!jaVerificado) {
            verificarAgendamentosAtivos()
            setJaVerificado(true)
        }
    }, [jaVerificado])

    const verificarAgendamentosAtivos = async () => {
        try {
            const agendamentos = await carregarMeusAgendamentos()
            const agora = new Date()
            
            // Procurar por agendamentos AGENDADO que estão dentro do horário atual
            const agendamentoAtivo = agendamentos.find(agendamento => {
                if (agendamento.status !== 'AGENDADO') return false
                
                const inicio = new Date(agendamento.dataInicio)
                const fim = new Date(agendamento.dataFim)
                
                return agora >= inicio && agora <= fim
            })
            
            if (agendamentoAtivo) {
                setAgendamentoAtivo(agendamentoAtivo)
                setModalAberto(true)
            }
        } catch (error) {
            console.error('Erro ao verificar agendamentos ativos:', error)
        }
    }

    const handleConfirmarAtivacao = async () => {
        if (!agendamentoAtivo) return
        
        setLoadingAtivacao(true)
        try {
            await atualizarStatusAgendamento(agendamentoAtivo.agendamentoId, 'ATIVO')
            setModalAberto(false)
            setAgendamentoAtivo(null)
        } catch (error) {
            console.error('Erro ao ativar agendamento:', error)
        } finally {
            setLoadingAtivacao(false)
        }
    }

    const handleFecharModal = () => {
        setModalAberto(false)
        setAgendamentoAtivo(null)
    }

    return (
        <div className="bg-base-200">
            <div className="container mx-auto p-10">

                {/* Header */}
                <h1 className="text-3xl font-bold text-primary mb-6">
                    Bem-vindo(a), {user?.name || user?.email}
                </h1>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* Seção de Produtos */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <div className="w-full">
                            <CadastroProduto onProdutoCriado={handleProdutoCriado} />
                        </div>
                        <div className="w-full">
                            <ListaProdutos ref={listaProdutosRef} />
                        </div>
                    </div>
                    {/* Seção de Agendamento */}
                    <div className="w-full">
                        <AgendamentoSetor />
                    </div>

                </div>
            </div>
            
            {/* Modal de confirmação de ativação */}
            <ModalConfirmacaoStatus
                agendamento={agendamentoAtivo}
                isOpen={modalAberto}
                onClose={handleFecharModal}
                onConfirm={handleConfirmarAtivacao}
                loading={loadingAtivacao}
            />
        </div>
    )
} 