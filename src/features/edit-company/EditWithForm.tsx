import { Button, editIcon } from "shared/ui/button/Button"
import { Company } from "shared/types/types"
import { useStore } from "react-redux"
import { mybuhApi } from "shared/api/mockApi"
import { Modal } from 'shared/ui/modal/Modal'
import { useState } from 'react'
import { EditCompanyForm } from 'entities/edit-company-form/EditCompanyForm'
import { AnyAction } from "@reduxjs/toolkit"

export function EditWithForm({ company }: { company: Company }) {

    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const dispatch = useStore().dispatch
    const handleEdit = (company: Company) => {

        const action = mybuhApi.util.updateQueryData('getCompanies', undefined, (draft) => {
            let idx = draft.findIndex(c => c.id === company.id)
            let temp = [...draft]
            temp[idx] = company
            return [...temp]   //TODO че-то покрасивше надо придумать
        })
        const patchCollection = dispatch(action as unknown as AnyAction) //TODO WTF?!
        console.log(patchCollection.patches[0].value)
        setModalVisible(false)
    }

    return (
        <>
            {modalVisible &&
                <Modal visible={modalVisible} onShadowClick={() => setModalVisible(false)}>
                    <EditCompanyForm company={company} onSubmit={handleEdit} />
                </Modal>
            }

            <Button appearance="icon" onClick={() => setModalVisible(true)}>
                <img src={editIcon} />
            </Button>
        </>
    )
}