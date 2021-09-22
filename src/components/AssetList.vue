<template>
    <div>
        <table class="border-collapse border-1 border-blue-800 font-sm w-full" v-bind:style="style">
            <thead>
            <tr>
                <th :class="thClassStyle" scope="col">SN</th>
                <th :class="thClassStyle" scope="col">Name</th>
                <th :class="thClassStyle" scope="col">Exchange</th>
                <th :class="thClassStyle" scope="col">Symbol</th>
                <th :class="thClassStyle" scope="col">Qty</th>
                <th :class="thClassStyle" scope="col">Init Value</th>
                <th :class="thClassStyle" scope="col">Current Value</th>
                <th :class="thClassStyle" scope="col">P/L</th>
                <th :class="thClassStyle" scope="col">24Hr Change</th>
                <th :class="thClassStyle" scope="col">Status</th>
                <th :class="thClassStyle" scope="col">Bought</th>
                <th :class="thClassStyle" scope="col">ROI</th>
                <th :class="thClassStyle" scope="col">Daily ROI</th>
                <th :class="thClassStyle" scope="col">Current Price</th>
                <th :class="thClassStyle" scope="col">Updated</th>
                <th :class="thClassStyle" scope="col">P/L (N)</th>
                <th :class="thClassStyle" scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(log, index) in data"
                :key="index">
                <td :class="tdClassStyle">{{ index+1 }}</td>
                <td :class="tdClassStyle">
                  {{ log.asset.name }}
                  <span v-if="log.withdrawals.length"
                        @click="showWithdrawals(log.withdrawals)"
                        class="block w-max h-max text-white font-bold rounded px-2 py-1 text-xs bg-gray-600">
                    {{ log.withdrawals.length }} withdrawals
                  </span>
                </td>
                <td :class="tdClassStyle">{{ log.platform?.name }}</td>
                <td :class="tdClassStyle">{{ log.asset.symbol }}</td>
                <td :class="tdClassStyle">{{ log.quantity_bought }}</td>
                <td :class="tdClassStyle">${{ log.initial_value.toLocaleString() }}</td>
                <td :class="tdClassStyle">${{ log.current_value.toLocaleString() }}</td>
                <td :class="tdClassStyle">${{ log.profit_loss.toLocaleString() }}</td>
                <td :class="tdClassStyle">{{ log['24_hr_change'] }}</td>
                <td :class="tdClassStyle">{{ log.status }}</td>
                <td :class="tdClassStyle">{{ log.date_bought }}</td>
                <td :class="tdClassStyle">{{ log.roi }}%</td>
                <td :class="tdClassStyle">{{ log.daily_roi }}%</td>
                <td :class="tdClassStyle">${{ log.current_price }}</td>
                <td :class="tdClassStyle">
                    {{ timeAgo.format(new Date(log.last_updated_at)) }}
                </td>
                <td :class="tdClassStyle">&#8358;{{ parseFloat(log.profit_loss_naira).toLocaleString() }}</td>
                <td :class="tdClassStyle">
                  <button v-if="!log.is_sold" :class="defaultActionBtnStyle" @click="markAsSold(log.id)">Mark as Sold</button>

                  <button :class="defaultActionBtnStyle" @click="activateWithdrawalModal(log)">Log Withdrawal</button>

                  <button v-if="log.is_sold" :class="successActionBtnStyle">Sold</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import TimeAgo from "javascript-time-ago";
    import Axios from "../../config/axios";

    export default {
        name: "AssetList",
        props: {
            data: {
                type: Object,
                required: false
            },
            thStyle: {
                type: String,
                required: false
            },
            tdStyle: {
                type: String,
                required: false
            },
            cssStyle: {
                type: String,
                required: false,
                default: null
            }
        },

        data() {
            return {
              style: this.cssStyle ?? "font-size:14px;",
              timeAgo: new TimeAgo('en-US'),
              thClassStyle: 'p-2 border '+this.thStyle,
              tdClassStyle: 'p-2 border '+this.tdStyle,
              actionBtnStyle: 'w-max h-max text-white font-bold rounded px-2 py-1 text-xs ',
              // defaultActionBtnStyle: this.actionBtnStyle + 'bg-blue-600',
              // successActionBtnStyle: this.actionBtnStyle + 'bg-green-600',
              // dangerActionBtnStyle: this.actionBtnStyle + 'bg-red-600',
              defaultActionBtnStyle: 'w-max h-max text-white font-bold rounded px-2 py-1 my-1 text-xs bg-blue-600 block',
              successActionBtnStyle: 'w-max h-max text-white font-bold rounded px-2 py-1 text-xs bg-green-600',
              dangerActionBtnStyle: 'w-max h-max text-white font-bold rounded px-2 py-1 text-xs bg-red-600',
            }
        },

        mounted() {
          this.actionBtnStyle = 'w-max h-max text-white font-bold rounded px-2 py-1 text-xs ';
        },

      methods: {
        // roundInitialValue(value) {
        //   let val = (value);
        //   console.log('qwe', val);
        //
        //   return val;
        // },

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
                  withdrawalDate
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
        }
      },
    }
</script>

<style scoped>

</style>