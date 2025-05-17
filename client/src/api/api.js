import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class QRBoxerApi {

  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${QRBoxerApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getMoves(username) {
    let res = await this.request(`moves`, { username });
    return res.moves;
  }

  static async getMove(id) {
    let res = await this.request(`moves/${id}`);
    return res.move;
  }

  static async getBoxes() {
    let res = await this.request(`boxes`);
    return res.boxes;
  }

  static async getBox(id) {
    let res = await this.request(`boxes/${id}`);
    return res.box;
  }

  static async getItems(description) {
    let res = await this.request(`items`, { description });
    return res.items;
  }

  static async getItemsbyBox(id) {
    let res = await this.request(`boxes/${id}/items`);
    return res.items;
  }

  static async getBoxesbyMove(id) {
    let res = await this.request(`moves/${id}/boxes`);
    return res.boxes;
  }

  static async getItem(id) {
    let res = await this.request(`items/${id}`);
    return res.item;
  }

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async signup(data) {
    console.log("API - signup - Sending request to auth/register");
    try {
      let res = await this.request(`auth/register`, data, "post");
      console.log("API - signup - Successful response:", res);
      return res.token;
    } catch (error) {
      console.error("API - signup - Error details:", error);
      throw error;
    }
  }

  static async createmove(data) {
    let res = await this.request(`moves`, data, "post");
    return res.move;
  }

  static async createbox(data) {
    let res = await this.request(`boxes`, data, "post");
    return res.box;
  }

  static async createitem(data) {
    let res = await this.request(`items`, data, "post");
    return res.item;
  }

  static async removebox(id) {
    let res = await this.request(`boxes/${id}`, id, "delete");
    return res;
  }

  static async removeitem(id) {
    let res = await this.request(`items/${id}`, id, "delete");
    return res;
  }

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}




export default QRBoxerApi;