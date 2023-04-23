import axios from 'axios'
import BASE_URL from '../constants/url';

const user = JSON.parse(localStorage.getItem("user"));
const config = { "headers": {"Authorization": `Bearer ${user.token}`} };

export async function pegarTransacoes() {
    try {
      const promise = await axios.get(`${BASE_URL}/transactions`, config);
      console.log("atualizando papa")
      return promise.data
    } catch (err) {
      console.log(err.response.data)
    }
}

export async function novaTransacao(params, modifiedForm) {
    try {
        await axios.post(`${BASE_URL}/new-transaction/${params.type}`, modifiedForm, config)
    } catch (err) {
        console.log(err.response.data)
    }
}

export async function deleteTransacao(id) {
    try {
        await axios.delete(`${BASE_URL}/transaction/${id}`, config)
        console.log("pronto deletado")
        await pegarTransacoes();
        console.log("pronto atualizado")
    } catch (err) {
        console.log(err.response.data)
    }
}

export async function editarTransacao(id, form) {
    try {
        await axios.put(`${BASE_URL}/transaction/${id}`, form, config)
    } catch (err) {
        console.log(err.response.data)
    }
}
