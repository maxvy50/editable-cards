import { Ownership } from 'shared/types/types'
import { useOwnershipForms } from 'entities/ownership-form-select/model/ownerships'
import { Select } from 'shared/ui/select/Select'

type OwnershipSelectProps = {
    value: Ownership | null
    onChange: (o: Ownership | null) => void
    isForJuridical: boolean
}

export function OwnershipSelect({ value, onChange, isForJuridical }: OwnershipSelectProps) {

    const forms = useOwnershipForms()
    const options = optionsCreator(isForJuridical ? forms.juridical : forms.pty)
    const selected = value && optionsCreator([value])[0]


    function optionsCreator(array: Ownership[]) {
        return array.map(form => ({ label: form.full, value: form })) 
    }

    return (
        <Select
            value={selected}
            onChange={o => onChange(o?.value)}
            label={"Выберите форму собственности:"}
            options={options}
        />
    )
}
