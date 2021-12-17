<template>
  <div class="w-full md:w-full mt-6 mx-4 md:mx-auto bg-white rounded-xl text-left shadow">
    <h3 class="font-medium text-lg mx-8 my-4">&#127881; Welcome</h3>

    <hr class="my-2">

    <div class="m-8">
      <h3 class="font-bold text-lg">Please select the asset you'd want to log</h3>
      <small class="text-gray-400">Now is a good time to begin your amazing journey. Time to make your first log. Select from below</small>

      <div class="mt-8">

        <div class="grid grid-cols-2 gap-x-10 gap-y-5">
          <AssetSelectorsOnWelcomeModal
              @click="openLoggerType(true)"
              style="cursor:pointer"
              custom-class="hover:border-blue-500 hover:bg-blue-100"
              name="Cryptocurrency"
              description="A tradeable/exchangeable digital currency">
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.136 23.117L21.54 25.532C22.276 25.717 24.544 26.453 24.88 25.091C25.23 23.67 22.871 23.302 22.136 23.117V23.117ZM22.949 19.82L22.409 22.011C23.021 22.165 24.909 22.795 25.215 21.556C25.533 20.263 23.561 19.975 22.949 19.82V19.82ZM23 13C21.0222 13 19.0888 13.5865 17.4443 14.6853C15.7998 15.7841 14.5181 17.3459 13.7612 19.1732C13.0043 21.0004 12.8063 23.0111 13.1922 24.9509C13.578 26.8907 14.5304 28.6725 15.9289 30.0711C17.3275 31.4696 19.1093 32.422 21.0491 32.8079C22.9889 33.1937 24.9996 32.9957 26.8268 32.2388C28.6541 31.4819 30.2159 30.2002 31.3147 28.5557C32.4135 26.9112 33 24.9778 33 23C33 21.6868 32.7413 20.3864 32.2388 19.1732C31.7363 17.9599 30.9997 16.8575 30.0711 15.9289C29.1425 15.0003 28.0401 14.2638 26.8268 13.7612C25.6136 13.2587 24.3132 13 23 13V13ZM27.358 21.575C27.337 21.9586 27.1898 22.3246 26.9393 22.6159C26.6889 22.9072 26.3491 23.1077 25.973 23.186C26.2203 23.2867 26.444 23.4374 26.6301 23.6288C26.8162 23.8203 26.9606 24.0481 27.0543 24.2981C27.148 24.5481 27.1888 24.8148 27.1743 25.0814C27.1598 25.348 27.0903 25.6086 26.97 25.847C26.384 27.539 24.993 27.682 23.143 27.328L22.694 29.148L21.609 28.874L22.052 27.079C21.772 27.009 21.484 26.934 21.188 26.852L20.743 28.656L19.659 28.383L20.109 26.559C19.855 26.494 19.598 26.424 19.335 26.358L17.923 26.002L18.462 24.746C18.462 24.746 19.262 24.961 19.25 24.945C19.2998 24.9611 19.3522 24.9671 19.4043 24.9627C19.4564 24.9583 19.5071 24.9435 19.5535 24.9193C19.5998 24.8951 19.6409 24.862 19.6743 24.8217C19.7077 24.7815 19.7328 24.735 19.748 24.685L20.965 19.746C20.9806 19.5948 20.9365 19.4435 20.8422 19.3243C20.7479 19.2052 20.6107 19.1275 20.46 19.108C20.476 19.097 19.671 18.91 19.671 18.91L19.961 17.738L21.456 18.116L21.455 18.122C21.68 18.178 21.912 18.232 22.148 18.286L22.592 16.484L23.677 16.758L23.241 18.524C23.532 18.592 23.825 18.659 24.111 18.731L24.543 16.976L25.628 17.25L25.183 19.052C26.553 19.529 27.555 20.245 27.358 21.575V21.575Z" fill="#2A6FD6"/>
              <rect x="0.5" y="0.5" width="45" height="45" rx="9.5" stroke="#005EF6"/>
            </svg>
          </AssetSelectorsOnWelcomeModal>

          <AssetSelectorsOnWelcomeModal
              class="border-gray-200 text-grey-100"
              name="Real Estate"
              description="Coming soon...">
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.6">
                <path d="M31.401 19.3334C31.2944 19.3338 31.189 19.3087 31.093 19.26L23.001 14.9334L14.909 19.2307C14.7364 19.3163 14.5384 19.3265 14.3585 19.2591C14.1787 19.1917 14.0317 19.0522 13.95 18.8714C13.8684 18.6905 13.8586 18.483 13.9229 18.2946C13.9873 18.1062 14.1204 17.9523 14.293 17.8667L23.001 13.3494L31.709 17.8667C31.8926 17.9116 32.0519 18.0305 32.1524 18.1975C32.2529 18.3646 32.2865 18.5664 32.246 18.7593C32.2055 18.9522 32.0941 19.1205 31.936 19.228C31.7778 19.3354 31.5857 19.3733 31.401 19.3334ZM19.501 26.6667H15.301V31.0667H19.501V26.6667ZM25.101 26.6667H20.901V31.0667H25.101V26.6667ZM30.701 26.6667H26.501V31.0667H30.701V26.6667ZM27.901 20.8H23.701V25.2H27.901V20.8ZM22.301 20.8H18.101V25.2H22.301V20.8Z" fill="#2A6FD6"/>
              </g>
              <rect x="0.5" y="0.5" width="45" height="45" rx="9.5" stroke="#005EF6"/>
            </svg>
          </AssetSelectorsOnWelcomeModal>


          <AssetSelectorsOnWelcomeModal
              custom-class="border-gray-200"
              name="Stocks"
              description="Coming soon...">
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.6">
                <path d="M26.3333 14.25L30.5 18.625V30.882C30.4998 31.1123 30.4125 31.3331 30.2573 31.4958C30.1022 31.6586 29.8918 31.75 29.6725 31.75H16.3275C16.1086 31.7484 15.8992 31.6565 15.7443 31.4941C15.5895 31.3316 15.5017 31.1118 15.5 30.882V15.118C15.5 14.6385 15.8708 14.25 16.3275 14.25H26.3333ZM22.1667 18.625V27.375H23.8333V18.625H22.1667ZM25.5 22.125V27.375H27.1667V22.125H25.5ZM18.8333 23.875V27.375H20.5V23.875H18.8333Z" fill="#2A6FD6"/>
              </g>
              <rect x="0.5" y="0.5" width="45" height="45" rx="9.5" stroke="#005EF6"/>
            </svg>
          </AssetSelectorsOnWelcomeModal>


          <AssetSelectorsOnWelcomeModal
              custom-class="border-gray-200"
              name="NFTs"
              description="Coming soon...">
              <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.6">
                  <path d="M27.2807 18.1001L23.4673 14.1101C23.3428 13.9783 23.1736 13.9039 22.9968 13.9031C22.82 13.9023 22.6502 13.9753 22.5247 14.1059L22.5206 14.1101L18.7207 18.1001H15.0007C14.8238 18.1001 14.6543 18.1739 14.5292 18.3052C14.4042 18.4364 14.334 18.6145 14.334 18.8001V31.4001C14.334 31.5858 14.4042 31.7638 14.5292 31.8951C14.6543 32.0264 14.8238 32.1001 15.0007 32.1001H31.0007C31.1775 32.1001 31.347 32.0264 31.4721 31.8951C31.5971 31.7638 31.6673 31.5858 31.6673 31.4001V18.8001C31.6673 18.6145 31.5971 18.4364 31.4721 18.3052C31.347 18.1739 31.1775 18.1001 31.0007 18.1001H27.2807ZM23.0007 15.5941L25.3873 18.1001H20.614L23.0007 15.5941ZM30.334 30.7001H15.6673V19.5001H30.334V30.7001ZM19.6673 23.7001C19.3137 23.7001 18.9746 23.5526 18.7245 23.2901C18.4745 23.0275 18.334 22.6714 18.334 22.3001C18.334 21.9288 18.4745 21.5727 18.7245 21.3102C18.9746 21.0476 19.3137 20.9001 19.6673 20.9001C20.0209 20.9001 20.3601 21.0476 20.6101 21.3102C20.8602 21.5727 21.0007 21.9288 21.0007 22.3001C21.0007 22.6714 20.8602 23.0275 20.6101 23.2901C20.3601 23.5526 20.0209 23.7001 19.6673 23.7001ZM29.0007 29.3001H19.0007L21.0007 25.1001L22.6673 28.6001L25.6673 22.3001L29.0007 29.3001Z" fill="#2A6FD6"/>
                </g>
                <rect x="0.5" y="0.5" width="45" height="45" rx="9.5" stroke="#005EF6"/>
              </svg>
          </AssetSelectorsOnWelcomeModal>
        </div>
      </div>
    </div>


    <WelcomeCryptoLogOptions v-if=cryptoLoggerTypeModalIsOpen :is-open="cryptoLoggerTypeModalIsOpen" @cryptoSelectedLogType="handleSelectedLogType"/>

    <WelcomeCryptoExchangeSelector v-if=openCryptoExchangeSelector :is-open="openCryptoExchangeSelector"/>

  </div>
</template>

<script>
import AssetSelectorsOnWelcomeModal from "@/components/Dashboard/Welcome/AssetSelectorsOnWelcomeModal";

import WelcomeCryptoLogOptions from "@/components/Dashboard/Welcome/WelcomeCryptoLogOptions";
import WelcomeCryptoExchangeSelector from "@/components/Dashboard/Welcome/WelcomeCryptoExchangeSelector";



export default {
  name: "WelcomeModal",
  components: {
    WelcomeCryptoExchangeSelector,
    WelcomeCryptoLogOptions, AssetSelectorsOnWelcomeModal},
  data() {
    return {
      cryptoLoggerTypeModalIsOpen: false,
      openCryptoExchangeSelector: false,
    }
  },

  methods: {
    handleSelectedLogType(value) {
      if(value === "exchange") {
        this.cryptoLoggerTypeModalIsOpen = false;
        this.openCryptoExchangeSelector = true;
      }
    },

    openLoggerType(value) {
      this.cryptoLoggerTypeModalIsOpen = value
    }
  }

}
</script>

<style scoped>

</style>