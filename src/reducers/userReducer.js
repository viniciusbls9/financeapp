import dark from '../themes/dark';
import light from '../themes/light';

const initialTheme = {
    theme: light,
    touchID: false,
};

export default (state = initialTheme, action) => {

    switch (action.type) {
        case 'SET_THEME':
            return { ...state, theme: action.payload.theme };
            break;

        case 'SET_TOUCHID':
            return { ...state, touchID: action.payload.touchID };
            break;
    }

    return state;
}