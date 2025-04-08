import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

export const RedSlider = styled(Slider)({
    color: '#fb2c36',
    height: 4,
    '& .MuiSlider-thumb': {
        height: 14,
        width: 14,
        border: '2px solid #fb2c36',
    },
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-rail': {
        opacity: 0.25,
        backgroundColor: '#ffff',
    },
});

