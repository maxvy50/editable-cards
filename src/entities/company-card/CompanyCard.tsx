import { Company } from "shared/types/types"
import styles from "./companyCard.module.css"
import { PropsWithChildren } from "react"
import { useOwnershipForms } from '../edit-company-form/model/ownerships';



interface CompanyCardProps extends PropsWithChildren {
    company: Company
}


export function CompanyCard({ company, children }: CompanyCardProps) {

    const { shortFormsMap } = useOwnershipForms()
    const shortForm = shortFormsMap.find(form => form.id === company.form_id)?.short ?? ''

    return (
        <div className={styles.container}>
            <img className={styles.logo} src={company.logo as string | undefined} alt="logo" />
            <div className={styles.info}>
                <p>{`${shortForm} ${company.company_name}`}</p>
                <p>{`ИИН/БИН ${company.company_tin}`}</p>
            </div>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
}