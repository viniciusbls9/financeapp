import dark from '../themes/dark';
import light from '../themes/light';

const initialTheme = {
    theme: light,
};

export default (state = initialTheme, action) => {
    
    switch(action.type) {
        case 'SET_THEME':
            return {...state, theme: action.payload.theme};
            break;
    }
    
    return state;
}