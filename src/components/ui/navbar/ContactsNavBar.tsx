import styles from './ContactsNavBar.module.css'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ContactsListItem from './ContactsListItem'
import SearchInput from './SearchInput'

export default function ContactsNavBar() {
  return (
    <ul className={styles.contacts__list}>
      <SearchInput />
      <ContactsListItem icon={LocalPhoneOutlinedIcon} contact='+ 359 888 999 000' />
      <ContactsListItem icon={EmailOutlinedIcon} contact='victoria_instructor@gmail.com' />
      <ContactsListItem icon={LocationOnOutlinedIcon} contact='ул. Георги Георгиев, 3443 кв. Левски, София' />
    </ul>
  )
}
