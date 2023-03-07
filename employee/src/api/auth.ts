import axios, { Axios } from "axios";
import { AccessToken, UserCredentialType } from "../store/type";

export class UserApi {
  _url: String;
  _network: Axios;

  constructor() {
    this._url = "http://localhost:5001/api/authentication";
    this._network = axios;
  }

  getUsers = (userDetails: UserCredentialType) => {
    return this._network.post<AccessToken>(`${this._url}/login`, userDetails);
  };
}
