import { HTTP_STATUS } from '../../enum';
import { ServerResponse } from './ServerResponse';
import { HttpRequestOptions } from '../../authenticator';

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
            options.response.send();
        } else {
            options.response.json(this.content);
        }
    }
}
