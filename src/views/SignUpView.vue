<template>
  <div>
    <section class="hero is-fullheight is-align-items-center">
      <div class="hero-body">
        <div class="box">
          <div class="container">
            <p class="title has-text-centered">Cadastro</p>
            <p class="subtitle">
              Preencha o formulário de cadastro para ter acesso ao ambiente.
            </p>

            <div class="field">
              <label class="label">Nome</label>
              <div class="control">
                <input
                  v-model="form.firstName"
                  class="input"
                  type="text"
                  placeholder="João"
                />
                <p class="has-text-danger" v-if="formErrors.firstName">
                  {{ formErrors.firstName }}
                </p>
              </div>
            </div>

            <div class="field">
              <label class="label">Sobrenome</label>
              <div class="control">
                <input
                  v-model="form.lastName"
                  class="input"
                  type="text"
                  placeholder="Silva Santos"
                />
                <p class="has-text-danger" v-if="formErrors.lastName">
                  {{ formErrors.lastName }}
                </p>
              </div>
            </div>

            <div class="field">
              <label class="label">E-mail</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model="form.email"
                  class="input"
                  type="email"
                  placeholder="joaosilva@outlook.com"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <p class="has-text-danger" v-if="formErrors.email">
                  {{ formErrors.email }}
                </p>
                <!-- <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span> -->
              </div>
            </div>

            <div class="field">
              <label class="label">Senha</label>
              <p class="control has-icons-left has-icons-right">
                <input
                  v-model="form.password"
                  class="input"
                  type="password"
                  placeholder="********"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                <!-- <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span> -->
              </p>
              <p class="has-text-danger" v-if="formErrors.password">
                {{ formErrors.password }}
              </p>
            </div>

            <div class="field">
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" />
                  Eu concordo com os <a href="#">termos de uso.</a>
                </label>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button @click="signup()" class="button is-success">
                  Cadastrar
                </button>
              </div>
              <div class="control">
                <button class="button is-link is-light">
                  <router-link to="/">Voltar</router-link>
                </button>
              </div>
            </div>
          </div>

          <div class="container">
            <img src="../assets/dog_cat.png" alt="logo pets" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "SignUpView",
  data() {
    return {
      alertError: "",
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signup() {
      this.formErrors = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };

      if (this.form.firstName === "") {
        this.formErrors.firstName = "Por favor, preencha o campo nome.";
      }

      if (this.form.lastName === "") {
        this.formErrors.lastName = "Por favor, preencha o campo sobrenome.";
      }

      if (this.form.email === "") {
        this.formErrors.email = "Por favor, preencha o campo e-mail.";
      }

      if (this.form.password === "") {
        this.formErrors.password = "Por favor, preencha o campo senha.";
      }

      // lógica para o cadastro

      axios
      .post('/user', this.form)
      .then(async (res) => {
        const resp = await res.data;
        console.log(resp) //Se tudo ocorreu bem irá exibir o token do usuário no console
        localStorage.setItem('user_token', resp.user_token); //Irá gravar no localStorage do navegador do cliente o token de autenticação
        this.$router.push('/dashboard'); //Após autenticado será redirecionado para a rota dashboard
      })
      .catch((error) => {
        this.alertError = 'E-mail ou senha incorretos'
        console.log(error)
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
  width: 400px;
}

.box {
  display: flex;
  align-items: center;
}

.hero-body {
  max-width: 800px;
}

.tabs {
  padding: 5px;
}
</style>