import { useMemo, useState } from "react"
import { useGetTaxSystemsQuery, useGetFormToSystemQuery } from "shared/api/mockApi"
import { Company } from "shared/types/types"
import { SelectOption } from "shared/ui/select/Select"



export function useFilteredTaxes() {

    const { data = [] } = useGetTaxSystemsQuery()
    const formToSystemResponse = useGetFormToSystemQuery()
/* 
    const validIds = formToSystemResponse.data?.
        filter(fts => fts.form_ownership_id === company.form_id).
        map(fts => fts.tax_system_id)
    const taxOptions: SelectOption[] = data.
        filter(s => validIds?.indexOf(s.id) !== -1).
        map(s => ({ value: s.id, label: s.full })) */
    /* const [currentSystem, setCurrentSystem] = useState<SelectOption | null>(() => {
        return taxOptions.find(o => o.value === company.tax_id) ?? null
    })
     */

    
    
    return {
        /* 
        currentSystem,
        setCurrentSystem */
    }/* useMemo(() => (), [data, formToSystemResponse.data]) */
}