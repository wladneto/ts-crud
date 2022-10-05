import { Router } from 'express';
import Todo from './todos.model'

const router = Router();

router.get<{}, Todo[]>('/', (req, res) => {
    res.json([{
        content: 'Learn TypeScript',
        done: false
    }]);

});

export default router;