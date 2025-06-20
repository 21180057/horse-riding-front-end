import { Button, type SxProps, type Theme } from "@mui/material";

type CustomButtonProps = {
  text: string
  color: string
  fontColor?: string
  onClick?: () => void
  isLoading?: boolean
  sx?: SxProps<Theme>
}

export default function CustomButton({ text, color, fontColor, onClick, sx = {}, isLoading = false }: CustomButtonProps) {
  return (
    <Button
      disabled={isLoading}
      variant='contained'
      sx={{
        ...sx,
        mt: 2,
        backgroundColor: color,
        color: fontColor ? fontColor : '#FEFEFE',
        '&:hover': {
          backgroundColor: '#FEFEFE',
          color: '#313131'
        }
      }}
      fullWidth
      onClick={onClick}
    >
      {text}
    </Button>
  )
}
