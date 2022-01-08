import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
    plugins: [createPersistedState()],
    state: {
        user: {},
        userMenu: [
            {
                to: 'add-log',
                name: 'Log an Asset',
                iconName: 'money-bill'
            },
            {
                to: 'logs',
                name: 'Asset Logs',
                iconName: 'Logs'
            },
            {
                to: 'calculator',
                name: 'Calculator',
                iconName: 'calculator'
            },
        ],
        adminMenu: [
            {
                to: 'add-asset',
                name: 'Add Asset',
                iconName: 'Logs'
            },

            {
                to: 'waitlists-users',
                name: 'Waitlists',
                iconName: 'Logs'
            }
        ],
        setupSteps: {
            welcome: false,
            fiat: false,
            selectAssetlogger: false,
            cryptoSetupLogger: false,
            apiKeys: false,
            done: false,
        }
    },

    mutations: {
        storeUser (state, user) {
            state.user = user;
        },

        updateSetupStep (state, step=null) {
            state.setupSteps['welcome'] = false;
            state.setupSteps['fiat'] = false;
            state.setupSteps['selectAssetlogger'] = false;
            state.setupSteps['apiKeys'] = false;
            state.setupSteps['done'] = false;

            if (step) {
                state.setupSteps[step] = true;
            }
        }
    },
});