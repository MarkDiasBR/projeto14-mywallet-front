import axios from 'axios'
// import BASE_URL from '../constants/url';

const user = JSON.parse(localStorage.getItem("user"));
let config;

if (user) {
    config = { "headers": {"Authorization": `Bearer ${user.token}`} };
}

export async function signUp(form) {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, form)
    } catch (err) {
        console.log(err.response.data)
    }
}

export async function signIn(form) {
    try {
        const promise = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, form)
        return promise.data;
    } catch (err) {
        console.log(err.response.data)
    }
}

export async function pegarTransacoes() {
    try {
      const promise = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`, config);
      return promise.data
    } catch (err) {
      console.log(err.response.data)
    }
}

export async function novaTransacao(params, modifiedForm) {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/new-transaction/${params.type}`, modifiedForm, config)
    } catch (err) {
        console.log(err.response.data)
    }
}

export async function deleteTransacao(id) {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/transaction/${id}`, config)
        console.log("pronto deletado")
        await pegarTransacoes();
        console.log("pronto atualizado")
    } catch (err) {
        console.log(err.response.data)
    }
}

export async function editarTransacao(id, form) {
    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/transaction/${id}`, form, config)
    } catch (err) {
        console.log(err.response.data)
    }
}


// const user = JSON.parse(localStorage.getItem("user"));
// let config;

// if (user) {
//     config = { "headers": {"Authorization": `Bearer ${user.token}`} };
// }

// export async function pegarTransacoes() {
//     try {
//       const promise = await axios.get(`${BASE_URL}/transactions`, config);
//       console.log("atualizando papa")
//       return promise.data
//     } catch (err) {
//       console.log(err.response.data)
//     }
// }

// export async function novaTransacao(params, modifiedForm) {
//     try {
//         await axios.post(`${BASE_URL}/new-transaction/${params.type}`, modifiedForm, config)
//     } catch (err) {
//         console.log(err.response.data)
//     }
// }

// export async function deleteTransacao(id) {
//     try {
//         await axios.delete(`${BASE_URL}/transaction/${id}`, config)
//         console.log("pronto deletado")
//         await pegarTransacoes();
//         console.log("pronto atualizado")
//     } catch (err) {
//         console.log(err.response.data)
//     }
// }

// export async function editarTransacao(id, form) {
//     try {
//         await axios.put(`${BASE_URL}/transaction/${id}`, form, config)
//     } catch (err) {
//         console.log(err.response.data)
//     }
// }
