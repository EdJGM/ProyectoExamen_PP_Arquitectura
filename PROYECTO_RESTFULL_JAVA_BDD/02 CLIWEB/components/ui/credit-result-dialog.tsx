'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

interface CreditResultDialogProps {
    isOpen: boolean
    onClose: () => void
    resultado: {
        idFactura: number
        idCreditoBanco: number
        nombreCliente: string
        cedula: string
        subtotal: number
        cuotaMensual: number
        numeroCuotas: number
    }
    onViewAmortization: () => void
}

export function CreditResultDialog({
    isOpen,
    onClose,
    resultado,
    onViewAmortization
}: CreditResultDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-white border shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-green-600 flex items-center gap-2">
                        ✅ Venta a Crédito Procesada
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className="space-y-3 text-sm text-gray-700">
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="grid grid-cols-2 gap-2">
                                    <span className="font-semibold">Tipo de venta:</span>
                                    <span>CRÉDITO</span>

                                    <span className="font-semibold">Factura N°:</span>
                                    <span>{resultado.idFactura}</span>

                                    <span className="font-semibold">Cliente:</span>
                                    <span>{resultado.nombreCliente}</span>

                                    <span className="font-semibold">Cédula:</span>
                                    <span>{resultado.cedula}</span>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-3 rounded">
                                <h4 className="font-semibold text-blue-600 mb-2">Información del Crédito</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <span className="font-semibold">ID Crédito BanQuito:</span>
                                    <span className="text-blue-600 font-bold">{resultado.idCreditoBanco}</span>

                                    <span className="font-semibold">Cuota mensual:</span>
                                    <span>${resultado.cuotaMensual.toFixed(2)}</span>

                                    <span className="font-semibold">Número de cuotas:</span>
                                    <span>{resultado.numeroCuotas}</span>

                                    <span className="font-semibold">Total a pagar:</span>
                                    <span className="font-bold text-green-600">${(resultado.cuotaMensual * resultado.numeroCuotas).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-2 justify-end pt-4 bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                    <Button variant="outline" onClick={onClose} className="bg-white">
                        Cerrar
                    </Button>
                    <Button
                        onClick={onViewAmortization}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Ver Tabla de Amortización
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}