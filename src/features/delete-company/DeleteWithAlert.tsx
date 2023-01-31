import { Button, deleteIcon } from "shared/ui/button/Button"
import { Company } from "shared/types/types"
import { useStore } from "react-redux"
import { mybuhApi } from "shared/api/mockApi"
import { Modal } from '../../shared/ui/modal/Modal'
import { useState } from 'react'
import { ButtonGroup } from "shared/ui/button-group/ButtonGroup"
import styles from "./deleteWithAlert.module.css"

export function DeleteWithAlert({ company }: { company: Company }) {

    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const dispatch = useStore().dispatch
    const handleDelete = (company: Company) => {
        
        const action = mybuhApi.util.updateQueryData('getCompanies', undefined, (draft) =>
            draft.filter(c => c.id !== company.id)
        )
        const patchCollection = dispatch(action) //TODO WTF?!

        console.log(patchCollection.patches[0].value)
        setModalVisible(false)
    }

    return (
        <>
            <Modal visible={modalVisible} onShadowClick={() => setModalVisible(false)}>
                <div className={styles.container}>
                    <h2 className={styles.heading}>{`Удаление организации`}</h2>
                    <p className={styles.notification}>{`Вы уверены, что хотите удалить организацию из списка?`}</p>
                    <ButtonGroup>
                        <Button appearance="outlined" onClick={() => setModalVisible(false)}>
                            {`Отменить`}
                        </Button>
                        <Button style={{ width: "285px" }} onClick={() => handleDelete(company)}>
                            {`Удалить`}
                        </Button>
                    </ButtonGroup>
                </div>
            </Modal>

            <Button appearance="icon" onClick={() => setModalVisible(true)}>
                <img src={deleteIcon} />
            </Button>
        </>
    )
}