import { Router, Response, Request } from 'express';
import { Todos, TodoWithId } from './todos.model';

const router = Router();

router.get('/', async (req: Request, res: Response<TodoWithId[]>) => {
    const result = await Todos.find(); 
    const todos = await result.toArray();
    res.json(todos);
});

//Another Option to create this route

// router.get<{}, Todo[]>('/', (req, res) => {
//     res.json([{
//         content: 'Learn TypeScript',
//         done: false
//     }]);
// });

export default router;