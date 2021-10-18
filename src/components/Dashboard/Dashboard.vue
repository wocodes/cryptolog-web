<template>
  <div>
    <AdminDashboard v-if="user.is_admin"/>
    <UserDashboard v-else />
  </div>
</template>

<script>
import UserDashboard from "@/components/User/UserDashboard";
import AdminDashboard from "@/components/Admin/AdminDashboard";

export default {
  name: "Dashboard",
  components: {AdminDashboard, UserDashboard},
}
</script>

<style scoped>

</style>