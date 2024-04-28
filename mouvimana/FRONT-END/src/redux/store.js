import { configureStore } from '@reduxjs/toolkit';
import Films from './filmRedux';

export default configureStore({
    reducer: {
        films: Films
    }
})