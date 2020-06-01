import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class Sistema {
    
    //FUNÇÃO PARA DESLOGAR O USUÁRIO E APARECER NA TELA DE LOGIN
    logout() {
        auth().signOut()
    }
    // FUNÇÃO PARA CHAMAR O "OUVINTE" DE NOVOS DADOS DO FIREBASE. SE ATUALIZAR QUALQUER DADO NO BANCO, ELE BUSCA E MOSTRA NA TELA
    addAuthListener(callback) {
        auth().onAuthStateChanged(callback)
    }
    // FUNÇÃO PARA VERIFICAR DADOS DE ACESSO DO USUÁRIO
    login(email, password) {
        return auth().signInWithEmailAndPassword(email, password)
    }
    // FUNÇÃO PARA REGISTRAR NOVO USUÁRIO NO APLICATIVO
    async registerConfirme(email, password) {
        await auth().createUserWithEmailAndPassword(email, password)
        // return auth().currentUser.uid()
    }
    // FUNÇÃO QUE PEGA INFORMAÇÕES DO USUÁRIO SOBRE RECEITAS
    getUserInfo(callback) {
        return database().ref('finance_revenue')
        .child(auth().currentUser.uid)
        .on('value', callback)
    }

    /**
     * Função que adiciona novas informações no banco de dados
     */
    addUserInfo() {
        database().ref('finance_revenue')
        .child(auth().currentUser.uid)
    }
}

export default new Sistema();