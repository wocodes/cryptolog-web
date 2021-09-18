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
            <tr v-for="(asset, index) in data"
                :key="index">
                <td :class="tdClassStyle">{{ index+1 }}</td>
                <td :class="tdClassStyle">{{ asset.asset.name }}</td>
                <td :class="tdClassStyle">{{ asset.platform?.name }}</td>
                <td :class="tdClassStyle">{{ asset.asset.symbol }}</td>
                <td :class="tdClassStyle">{{ asset.quantity_bought }}</td>
                <td :class="tdClassStyle">${{ asset.initial_value.toLocaleString() }}</td>
                <td :class="tdClassStyle">${{ asset.current_value.toLocaleString() }}</td>
                <td :class="tdClassStyle">${{ asset.profit_loss.toLocaleString() }}</td>
                <td :class="tdClassStyle">{{ asset['24_hr_change'] }}</td>
                <td :class="tdClassStyle">{{ asset.status }}</td>
                <td :class="tdClassStyle">{{ asset.date_bought }}</td>
                <td :class="tdClassStyle">{{ asset.roi }}%</td>
                <td :class="tdClassStyle">{{ asset.daily_roi }}%</td>
                <td :class="tdClassStyle">${{ asset.current_price }}</td>
                <td :class="tdClassStyle">
                    {{ timeAgo.format(new Date(asset.last_updated_at)) }}
                </td>
                <td :class="tdClassStyle">&#8358;{{ parseFloat(asset.profit_loss_naira).toLocaleString() }}</td>
                <td :class="tdClassStyle">
                  <button v-if="!asset.is_sold" :class="defaultActionBtnStyle" @click="markAsSold(asset.id)">Mark as Sold</button>

                  <button v-if="asset.is_sold" :class="successActionBtnStyle">Sold</button>
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
              defaultActionBtnStyle: 'w-max h-max text-white font-bold rounded px-2 py-1 text-xs bg-blue-600',
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
        }
      }
    }
</script>

<style scoped>

</style>