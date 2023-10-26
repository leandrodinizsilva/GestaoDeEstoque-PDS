<template>
  <ToastComponent ref="toast"></ToastComponent>

  <div class="form-group col-10" style="display: flex; margin-top: 10px">
    <label class="col-1">Depósito</label>
    <div class="col-2">
      <select v-model="DepositoSelecionado" class="form-control">
        <option value=""></option>
        <option
          v-for="deposito in depositos"
          :key="deposito.id"
          :value="deposito.id"
        >
          {{ deposito.nome }}
        </option>
      </select>
      <span name="DepositoSelecionado" class="spanErro"></span>
    </div>
  </div>

  <div class="form-group col-10" style="display: flex; margin-bottom;: 5px">
    <label class="col-1">Material</label>
    <div class="col-2">
      <select
        v-model="MaterialSelecionado"
        class="form-control"
        v-on:change="carregarUnidade()"
      >
        <option value=""></option>
        <option
          v-for="material in materiais"
          :key="material.id"
          :value="material.id"
        >
          {{ material.nome }}
        </option>
      </select>
      <span name="MaterialSelecionado" class="spanErro"></span>
    </div>
  </div>

  <div style="width: 600px !important; height: 400px !important">
    <BarChart
      :labels="labelsMaterialPorData"
      :label="labelMaterialPorData"
      :data="dataMaterialPorData"
    ></BarChart>
  </div>
</template>

<script>
import ToastComponent from "../components/ToastComponent.vue";
import axios from "axios";
import BarChart from "@/components/BarChart.vue";
import { mapState } from "vuex";

export default {
  name: "BoardView",
  components: { ToastComponent, BarChart },
  data() {
    return {
      dataMaterialPorData: [12, 5, 30],
      labelsMaterialPorData: ["teste1", "teste2", "teste3"],
      labelMaterialPorData: "teste",

      entrada: {
        id: this.$route.params.codigoEntrada,
        depositoId: null,
        materialId: null,
        quantidade: null,
        data: null,
      },
      unidadeMaterial: "?",
      MaterialSelecionado: null,
      DepositoSelecionado: null,
      depositos: null,
      materiais: null,
    };
  },
  computed: mapState(["sessaoValida"]),
  methods: {
    carregarDepositos() {
      axios.post("deposito").then((result) => {
        this.depositos = result.data;
      });
    },
    carregarMateriais() {
      axios.post("material").then((result) => {
        this.materiais = result.data;
      });
    },
    carregarUnidade() {
      if (this.entrada.materialId > 0) {
        axios
          .post("material/carregarUnidadeMaterial", {
            id: this.entrada.materialId,
          })
          .then((result) => {
            this.unidadeMaterial = result.data.unidade;
          });
      } else {
        this.unidadeMaterial = "?";
      }
    },
  },
  mounted() {
    this.carregarDepositos();
    this.carregarMateriais();
  },
};
</script>

<style>
.textoCard {
  font-size: small;
}
#divCard {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#divBoard {
  display: flex;
  max-width: 85vw;
  height: fit-content;
  overflow: auto;
}

.cardTask {
  background-color: black;
  color: white;
  height: 100px;
}

.colunm {
  width: 200px !important;
  min-height: 80vh !important;
  margin-right: 10px;
  min-width: 200px;
}

.colunmLast {
  width: 20rem !important;
  min-height: 80vh !important;
  margin-right: 0px !important;
}

.insere {
  margin-bottom: 30px;
}
.spanErro {
  font-size: small;
}

.modal-content {
  width: 600px !important;
}

.card-title {
  margin-bottom: 20px !important;
}

.card {
  padding: 10px !important;
}
</style>
