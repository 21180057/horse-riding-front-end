import styles from './ContactsListItem.module.css'
import type { SvgIconProps } from '@mui/material'

type ContactsListItemProps = {
  icon: React.ComponentType<SvgIconProps>
  contact: string
}

export default function ContactsListItem({ 
  icon: Icon,
  contact,
}: ContactsListItemProps) {
  return (
    <li className={styles.contacts__list_item}>
      <Icon fontSize='small' />
      <span>{contact}</span>
    </li>
  )
}
