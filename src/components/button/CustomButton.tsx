import { Button } from "@mui/material";

type CustomButtonProps = {
  text: string
  color: string
  fontColor?: string
  onClick?: () => void
}

export default function CustomButton({ text, color, fontColor, onClick }: CustomButtonProps) {
  return (
    <Button
      variant='contained'
      sx={{
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
