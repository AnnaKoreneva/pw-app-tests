import { APIRequestContext } from "playwright-core";

export class ApiUtils{

  constructor(private readonly request: APIRequestContext) { }

  private async makeRequest(method: string, endpoint: string, requestBody?: object, token?: string) {
    const res = this.request[method](endpoint, {
      data: requestBody,
      headers: {
        Authorization: token,
      },
    }); 
    return res
  }
  
  async postReq(endpoint: string, requestBody: Object, token: string) {
    return  this.makeRequest('post', endpoint, requestBody, token)
  }

  async postReqGetToken(endpoint: string, requestBody: Object): Promise<string>{
    const res = await this.makeRequest("post", endpoint, requestBody);
    const resJson = await res.json();
    return resJson.user.token
  }
  
}


