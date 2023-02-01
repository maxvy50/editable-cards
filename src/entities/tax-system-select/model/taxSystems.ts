import { useMemo } from 'react';
import { useGetFormToSystemQuery, useGetTaxSystemsQuery } from "shared/api/mockApi"
import { Ownership } from 'shared/types/types';


export function useTaxSystems() {

    const { data = [] } = useGetTaxSystemsQuery()
    const formsToTaxes = useGetFormToSystemQuery()

    const getTaxSystemById = (id: Ownership["id"]) => {
        const temp = data.find(form => form.id === id)
        //console.log(`tax_id=${id}: `, temp)
        return temp ?? null
    }

    
    const getTaxSystemsFor = (form: Ownership | null) => {
        if (!form) return []
        const fttIds = formsToTaxes.data?.
            filter(ftt => ftt.form_ownership_id === form.id).
            map(ftt => ftt.tax_system_id)
            //console.log("valid systems: ", fttIds)
        return data.filter(tax => fttIds?.indexOf(tax.id) !== -1) ?? []
    }

    return useMemo(() => ({
        personalTax: data.find(s => s.code === 'fiz'),
        ptyTax: data.find(s => s.code === 'chp'),
        getTaxSystemById,
        getTaxSystemsFor
    }), [data, formsToTaxes.data])
}