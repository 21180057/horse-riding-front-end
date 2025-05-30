import React from 'react'
import { Modal, Box } from '@mui/material'

type CustomModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  border: 'none',
}

export default function CustomModal({
  isOpen,
  onClose,
  children,
}: CustomModalProps) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  )
}
