import { Ownership } from 'shared/types/types'
import { Select } from 'shared/ui/select/Select'
import { TaxSystem } from 'shared/types/types'
import { useTaxSystems } from 'entities/tax-system-select/model/taxSystems'

type TaxSystemSelectProps = {
    value: TaxSystem | null
    onChange: (o: TaxSystem | null) => void
    ownershipForm: Ownership | null
}

export function TaxSystemSelect({ value, onChange, ownershipForm }: TaxSystemSelectProps) {

    const { getTaxSystemsFor } = useTaxSystems()
    const options = optionsCreator(getTaxSystemsFor(ownershipForm))    
    const selected = value && optionsCreator([value])[0]


    function optionsCreator(array: TaxSystem[]) {
        return array.map(tax => ({ label: tax.full, value: tax })) 
    }

    return (
        <Select
            value={selected}
            onChange={o => onChange(o?.value)}
            label={"Выберите систему налогообложения:"}
            options={options}
        />
    )
}
