<template>
    <div class="text-left">
      <h5 class="font-bold mb-2 mr-2 inline-block text-left text-blue-800">{{ title }}</h5>
      <UpdateAssetsButtonComponent class="hidden md:inline-block" @assetsUpdated="catchAssetsUpdatedEvent "/>

        <table class="border-collapse bg-white font-sm w-full rounded-xl rounded-xl" style="font-size:12px;">
            <thead>
            <tr class="rounded-2xl">
                <th class="bg-gray-200 p-3 rounded-tl-xl rounded-bl-xl" scope="col">Name</th>
                <th class="hidden md:table-cell" :class="thClassStyle" scope="col">Bought</th>
                <th class="hidden md:table-cell" :class="thClassStyle" scope="col">Quantity</th>
                <th class="hidden md:table-cell" :class="thClassStyle" scope="col">Initial Value</th>
                <th :class="thClassStyle" scope="col">Current Value</th>
                <th :class="thClassStyle" scope="col">Profit/Loss</th>
                <th class="hidden md:table-cell" :class="thClassStyle" scope="col">24hrs Change</th>
                <th class="hidden md:table-cell" :class="thClassStyle" scope="col">ROI</th>
                <th class="hidden md:table-cell" :class="thClassStyle" scope="col">Daily ROI</th>
                <th class="hidden md:table-cell" :class="thClassStyle" scope="col">Current Price</th>
                <th class="hidden md:table-cell" :class="thClassStyle" scope="col">Updated</th>
                <th class="hidden md:table-cell" :class="thClassStyle" scope="col">Status</th>
                <th class="bg-gray-200 p-3 rounded-tr-xl rounded-br-xl" scope="col" v-if="assets && assets.length"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="assets && !assets.length" class="text-center">
              <td colspan="12" class="m-auto w-full text-lg p-10">
                No {{ title }} yet.
<!--                <router-link to="{to: 'log-asset'}">Log your first asset!</router-link>-->
              </td>
            </tr>

            <tr v-else v-for="(log, index) in assets"
                :key="index">
                <td :class="tdClassStyle">
                  <strong>{{ log.asset.name }}</strong>
                  <small class="ml-1">({{ log.asset.symbol }})</small>

                  <p>{{ log.platform?.name }}</p>
                </td>

                <td class="hidden md:table-cell" :class="tdClassStyle">
                  <p>{{ dateBought(log.date_bought ?? log.created_at) }}</p>
                  <small>{{ timeBought(log.date_bought ?? log.created_at) }}</small>
                </td>

                <td class="hidden md:table-cell" :class="tdClassStyle">{{ parseFloat(log.quantity_bought).toFixed(4) }}</td>

                <td class="hidden md:table-cell" :class="tdClassStyle">
                  <p>${{ log.initial_value.toLocaleString() }}</p>
                  <small>{{ user.fiat.symbol }} {{ log.initial_value_fiat.toLocaleString() }}</small>
                </td>

                <td :class="tdClassStyle">
                  <p>${{ log.current_value.toLocaleString() }}</p>
                  <small>{{ user.fiat.symbol }} {{ log.current_value_fiat.toLocaleString() }}</small>
                </td>

                <td :class="tdClassStyle">
                  <p>${{ log.profit_loss.toLocaleString() }}</p>
                  <small>
                    {{ user.fiat.symbol }}
                    {{ parseFloat(log.profit_loss_fiat ? log.profit_loss_fiat : log.quantity_bought * user.fiat.usdt_sell_rate).toFixed(2) }}
                  </small>
                </td>

                <td class="hidden md:table-cell" :class="tdClassStyle">
                  <span :class="{'text-red-600': log['24_hr_change'] < 0, 'text-green-600': log['24_hr_change'] > 0}">{{ log['24_hr_change'] }}</span>
                </td>

                <td class="hidden md:table-cell" :class="tdClassStyle">{{ parseFloat(log.roi).toFixed(2) }}%</td>

                <td class="hidden md:table-cell" :class="tdClassStyle">{{ parseFloat(log.daily_roi).toFixed(2) }}%</td>

                <td class="hidden md:table-cell" :class="tdClassStyle">
                  <p>${{ parseFloat(parseFloat(log.current_price).toFixed(2)).toLocaleString() }}</p>
                  <small>{{ user.fiat.symbol }} {{ parseFloat(parseFloat(user.fiat.usdt_sell_rate * log.current_price).toFixed(2)).toLocaleString() }}</small>
                </td>

                <td class="hidden md:table-cell" :class="tdClassStyle">
                    {{ timeAgo.format(new Date(log.last_updated_at)) }}
                </td>

                <td class="hidden md:table-cell" :class="tdClassStyle">
                  <span v-if="log.withdrawals.length"
                        @click="showWithdrawals(log.withdrawals)"
                        class="block w-max h-max text-white font-bold rounded px-2 py-1 text-red-900 bg-red-200">
                    {{ log.withdrawals.length }} withdrawals
                  </span>

                  <span v-if="log.quantity_bought == 0"
                        @click="showWithdrawals(log.withdrawals)"
                        class="block w-max h-max text-white font-bold rounded px-2 py-1 text-green-900 bg-green-200">
                    Sold
                  </span>

                  <span v-if="log.quantity_bought > 0.00000 && !log.withdrawals.length"
                        @click="showWithdrawals(log.withdrawals)"
                        class="block w-max h-max text-white font-bold rounded px-2 py-1 text-green-900 bg-green-200">
                    Active
                  </span>
                </td>
                <td :class="tdClassStyle" v-if="assets && assets.length">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
        </table>
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
      } ,

      created() {
        this.fetchAssets();
      },

      methods: {
        fetchAssets() {
          this.showLoader();
          Axios.get("/logs", {params: this.type ? {'mode': this.type} : {}})
              .then(resp => {
                this.assets = resp.data.data
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
            const response = await Axios.post('/logs/' + data.log_id + '/withdrawal', data);

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
          if(value) {
            this.fetchAssets();
          }
        }
      },
    }
</script>

<style scoped>

</style>