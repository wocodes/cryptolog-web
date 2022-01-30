import Axios from "../../config/axios";
import Alerts from "@/utilities/alerts";

export default class WalletService {
    static async getBalance() {
        try {
            const response = await Axios.get("/user/wallet");
            // Alerts.showSuccessToast(response.data.message);
            const balance = response.data.data.current_balance;
            let appStore = JSON.parse(localStorage.getItem('vuex'));

            appStore.user.wallet = {current_balance: balance};
            localStorage.setItem('vuex', JSON.stringify(appStore));

            return balance;
        } catch (e) {
            console.log('e', e);
            Alerts.showErrorToast(e);
        }

        return false;
    }

    static async creditUserWallet(data, amount) {
        let status = false;

        if (data.status === 'success' && data.message === 'Approved') {
            const walletData = {
                amount: amount,
                trans_ref: data.trxref,
                trans_id: data.trans,
            };

            await Axios.post('user/wallet/credit', walletData)
                .then(() => {
                    Alerts.showSuccessToast('Wallet Funding Successful');

                    status = true;
                })
                .catch(e => Alerts.showErrorToast(e));
        } else {
            Alerts.showErrorToast('Wallet Funding Failed');
        }

        return status;
    }
}