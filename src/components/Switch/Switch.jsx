import { Switch } from "@mui/material";
import { styled } from '@mui/material/styles';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 94,
  height: 44,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    marginRight: 4,
    marginLeft: 4,
    marginTop: 4,
    transform: 'translateX(0px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(45px)',
      '& .MuiSwitch-thumb:before': {
        content: "'Off'",
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        '&:before': {
          content: "'On'",
          position: 'absolute',
          
          left: 13,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'rgba(255, 255, 255, 0.5)',
        },
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#5FCECB',
    width: 41,
    height: 36,
    borderRadius: '6px',
    position: 'relative',
    '&:before': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      content: "'On'",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  '& .MuiSwitch-track': {
        opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '6px',
    position: 'relative',
    
    '&:after': {
      content: "'Off'",
      position: 'absolute',
      marginRight: '9px',
      right: 4,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255, 255, 255, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
}));

export default CustomSwitch