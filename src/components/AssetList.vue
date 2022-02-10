<template>
    <div class="text-left">
        <div class="flex mb-3 flex-row-reverse">
            <UpdateAssetsButtonComponent :light="updateButtonLight" class="hidden md:inline-block order-last"
                                         @assetsUpdated="catchAssetsUpdatedEvent "/>
        </div>
        <div class="">
            <div class="bg-white rounded-tl-xl rounded-tr-xl p-3 space-x-2">
                <h5 class="font-bold inline-block text-left text-blue-800">{{ title }}</h5>
                <em v-if="assets && assets.length" class="text-xs text-gray-700">Updated
                    {{ timeAgo.format(new Date(assets[0].last_updated_at)) }}</em>
            </div>

            <table class="border-collapse bg-white font-sm w-full rounded-xl" style="font-size:12px;">
                <thead>
                <tr class="">
                    <th class="bg-gray-200 p-3" scope="col">Name</th>
                    <th :class="thClassStyle" class="hidden md:table-cell" scope="col">Bought</th>
                    <th :class="thClassStyle" class="hidden md:table-cell" scope="col">Initial Value</th>
                    <th :class="thClassStyle" scope="col">Current Value</th>
                    <th :class="thClassStyle" scope="col">Profit/Loss</th>
                    <th :class="thClassStyle" class="hidden md:table-cell" scope="col">24hrs Change</th>
                    <th :class="thClassStyle" class="hidden md:table-cell" scope="col">ROI</th>
                    <th :class="thClassStyle" class="hidden md:table-cell" scope="col">Daily ROI</th>
                    <th :class="thClassStyle" class="hidden md:table-cell" scope="col">Current Price</th>
                    <th :class="thClassStyle" class="hidden md:table-cell" scope="col">Status</th>
                    <th v-if="assets && assets.length" class="bg-gray-200 p-3" scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="assets && !assets.length" class="text-center">
                    <td class="m-auto w-full text-lg p-10" colspan="12">
                        No {{ title }} yet.
                        <!--                <router-link to="{to: 'log-asset'}">Log your first asset!</router-link>-->
                    </td>
                </tr>

                <tr v-for="(log, index) in assets" v-else
                    :key="index"
                    :class="{
                      'bg-red-50': log.profit_loss < 0 && !log.is_sold,
                      'bg-green-50': log.profit_loss > 0 && !log.is_sold,
                      'text-gray-300 hover:text-gray-500 cursor-pointer': log.is_sold
                    }"
                >
                    <td :class="tdClassStyle">
                        <strong v-if="log.asset.name.length < 6">{{ log.asset.name }}</strong>
                        <strong v-else title="log.asset.name">{{ log.asset.name.substr(0, 6)+'...' }}</strong>
                        <small class="ml-1" v-if="log.asset.symbol">({{ log.asset.symbol}})</small>

                        <p>{{ log.platform?.name }}</p>
                        <p>{{ parseFloat(log.quantity_bought).toFixed(4) }}</p>
                    </td>

                    <td :class="tdClassStyle" class="hidden md:table-cell">
                        <p>{{ dateBought(log.date_bought ?? log.created_at) }}</p>
                        <small>{{ timeBought(log.date_bought ?? log.created_at) }}</small>
                    </td>

                    <td :class="tdClassStyle" class="hidden md:table-cell">
                        <p>${{ parseFloat(log.initial_value).toLocaleString() }}</p>
                        <small>
                          <span v-if="user.fiat.short_symbol" v-html="user.fiat.short_symbol"></span>
                          <span v-else>{{ user.fiat.symbol }}</span>{{ parseFloat(log.initial_value_fiat).toLocaleString() }}
                        </small>
                    </td>

                    <td :class="tdClassStyle">
                        <p>${{ parseFloat(log.current_value).toLocaleString() }}</p>
                        <small>
                          <span v-if="user.fiat.short_symbol" v-html="user.fiat.short_symbol"></span>
                          <span v-else>{{ user.fiat.symbol }}</span>{{ parseFloat(log.current_value_fiat).toLocaleString() }}
                        </small>
                    </td>

                    <td :class="tdClassStyle">
                        <p>${{ log.profit_loss.toLocaleString() }}</p>
                        <small>
                          <span v-if="user.fiat.short_symbol" v-html="user.fiat.short_symbol"></span>
                          <span v-else>{{ user.fiat.symbol }}</span>{{
                            parseFloat(log.profit_loss_fiat ? log.profit_loss_fiat : log.quantity_bought * user.fiat.usdt_sell_rate).toLocaleString()
                          }}
                        </small>
                    </td>

                    <td :class="tdClassStyle" class="hidden md:table-cell">
                    <span :class="{
                      'text-red-600': log['24_hr_change'] < 0 && !log.is_sold,
                      'text-green-600': log['24_hr_change'] > 0 && !log.is_sold,
                      'text-gray-300 hover:text-gray-500': log.is_sold
                    }">{{
                            log['24_hr_change']
                        }}</span>
                    </td>

                    <td :class="tdClassStyle" class="hidden md:table-cell">{{ parseFloat(log.roi).toFixed(2) }}%</td>

                    <td :class="tdClassStyle" class="hidden md:table-cell">{{ parseFloat(log.daily_roi).toFixed(2) }}%</td>

                    <td :class="tdClassStyle" class="hidden md:table-cell">
                      <p>${{ parseFloat(parseFloat(log.current_price).toFixed(2)).toLocaleString() }}</p>
                      <small>
                        <span v-if="user.fiat.short_symbol" v-html="user.fiat.short_symbol"></span>
                        <span v-else>{{ user.fiat.symbol }}</span>{{ parseFloat(parseFloat(user.fiat.usdt_sell_rate * log.current_price).toFixed(2)).toLocaleString() }}
                      </small>
                    </td>


                    <td :class="tdClassStyle" class="hidden md:table-cell">
                  <span v-if="log.withdrawals.length && !log.is_sold"
                        class="block w-max h-max text-white font-bold rounded px-2 py-1 text-red-900 bg-red-200"
                        @click="showWithdrawals(log.withdrawals)">
                    {{ log.withdrawals.length }} withdrawals
                  </span>

                  <span v-if="log.withdrawals.length && log.is_sold"
                        class="block w-max h-max text-white font-bold rounded px-2 py-1 text-green-200 bg-green-50"
                        @click="showWithdrawals(log.withdrawals)">
                    Sold
                  </span>

                  <span v-if="log.quantity_bought == 0"
                        class="block w-max h-max text-white font-bold rounded px-2 py-1 text-green-900 bg-green-200"
                        @click="showWithdrawals(log.withdrawals)">
                    Sold
                  </span>

                  <span v-if="log.quantity_bought > 0.00000 && !log.withdrawals.length"
                        class="block w-max h-max text-white font-bold rounded px-2 py-1 text-green-900 bg-green-200"
                        @click="showWithdrawals(log.withdrawals)">
                    Active
                  </span>
                    </td>
                    <td v-if="assets && assets.length" :class="tdClassStyle">
                        <button>
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"/>
                            </svg>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import Axios from "../../config/axios";
import UpdateAssetsButtonComponent from "@/components/User/Logs/UpdateAssetsButtonComponent";

TimeAgo.addDefaultLocale(en)

export default {
    name: "AssetList",
    components: {UpdateAssetsButtonComponent},
    props: {
        title: {
            type: String,
            default: "Assets"
        },
        type: {
            type: String
        },
        thStyle: {
            type: String,
            required: false
        },
        tdStyle: {
            type: String,
            required: false
        },
        updateButtonLight: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            assets: null,
            timeAgo: new TimeAgo('en-US'),
            thClassStyle: 'bg-gray-200 p-3',
            tdClassStyle: 'p-3 ',
            actionBtnStyle: 'w-max h-max text-white font-bold rounded px-2 py-1 text-xs ',
            defaultActionBtnStyle: 'w-max h-max text-white font-bold rounded px-2 py-1 my-1 bg-blue-600 block',
            successActionBtnStyle: 'w-max h-max text-white font-bold rounded px-2 py-1 bg-green-600',
            dangerActionBtnStyle: 'w-max h-max text-white font-bold rounded px-2 py-1 bg-red-600',
        }
    },

    created() {
        this.fetchAssets();
    },

    methods: {
        fetchAssets() {
            this.showLoader();
            Axios.get("/asset-logs", {params: this.type ? {'mode': this.type} : {}})
                .then(resp => {
                    this.assets = this.type ? resp.data.data.data : resp.data.data
                })
                .catch(err => console.log(err))
                .finally(() => this.hideLoader());
        },


        markAsSold(assetId) {
            Axios.put(`/assets/log/${assetId}/sold`)
                .then((resp) => {
                    this.showSuccessToast(resp.data.message);
                    console.log('resp', resp)
                })
                .catch(err => console.log(err))
        },

        showWithdrawals(withdrawals) {
            let withdrawalList = '<table class="table stripe">';
            withdrawalList += '<tr><th>Qty</th><th>Initial</th><th>Current</th><th>Date</th></tr>';
            withdrawals.forEach(withdrawal => {
                withdrawalList += `<tr><td>${withdrawal.quantity}</td><td>${withdrawal.initial_value}</td><td>${withdrawal.current_value}</td>`;
                withdrawal.date ? withdrawalList += `<td>${withdrawal.date}</td>` : '';
                withdrawalList += `</tr>`;
            });
            withdrawalList += '</table>';

            this.$swal.fire({
                title: 'Withdrawals',
                html: withdrawalList,
                showCloseButton: true,
                cancelButtonText: 'Ok',
                width: '800px'
            });
        },

        async logWithdrawal(data) {
            let loader = this.$loading.show();
            try {
                const response = await Axios.post('/asset-logs/' + data.log_id + '/withdrawal', data);

                console.log('response', response);
            } catch (e) {
                console.error(e);
            } finally {
                loader.hide()
            }
        },

        activateWithdrawalModal(log) {
            // console.log('ass', asset);
            let vm = this;
            this.$swal.fire({
                title: 'Log Withdrawal',
                html: `
              Asset: <input type="text" value="${log.asset.name}" readonly /> <br>
              Amount: <input type="number" id="withdrawal-amount" /> <br>
              Quantity: <input type="number" id="withdrawal-quantity" /> <br>
              Date: <input type="date" id="withdrawal-date" />
            `,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                preConfirm: () => {
                    return new Promise(function (resolve) {
                        const withdrawalAmount = document.getElementById('withdrawal-amount').value;
                        const withdrawalQuantity = document.getElementById('withdrawal-quantity').value;
                        const withdrawalDate = document.getElementById('withdrawal-date').value;
                        // if (parseFloat(withdrawalAmount) > parseFloat(log.current_value)) {
                        //   vm.$swal.showValidationMessage('Amount cannot be higher than current value');
                        // }

                        if (parseFloat(withdrawalQuantity) > parseFloat(log.quantity_bought)) {
                            vm.$swal.showValidationMessage('Quantity cannot be higher than quantity bought');
                        }

                        resolve([
                            withdrawalAmount,
                            withdrawalQuantity,
                            withdrawalDate,
                        ])
                    })
                }
            }).then(function (result) {
                if (result.value) {
                    const withdrawalData = {
                        'log_id': log.id,
                        'value': result.value[0],
                        'quantity': result.value[1],
                        'date': result.value[2],
                    };

                    vm.logWithdrawal(withdrawalData);
                }
            });
        },

        dateBought(date_time) {
            return new Date(date_time).toLocaleDateString();
        },

        timeBought(date_time) {
            return new Date(date_time).toLocaleTimeString();
        },

        catchAssetsUpdatedEvent(value) {
            if (value) {
                this.fetchAssets();
            }
        }
    },
}
</script>

<style scoped>

</style>