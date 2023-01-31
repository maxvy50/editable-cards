import { useMemo, useState } from "react"
import { Company } from "shared/types/types"
import { useOwnershipForms } from './ownerships';

export type FormTabOption = {
    label: string
    value: "too" | "ip" | "else"
}

export function useFormTabs(company: Company) {
    const tabs: FormTabOption[] = [
        { label: "ТОО", value: "too" },
        { label: "ИП", value: "ip" },
        { label: "Прочие", value: "else" }
    ]

    const { tooIds, ipIds } = useOwnershipForms()
    const isToo = tooIds.indexOf(company.form_id) !== -1
    const isIp = ipIds.indexOf(company.form_id) !== -1

    const [currentTab, setCurrentTab] = useState<FormTabOption>(() => {
        if (isToo) return tabs[0]
        if (isIp) return tabs[1]
        return tabs[2]
    })
    return { tabs, currentTab, setCurrentTab }
    /* useMemo(() => ()
    , [tooIds, ipIds]) */
}

