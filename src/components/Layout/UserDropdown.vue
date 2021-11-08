<template>
    <div>
        <a
            ref="btnDropdownRef"
            class="text-blueGray-500 block"
        >
            <div class="items-center flex">
                <span v-if="user.photo"
                      class="w-10 h-10 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
                >
                  <img
                      :src="require('@/assets/logo.png')"
                      alt="..."
                      class="w-full rounded-full align-middle border-none shadow-lg"
                  />
                </span>
                <span v-else>
                    <span class="inline-block object-cover rounded-full bg-primary w-10 h-10">
                        <span class="flex h-full justify-center items-center text-xl font-bold text-white">
                            {{
                                getInitials(`${user.name}`)
                            }}
                        </span>
                    </span>
                </span>
            </div>
        </a>
        <!--        v-on:click="toggleDropdown($event)"-->
        <!--        <div-->
        <!--            ref="popoverDropdownRef"-->
        <!--            class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"-->
        <!--            v-bind:class="{-->
        <!--        hidden: !dropdownPopoverShow,-->
        <!--        block: dropdownPopoverShow-->
        <!--      }"-->
        <!--            style="min-width: 12rem"-->
        <!--        >-->
        <!--            <a-->
        <!--                href="#pablo"-->
        <!--                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"-->
        <!--            >-->
        <!--                Action-->
        <!--            </a>-->
        <!--            <a-->
        <!--                href="#pablo"-->
        <!--                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"-->
        <!--            >-->
        <!--                Another action-->
        <!--            </a>-->
        <!--            <a-->
        <!--                href="#pablo"-->
        <!--                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"-->
        <!--            >-->
        <!--                Something else here-->
        <!--            </a>-->
        <!--            <div class="h-0 my-2 border border-solid border-blueGray-100" />-->
        <!--            <a-->
        <!--                href="#pablo"-->
        <!--                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"-->
        <!--            >-->
        <!--                Seprated link-->
        <!--            </a>-->
        <!--        </div>-->
    </div>
</template>
<script>
import {createPopper} from "@popperjs/core";
import {getInitials} from "../../../helpers/getInitials";

export default {
    name: "UserDropdown",
    data() {
        return {
            dropdownPopoverShow: false,
            getInitials
        };
    },
    methods: {
        toggleDropdown: function (event) {
            event.preventDefault();
            if (this.dropdownPopoverShow) {
                this.dropdownPopoverShow = false;
            } else {
                this.dropdownPopoverShow = true;
                createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
                    placement: "bottom-end"
                });
            }
        }
    }
};
</script>