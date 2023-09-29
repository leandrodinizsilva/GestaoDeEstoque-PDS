<template>
    <popup-modal ref="popup">
        <h2 style="margin-top: 0">{{ title }}</h2>
        <p>{{ message }}</p>
        <div class="btns">
            <button @click="_cancel" type="button" class="btn btn-secondary primaryColorBtn">{{ cancelButton }}</button>
            <button @click="_confirm" type="button" class="btn btn-danger secondaryColorBtn">{{ okButton }}</button>
        </div>
    </popup-modal>
</template>

<script>
import PopupModal from './PopupModal.vue'

export default {
    name: 'ModalPergunta',

    components: { PopupModal },

    data: () => ({

        title: undefined,
        message: undefined, 
        okButton: undefined, 
        cancelButton: 'Cancelar', 

        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        show(opts = {}) {
            this.title = opts.title
            this.message = opts.message
            this.okButton = opts.okButton
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }

            this.$refs.popup.open()
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },

        _confirm() {
            this.$refs.popup.close()
            this.resolvePromise(true)
        },

        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
        },
    },
}
</script>

<style scoped>
    .btns {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .ok-btn {
        color: red;
        text-decoration: underline;
        line-height: 2.5rem;
        cursor: pointer;
    }

    .cancel-btn {
        padding: 0.5em 1em;
        background-color: #d5eae7;
        color: #35907f;
        border: 2px solid #0ec5a4;
        border-radius: 5px;
        font-weight: bold;
        font-size: 16px;
        text-transform: uppercase;
        cursor: pointer;
    }

    .window {
        padding:2rem !important
    
    }
</style>