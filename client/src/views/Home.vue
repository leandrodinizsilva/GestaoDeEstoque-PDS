<template>
  <ToastComponent ref="toast"></ToastComponent>
  <div style="margin: auto; width: 50%; padding: 10px">
    <div style="width: 700px !important; height: 500px !important">
      <h2 style="text-align: center; margin-bottom: 20px">
        Material Por Tempo
      </h2>
      <div
        id="dropdownsDepositoMaterial"
        style="
          display: flex;
          justify-content: center;
          margin-bottom: 25px;
          margin: auto;
          width: 100%;
        "
      >
        <div class="form-group col-10" style="display: flex; margin-top: 10px">
          <label class="col-2">Depósito</label>
          <div class="col-4">
            <select
              v-model="depositoSelecionado"
              class="form-control"
              v-on:change="carregarRelatorioMaterialPorTempo()"
            >
              <option value=""></option>
              <option
                v-for="deposito in depositos"
                :key="deposito.id"
                :value="deposito.id"
              >
                {{ deposito.nome }}
              </option>
            </select>
          </div>
          <label class="col-2" style="margin-left: 15px">Material</label>
          <div class="col-4">
            <select
              v-model="materialSelecionado"
              class="form-control"
              v-on:change="carregarRelatorioMaterialPorTempo()"
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
          </div>
        </div>
      </div>
      <BarChart
        style="margin-top: 20px"
        :labels="labelsMaterialPorData"
        :label="labelMaterialPorData"
        :data="dataMaterialPorData"
        :key="key"
      ></BarChart>
    </div>
  </div>

  <div style="margin: auto; width: 50%; padding: 10px">
    <div style="width: 700px !important; height: 500px !important">
      <h2 style="text-align: center; margin-bottom: 20px">
        Material Por Tempo
      </h2>
      <div
        id="dropdownsDepositoMaterial"
        style="
          display: flex;
          justify-content: center;
          margin-bottom: 25px;
          margin: auto;
          width: 100%;
        "
      >
        <div class="form-group col-10" style="display: flex; margin-top: 10px">
          <label class="col-2">Depósito</label>
          <div class="col-4">
            <select
              v-model="depositoSelecionado"
              class="form-control"
              v-on:change="carregarRelatorioMaterialPorTempo()"
            >
              <option value=""></option>
              <option
                v-for="deposito in depositos"
                :key="deposito.id"
                :value="deposito.id"
              >
                {{ deposito.nome }}
              </option>
            </select>
          </div>
          <label class="col-2" style="margin-left: 15px">Material</label>
          <div class="col-4">
            <select
              v-model="materialSelecionado"
              class="form-control"
              v-on:change="carregarRelatorioMaterialPorTempo()"
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
          </div>
        </div>
      </div>
      <PieChart
        style="margin-top: 20px"
        :labels="labelsMaterialPorData"
        :label="labelMaterialPorData"
        :data="dataMaterialPorData"
        :key="key"
      ></PieChart>
    </div>
  </div>
</template>

<script>
import ToastComponent from "../components/ToastComponent.vue";
import BarChart from "@/components/BarChart.vue";
import PieChart from "@/components/PieChart.vue";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "BoardView",
  components: { ToastComponent, BarChart, PieChart },
  data() {
    return {
      dataMaterialPorData: [],
      labelsMaterialPorData: [],
      labelMaterialPorData: "# material",
      depositos: [],
      depositoSelecionado: null,
      materiais: [],
      materialSelecionado: null,
      key: 0,
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
    carregarRelatorioMaterialPorTempo() {
      this.axios
        .post("deposito/carregarRelatorioMaterialPorTempo", {
          depositoId: this.depositoSelecionado,
          materialId: this.materialSelecionado,
        })
        .then((result) => {
          this.dataMaterialPorData = result.data.quantidades;
          this.labelsMaterialPorData = result.data.datas;
          this.labelMaterialPorData = "# material";
          this.key++;
        });
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
