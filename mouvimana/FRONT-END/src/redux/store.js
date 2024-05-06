import { configureStore } from '@reduxjs/toolkit';
import Films from './filmRedux';
import Users from './userRedux';

export default configureStore({
    reducer: {
        films: Films,
        user: Users
    }
})