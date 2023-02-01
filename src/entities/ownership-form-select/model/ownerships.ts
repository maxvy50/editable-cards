import { useMemo } from 'react';
import { useGetOwnershipsQuery } from "shared/api/mockApi"
import { Ownership } from 'shared/types/types';


export function useOwnershipForms() {

    const { data = [], isLoading } = useGetOwnershipsQuery()

    const shortFormsMap = data.map(o => ({ id: o.id, short: o.short }))
    const fullFormsMap = data.map(o => ({ id: o.id, full: o.full }))

    const juridical = data.filter(form => form.parent_id === 2)
    const pty = data.filter(form => form.parent_id === 15)
    const personal = data.find(form => form.id === 20)
    const individual = data.find(form => form.id === 14)
    const too = data.find(form => form.id === 1)
    const getFormById = (id: Ownership["id"]) => {
        return data.find(form => form.id === id) ?? null
    }

    return useMemo(() => ({
        all: data,
        juridical, pty, too, individual, personal,        
        fullFormsMap,
        shortFormsMap,
        getFormById
    }), [data])
}