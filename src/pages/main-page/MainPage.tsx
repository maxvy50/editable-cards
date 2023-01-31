
import styles from "./mainPage.module.css"
import { CompanyCard } from "entities/company-card/CompanyCard"
import { useGetCompaniesQuery } from "shared/api/mockApi"
import { ButtonGroup } from "shared/ui/button-group/ButtonGroup"
import { EditWithForm } from '../../features/edit-company/EditWithForm';
import { DeleteWithAlert } from '../../features/delete-company/DeleteWithAlert';

export function MainPage() {
    const { data = [], isLoading } = useGetCompaniesQuery()

    if (isLoading) return <h1>Загружаю ...</h1>
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                Мои организации
            </h1>
            <div className={styles.list}>
                {data.map(c =>
                    <CompanyCard key={c.id} company={c}>
                        <ButtonGroup>
                            <EditWithForm company={c} />
                            <DeleteWithAlert company={c} />
                        </ButtonGroup>
                    </CompanyCard>
                )}
            </div>
        </div>
    )
}