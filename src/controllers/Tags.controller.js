import {TagsService} from '../services';

/**
 * Retrieve all tags
 * @param req
 * @param res
 */
export function loadList(req, res){
    //TODO filters and pagination
    TagsService.loadList(req.params.filters).then(tags => {
        res.status(200).send({
            tags
        })
    }).catch(error=>{
        res.status(500).send({
            error
        })
    })
}