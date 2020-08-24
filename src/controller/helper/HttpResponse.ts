import { HTTP_STATUS } from '../../enum';
import { ServerResponse } from './ServerResponse';
import { HttpRequestOptions } from '../../authenticator';
import { FileHandler } from './FileHandler';

export class HttpResponse extends ServerResponse<HttpRequestOptions> {
    public content: any;
    public code: HTTP_STATUS;

    constructor(content: {} = null, code: HTTP_STATUS = HTTP_STATUS.CODE_200_OK) {
        super();
        this.content = content;
        this.code = code;
    }

    public async sendResponse(options: HttpRequestOptions) {
        options.response.status(this.code);

        if (this.content == null) {
            options.response.send();
        } else if (this.content instanceof FileHandler) {
            options.response.sendFile(this.content.path);
        } else {
            options.response.json(this.content);
        }
    }
}
