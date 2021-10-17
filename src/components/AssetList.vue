<template>
    <div class="m-5 text-left">
      <h5 class="font-bold mb-2 mr-2 inline-block text-left">{{ title }}</h5>
      <button class="font-bold py-1 px-2 rounded-md inline-block float-right text-sm text-blue-700"
              >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg> Refresh
      </button>

        <table class="border-collapse bg-white font-sm w-full rounded-xl rounded-xl" style="font-size:12px;">
            <thead>
            <tr class="rounded-2xl">
                <th class="bg-gray-200 p-3 rounded-tl-xl rounded-bl-xl" scope="col">Name</th>
                <th :class="thClassStyle" scope="col">Bought</th>
                <th :class="thClassStyle" scope="col">Quantity</th>
                <th :class="thClassStyle" scope="col">Initial Value</th>
                <th :class="thClassStyle" scope="col">Current Value</th>
                <th :class="thClassStyle" scope="col">Profit/Loss</th>
                <th :class="thClassStyle" scope="col">24hrs Change</th>
                <th :class="thClassStyle" scope="col">ROI</th>
                <th :class="thClassStyle" scope="col">Daily ROI</th>
                <th :class="thClassStyle" scope="col">Current Price</th>
                <th :class="thClassStyle" scope="col">Updated</th>
                <th :class="thClassStyle" scope="col">Status</th>
                <th class="bg-gray-200 p-3 rounded-tr-xl rounded-br-xl" scope="col"></th>
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

                <td :class="tdClassStyle">
                  <p>{{ dateBought(log.date_bought ?? log.created_at) }}</p>
                  <small>{{ timeBought(log.date_bought ?? log.created_at) }}</small>
                </td>

                <td :class="tdClassStyle">{{ parseFloat(log.quantity_bought).toFixed(4) }}</td>

                <td :class="tdClassStyle">
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

                <td :class="tdClassStyle">
                  <span :class="{'text-red-600': log['24_hr_change'] < 0, 'text-green-600': log['24_hr_change'] > 0}">{{ log['24_hr_change'] }}</span>
                </td>

                <td :class="tdClassStyle">{{ parseFloat(log.roi).toFixed(2) }}%</td>

                <td :class="tdClassStyle">{{ parseFloat(log.daily_roi).toFixed(2) }}%</td>

                <td :class="tdClassStyle">
                  <p>${{ parseFloat(parseFloat(log.current_price).toFixed(2)).toLocaleString() }}</p>
                  <small>{{ user.fiat.symbol }} {{ parseFloat(parseFloat(user.fiat.usdt_sell_rate * log.current_price).toFixed(2)).toLocaleString() }}</small>
                </td>

                <td :class="tdClassStyle">
                    {{ timeAgo.format(new Date(log.last_updated_at)) }}
                </td>

                <td :class="tdClassStyle">
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
                <td :class="tdClassStyle">
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

    TimeAgo.addDefaultLocale(en)

    export default {
      name: "AssetList",
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

        fetchUpdatedAssetsData() {
          this.showLoader();
          Axios.get("/logs/update")
              .then(() => {
                this.fetchAssets();
              })
              .catch(err => console.log(err))
              .finally(() => this.hideLoader())
        }
      },
    }
</script>

<style scoped>

</style>