import axios, { AxiosError } from 'axios';

class Api {
    init() {
        this.setBaseURL();
    }

    setBaseURL() {
        return axios.create({
            baseURL: 'https://api-recados-growdev.vercel.app',
        });
    }

    async doGet(url: string) {
        try {
            const response = await this.setBaseURL().get(url);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response;
            }
        }
    }

    async doPost(url: string, body: object) {
        try {
            const response = await this.setBaseURL().post(url, body);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response;
            }
        }
    }

    async doPut(url: string, body: object) {
        try {
            const response = await this.setBaseURL().put(url, body);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response;
            }
        }
    }

    async doDelete(url: string) {
        try {
            const response = await this.setBaseURL().delete(url);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response;
            }
        }
    }
}

const instace = new Api();
export default instace;
