import { FiTrash2, FiFile } from 'react-icons/fi'

export function Ticket() {
    return (
        <>
            <tr className='border-b-2 border-slate-200 h-14 last:border-b-0 bg-slate-50 hover:bg-slate-100'>
                <td className='text-left p-2 max-w-30 break-words overflow-hidden'>
                    Mercado silva 
                </td>

                <td className='text-left hidden sm:table-cell'>
                    01/04/2025
                </td>

                <td className='text-left'>
                    <span className="text-white shadow-sm font-medium bg-green-500 px-2 py-1 rounded">
                        ABERTO
                    </span>
                </td>

                <td className='text-left'>
                    <button className='mr-2 cursor-pointer'>
                        <FiTrash2 size={24} color='#EF4444' />
                    </button>
                     <button className='cursor-pointer'>
                        <FiFile size={24} color='#3b82f6' />
                    </button>
                </td>
            </tr>
        </>
    )
}