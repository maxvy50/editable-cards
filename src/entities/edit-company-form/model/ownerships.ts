import { useMemo, useState } from 'react';
import { useGetOwnershipsQuery } from "shared/api/mockApi"
import { Company, Ownership } from "shared/types/types"
import { SelectOption } from "shared/ui/select/Select"
import { FormRadioOption } from './useFormRadios'
import { FormTabOption } from "./useFormTabs"
/* 

export function useFormSelect(currentRadio: FormRadioOption) {

    const { fullFormsMap, elseJurIds, chpIds, fizIds } = useOwnershipForms()

    const validForms = fullFormsMap.filter(form => {
        if (currentRadio.value === "else_jur")
            return elseJurIds.indexOf(form.id) !== -1
        if (currentRadio.value === "chp")
            return chpIds.indexOf(form.id) !== -1
        if (currentRadio.value === "fiz")
            return fizIds.indexOf(form.id) !== -1
    })



    const formOptions: SelectOption[] = validForms.map(form => 
        ({ label: form.full, value: form.id })
    )
    const [currentForm, setCurrentForm] = useState<SelectOption>(() => {

    })

    return 
} */

export function useOwnershipForms() {

    const { data = [], isLoading } = useGetOwnershipsQuery()

    const shortFormsMap = data.map(o => ({ id: o.id, short: o.short }))
    const fullFormsMap = data.map(o => ({ id: o.id, full: o.full }))

    const elseJurIds = data.filter(form =>
        (form.id === 2 || form.parent_id === 2)
    ).map(form => form.id)
    const chpIds = data.filter(form =>
        (form.id === 15 || form.parent_id === 15)
    ).map(form => form.id)
    const fizIds = [20]
    const ipIds = [14]
    const tooIds = [1]

    return useMemo(() => ({
        data,
        fullFormsMap,
        shortFormsMap,
        elseJurIds,
        chpIds,
        ipIds,
        tooIds,
        fizIds
    }), [data])
}