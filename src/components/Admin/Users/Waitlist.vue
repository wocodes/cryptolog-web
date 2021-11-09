<template>
  <div>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        &rarr; {{ user.email }}
        - <button v-if="!user.invited" class='bg-blue-600 text-white px-1 rounded' @click="sendInvite(user.id)">Send Invite</button>
        <span v-if="user.invited">Invite Sent</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Axios from "../../../../config/axios";

export default {
  name: "Waitlist",
  data() {
    return {
      users: []
    }
  },

  created() {
    this.getWaitlist();
  },

  methods: {
    sendInvite(userId) {
      this.showLoader("Sending Invite...");
      Axios.get('admin/users/send-invite/'+userId)
          .then(resp => {
            this.showSuccessToast(resp.data.message)
            this.getWaitlist();
            this.hideLoader();
          })
          .catch(error => console.log(error))
          .finally(() => this.hideLoader());
    },


    getWaitlist() {
      this.showLoader();
      Axios.get('admin/users/waitlist')
          .then(resp => this.users = resp.data.data)
          .catch(error => console.log(error))
          .finally(() => this.hideLoader());
    }
  }
}
</script>

<style scoped>

</style>