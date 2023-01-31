import { Company, Ownership, TaxSystem } from 'shared/types/types';
import { useState, useEffect } from 'react'
import { Button } from 'shared/ui/button/Button'
import { Input } from 'shared/ui/input/Input'
import { Select } from 'shared/ui/select/Select'
import { ToggleGroup, ToggleGroupOption } from 'shared/ui/toggle-group/ToggleGroup'
import { useOwnershipForms } from './model/ownerships'
import styles from "./editCompanyForm.module.css"
import { useGetTaxSystemsQuery, useGetFormToSystemQuery } from 'shared/api/mockApi';


interface EditCompanyFormProps {
    company: Company
    onSubmit: (company: Company) => void
}

type Filter = "too" | "ip" | "fiz" | "chp" | "else_jur"
type FormSelectOption = {label: string, value: Ownership}
type TaxSelectOption = {label: string, value: TaxSystem}


export function EditCompanyForm({ company, onSubmit }: EditCompanyFormProps) {

    const tabs: ToggleGroupOption[] = [
        { label: "ТОО", value: "too" },
        { label: "ИП", value: "ip" },
        { label: "Прочие", value: "else_jur" }
    ]
    const radios: ToggleGroupOption[] = [
        { label: "Юридические лица", value: "else_jur" },
        { label: "Частная практика", value: "chp" },
        { label: "Физические лица", value: "fiz" }
    ]

    const forms = useOwnershipForms()
    const taxes = useGetTaxSystemsQuery()
    const formsToTaxes = useGetFormToSystemQuery()

    const [draft, setDraft] = useState<Company>({ ...company })

    const [filter, setFilter] = useState<Filter>(() => {
        if (company.form_id === 1) return "too"
        if (company.form_id === 14) return "ip"
        if (company.form_id === 20) return "fiz"
        if (forms.chpIds.indexOf(company.form_id) !== -1) return "chp"
        return "else_jur"
    })

    const filteredForms = (filter: Filter) => {
        if (["too", "ip", "fiz"].indexOf(filter) !== -1)
            return []
        if (filter === "chp")
            return forms.data.filter(form => form.parent_id === 15)
        if (filter === "else_jur")
            return forms.data.filter(form => form.parent_id === 2)
        return []
    }

    const filteredTaxes = (filter: Filter) => {
        if (["chp", "fiz"].indexOf(filter) !== -1)
            return []
        if (["too", "else_jur", "ip"].indexOf(filter) !== -1) {
            let formId = filter === "ip" ? 14 : 1
            let fttIds = formsToTaxes.data?.
                filter(ftt => ftt.form_ownership_id === formId).
                map(ftt => ftt.tax_system_id)
            return taxes.data?.filter(tax => fttIds?.indexOf(tax.id) !== -1) ?? []
        }
        return []
    }

    const formSelectOptions: FormSelectOption[] = filteredForms(filter).
        map(form => ({ label: form.full, value: form }))
    const preselectedForm = formSelectOptions.find(option => option.value.id === company.form_id) ?? null
    const [formSelectState, setFormSelectState] = useState<null | FormSelectOption>(preselectedForm)

    const taxSelectOptions: TaxSelectOption[] = filteredTaxes(filter).
        map(tax => ({ label: tax.full, value: tax }))
    const preselectedTax = taxSelectOptions.find(tax => tax.value.id === company.tax_id) ?? null
    const [taxSelectState, setTaxSelectState] = useState<TaxSelectOption | null>(preselectedTax)

    const handleSubmit = () => {
        onSubmit({
            ...company,
            form_id: formSelectState?.value.id ?? company.form_id,
            tax_id: taxSelectState?.value.id ?? company.tax_id,
        })
    }

    useEffect(() => console.log(company), [])
    useEffect(() => {
        if (filter === "too")
            setDraft({ ...draft, form_id: 1 })
        if (filter === "ip")
            setDraft({ ...draft, form_id: 14 })
        if (filter === "fiz")
            setDraft({ ...draft, form_id: 20 })
    }, [filter])

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>{`Редактировать данные организации`}</h2>

            <div className={styles.form}>

                <ToggleGroup name={"form"}
                    options={tabs}
                    value={{ label: filter, value: filter }}
                    appearance={"horizontal"}
                    onChange={o => setFilter(o.value)}
                />

                {["fiz", "else_jur", "chp"].indexOf(filter) !== -1 &&
                    <ToggleGroup name={"sub_form"}
                        options={radios}
                        value={{ label: filter, value: filter }}
                        appearance={"vertical"}
                        onChange={o => setFilter(o.value)}
                    />
                }

                {filteredForms(filter).length !== 0 &&
                    <Select
                        value={
                            formSelectState
                        }
                        onChange={o => setFormSelectState(o)}
                        label={"Выберите форму собственности:"}
                        options={
                            formSelectOptions
                        }
                    />
                }

                {filteredTaxes(filter).length !== 0 &&
                    <Select
                        value={
                            taxSelectState
                        }
                        onChange={o => setTaxSelectState(o)}
                        label={"Выберите систему налогообложения:"}
                        options={
                           taxSelectOptions
                        }
                    />
                }

                <Input type={"text"}
                    label={"Введите ИИН/БИН:"}
                    value={company.company_tin}
                    onChange={() => { }}
                    disabled={true}
                />

                <Input type={"text"}
                    prefix={formSelectState?.value.short}
                    label={"Введите название компании:"}
                    value={company.company_name}
                    onChange={() => { }}
                    disabled={true}
                />

                <Button style={{ width: "170px" }} appearance={"accept"}
                    onClick={handleSubmit}>
                    {`Сохранить`}
                </Button>

            </div>
        </div>
    )
}