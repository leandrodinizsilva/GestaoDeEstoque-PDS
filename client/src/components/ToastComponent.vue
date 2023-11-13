<template>
<div>
</div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

  export default {
       name: 'ToastComponent',
       methods:{
        ativar(mensagem, type){
            if(type == 'sucesso'){
                    toast(mensagem, {
                    autoClose:1000,
                    theme: 'light',
                    type: 'success'
                })
            }
            else if(type == 'erro'){
                    toast(mensagem, {
                    autoClose:1000,
                    theme: 'light',
                    type: 'error'
                })
            }
            

        }
       }
    }
</script>



