import { HTTP_STATUS } from '../../enum';
import { Response } from 'express';
import { ServerResponse } from './ServerResponse';
import { HttpRequestOptions } from 'src/authenticator';

export class HttpResponse extends ServerResponse<HttpRequestOptions> {
    public content: {};
    public code: HTTP_STATUS;

    constructor(content: {} = null, code: HTTP_STATUS = HTTP_STATUS.CODE_200_OK) {
        super();
        this.content = content;
        this.code = code;
    }

    public sendResponse(options: HttpRequestOptions) {
        options.response.status(this.code);

        if (this.content == null) {
            // response.send();
        } else {
            options.response.json(this.content);
        }
    }
}
