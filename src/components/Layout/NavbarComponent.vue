<template>
    <!-- Navbar -->
    <nav
        class="absolute top-0 left-0 w-full z-10 bg-white md:flex-row md:flex-nowrap md:justify-start flex items-center md:p-4"
    >
        <div
            class="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
        >
            <!-- Brand -->
            <a
                class="text-primary text-sm uppercase hidden lg:inline-block font-semibold"
                href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/dashboard"
            >Dashboard</a
            >
            <!-- Form -->
            <div
                class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"
            >
                <div>
                    Currency: <select class="border-0">
                    <option>USD</option>
                    <option>NGN</option>
                </select>
                </div>
            </div>
            <!-- User -->
            <ul
                class="flex-col md:flex-row list-none items-center hidden md:flex space-x-4"
            >
                <notification-dropdown></notification-dropdown>
                <user-dropdown-component></user-dropdown-component>
                <div class="font-bold">
                    {{ user.name }}
                </div>
            </ul>
        </div>
    </nav>

    <!-- End Navbar -->
</template>
<script>
import UserDropdownComponent from "./UserDropdown.vue";
import NotificationDropdown from "@/components/Layout/NotificationDropdown";
export default {
    name: "NavbarComponent",
    components: {
        NotificationDropdown,
        UserDropdownComponent
    }
};
</script>
