import { Company, Ownership, TaxSystem } from 'shared/types/types'
import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { Button } from 'shared/ui/button/Button'
import { Input } from 'shared/ui/input/Input'
import { ToggleGroup, ToggleGroupOption } from 'shared/ui/toggle-group/ToggleGroup'
import { useOwnershipForms } from '../ownership-form-select/model/ownerships'
import styles from "./editCompanyForm.module.css"
import { useTaxSystems } from '../tax-system-select/model/taxSystems'
import { OwnershipSelect } from 'entities/ownership-form-select/ui/OwnershipSelect'
import { TaxSystemSelect } from 'entities/tax-system-select/ui/TaxSystemSelect'


interface EditCompanyFormProps {
    company: Company
    onSubmit: (company: Company) => void
}

type Tab = { label: string, value: "too" | "ip" | "else" }
type Radio = { label: string, value: "fiz" | "chp" | "else_jur" }
const tabs: Tab[] = [
    { label: "ТОО", value: "too" },
    { label: "ИП", value: "ip" },
    { label: "Прочие", value: "else" }
]
const radios: Radio[] = [
    { label: "Юридические лица", value: "else_jur" },
    { label: "Частная практика", value: "chp" },
    { label: "Физические лица", value: "fiz" }
]


export function EditCompanyForm({ company, onSubmit }: EditCompanyFormProps) {

    const { getFormById, too, individual, personal } = useOwnershipForms()
    const { getTaxSystemById, personalTax, ptyTax } = useTaxSystems()
    const ownershipForm = getFormById(company.form_id)
    const taxSystem = getTaxSystemById(company.tax_id)


    const [currentTab, setCurrentTab] = useState<Tab | null>(null)
    const [currentRadio, setCurrentRadio] = useState<Radio | null>(null)
    const [selectedForm, setSelectedForm] = useState<Ownership | null>(null)
    const [selectedTax, setSelectedTax] = useState<TaxSystem | null>(null)
    const [nameState, setNameState] = useState<string>(company.company_name)
    const [tinState, setTinState] = useState<string>(company.company_tin)


    function handleSubmit() { 
        onSubmit({
            ...company,
            form_id: selectedForm?.id ?? company.form_id,
            tax_id: selectedTax?.id ?? company.tax_id,
            company_tin: tinState,
            company_name: nameState,
        })
    }


    useEffect(() => {
        if (currentTab === tabs[0]) setSelectedForm(too ?? null)
        if (currentTab === tabs[1]) setSelectedForm(individual ?? null)
        if (currentTab === tabs[2])
            setSelectedForm(
                getFormById(company.form_id)
            )
    }, [currentTab])
    useEffect(() => {
        if (currentRadio === radios[2]) {
            setSelectedForm(personal ?? null)
            setSelectedTax(personalTax ?? null)
        }
        if (currentRadio === radios[1]) 
            setSelectedTax(ptyTax ?? null)
        if (currentRadio !== radios[2])
            setSelectedForm(
                getFormById(company.form_id)
            )
    }, [currentRadio])
    useEffect(() => {
        setSelectedForm(ownershipForm)
        setCurrentTab(() => {
            if (ownershipForm?.code === 'too') return tabs[0]
            if (ownershipForm?.code === "ip") return tabs[1]
            return tabs[2]
        })
    }, [ownershipForm])
    useEffect(() => { setSelectedTax(taxSystem) }, [taxSystem])


    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>{`Редактировать данные организации`}</h2>

            <div className={styles.form}>

                {currentTab &&
                    <ToggleGroup name={"tab"}
                        options={tabs}
                        value={currentTab as ToggleGroupOption}
                        appearance={"horizontal"}
                        onChange={o => setCurrentTab(o)}
                    />
                }

                {currentTab === tabs[2] &&
                    <ToggleGroup name={"radio"}
                        options={radios}
                        value={currentRadio ?? radios[0]}
                        appearance={"vertical"}
                        onChange={o => setCurrentRadio(o)}
                    />
                }

                {currentTab === tabs[2]
                    && currentRadio !== radios[2] &&
                    <OwnershipSelect
                        value={selectedForm}
                        onChange={o => setSelectedForm(o)}
                        isForJuridical={currentRadio === radios[0]}
                    />
                }

                {currentRadio !== radios[2] && currentRadio !== radios[1] &&
                    <TaxSystemSelect
                        value={selectedTax}
                        onChange={o => setSelectedTax(o)}
                        ownershipForm={selectedForm}
                    />
                }

                <Input type={"text"}
                    label={"Введите ИИН/БИН:"}
                    value={tinState}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTinState(e.target.value)}
                    disabled={
                        currentTab?.value === "too"
                        || currentTab?.value === "ip"
                    }
                />

                <Input type={"text"}
                    prefix={selectedForm?.short}
                    label={"Введите название компании:"}
                    value={nameState}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {setNameState(e.target.value)}}
                    disabled={
                        currentTab?.value === "too"
                        || currentTab?.value === "ip"
                    }
                />

                <Button style={{ width: "170px" }}
                    appearance={"accept"}
                    onClick={handleSubmit}>
                    {`Сохранить`}
                </Button>

            </div>
        </div>
    )
}