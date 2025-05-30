import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/ReservationTable.module.css'
import CustomModal from '../../modal/CustomModal'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import CustomButton from '../../button/CustomButton'

type ActionsColumnPropsType = {
  type: 'camp' | 'ride',
  id: number,
  onDelete: (id: number, type: 'camp' | 'ride') => void
}

export default function ActionsColumn({
  type,
  id,
  onDelete,
}: ActionsColumnPropsType) {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <td className={styles.actionsCell}>
      <div className={styles.iconsContainer}>
        <EditOutlinedIcon
          onClick={() => navigate(type === 'ride' ? `/reservation/update/${id}` : `/campform/update/${id}`)}
          fontSize='medium'
          className={styles.editIcon}
        />
        <DeleteOutlineOutlinedIcon
          onClick={() => setIsModalOpen(true)}
          fontSize='medium'
          className={styles.deleteIcon}
        />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Typography variant='h6'>Сигурни ли сте, че искате да изтриете резервацията?</Typography>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <CustomButton
            text='Да'
            onClick={() => {
              setIsModalOpen(false)
              onDelete(id, type)
            }}
            color='red'
          />
          <CustomButton
            text='Отказ'
            onClick={() => setIsModalOpen(false)}
            color='green'
          />
        </Box>
      </CustomModal>
    </td>
  )
}
