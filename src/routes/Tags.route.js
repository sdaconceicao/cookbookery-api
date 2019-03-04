import {Router} from 'express';

import {TagsController} from '../controllers';

const TagsRouter = Router();

TagsRouter
    .get('/', TagsController.loadList);

export default TagsRouter;