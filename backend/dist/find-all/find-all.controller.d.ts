import { FindAllService } from './find-all.service';
export declare class FindAllController {
    private findAllService;
    constructor(findAllService: FindAllService);
    findAll(): import("../response.type").Response;
}
