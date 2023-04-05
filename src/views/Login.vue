<template>
  <div>
    <section class="hero is-fullheight is-align-items-center">
      <div class="hero-body">
        <div class="box">
          <div class="container">
            <p class="title has-text-centered">Olá</p>
            <p class="subtitle">
              Digite suas credenciais para acessar o ambiente.
            </p>

            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input" v-model="form.email" type="email" placeholder="E-mail" />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>

            <div class="field">
              <p class="control has-icons-left">
                <input class="input" v-model="form.password" type="password" placeholder="Senha" />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>

            <article v-if="alertError" class="message is-danger">
                    <div class="message-body">
                      {{ alertError }}
                    </div>
                  </article>

            <div class="field">
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" />
                  Lembrar-se de mim
                </label>
              </div>
            </div>

            <article v-if="alertError" class="message is-danger"> <!--Classe do bulma-->
                    <div class="message-body">
                      {{ alertError }}
                    </div>
                  </article>

          <div class="field is-grouped">
              <div class="control">
                <button type="button"
                        @click="login()" class="button is-success">
                  <!-- <router-link to="/dashboard">Login</router-link> -->
                Login</button>
              </div>
              <div class="control">
                <button class="button is-link is-light">
                <router-link to="/signup">Criar uma conta</router-link></button>
              </div>
            </div>
          </div>

          <div class="container">
            <img class="" src="../assets/dog_cat_2.png" alt="" />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Login',
  data() {
    return {
      alertError: '',
      form: {
        //Pega o v-model adicionado nos imputs e coloca a informação dentro dos objetos email e password
        email: '',
        password: '',
      },
    };
  },
  methods: {
    //Métodos do vue.js
    login() {
      // console.log(this.form) //Exibe no console o objeto form para saber se ele está recendo a informação que queremos
      
      if(this.form.email === '') { //Se o e-mail não estiver preenchido
        this.alertError = 'Oops. Por favor informe seu e-mail' //Então recebe essa string no alertError
        return null
      }
      
      if(this.form.password === '') {//Se a senha não estiver preenchida
        this.alertError = 'Oops. Por favor informe sua senha' //Então recebe essa string no alertError
        return null
      }

      axios
      .post('/session', this.form)
      .then(async (res) => {
        const resp = await res.data;
        // console.log(resp) //Se tudo ocorreu bem irá exibir o token do usuário no console
        localStorage.setItem('user_token', resp.user_token); //Irá gravar no localStorage do navegador do cliente o token de autenticação
        this.$router.push('/dashboard'); //Após autenticado será redirecionado para a rota dashboard
      })
      .catch((error) => {
        this.alertError = 'E-mail ou senha incorretos'
      })
    },
  },
};
</script>

<style scoped>

.hero {
  background: #e7f6f2;
}

.title {
  padding-bottom: 1rem;
}

img {
  width: 300px;
}

.box {
  display: flex;
  align-items: center;
}

</style>

<!-- 
    Dentro do arquivo public>index.html foi adicionado o link do framework fontawesome
    Para conseguir adicionar os ícones no formulário de login

    Colocado a sessão de javaScript para implementar a autenticação
    Criado a função data() e login() dentro de export default
    Adicionado o v-model nas tags input "Seu e-mail" e "Sua senha" que ao serem preenchidas será transferido a informação para a função data() que tem o objeto "form"
    No botão entrar foi adicionado type="button" @click="login()" que ao clicar neste botão irá chamar a função login()

    Mensagens de alerta
    criado um objeto alertError dentro da função data()






  -->