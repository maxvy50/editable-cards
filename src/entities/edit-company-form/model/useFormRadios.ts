import { useState } from "react"
import { Company } from "shared/types/types"
import { useOwnershipForms } from './ownerships';

export type FormRadioOption = {
    label: string
    value: "else_jur" | "chp" | "fiz"
}

export function useFormOptions(company: Company) {
    const radios: FormRadioOption[] = [
        { label: "Юридические лица", value: "else_jur" },
        { label: "Частная практика", value: "chp" },
        { label: "Физические лица", value: "fiz" }
    ]

    const { elseJurIds, chpIds, fizIds, ipIds, tooIds} = useOwnershipForms()
    const isJur = elseJurIds.indexOf(company.form_id) !== -1
    const isChp = chpIds.indexOf(company.form_id) !== -1
    const isFiz = fizIds.indexOf(company.form_id) !== -1
    const isTooOrIp = ipIds.concat(tooIds).indexOf(company.form_id) !== -1
    
    const [currentRadio, setCurrentRadio] = useState<FormRadioOption | null>(() => {
        if (isTooOrIp) return null
        if (isJur) return radios[0]
        if (isChp) return radios[1]
        if (isFiz) return radios[3]
        return radios[0]
    })

    return { radios, currentRadio, setCurrentRadio }
}