
class Transferencia{
    constructor(id, materialId, depositoOrigemId, depositoDestinoId, data, quantidade, usuarioId) {
        this.id = id
        this.materialId = materialId
        this.depositoOrigemId = depositoOrigemId
        this.depositoDestinoId = depositoDestinoId
        this.quantidade = quantidade
        this.data = data
        this.usuarioId = usuarioId
    }
}

export default Transferencia