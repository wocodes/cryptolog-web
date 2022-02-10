import Axios from "../../config/axios";
import Alerts from "@/utilities/alerts";

export default class BotTradeService {
    static async getLogs() {
        try {
            const response = await Axios.get("/bot-logs");

            return response.data.data.data;
        } catch (e) {
            console.log('e', e);
            Alerts.showErrorToast(e);
        }

        return false;
    }
}