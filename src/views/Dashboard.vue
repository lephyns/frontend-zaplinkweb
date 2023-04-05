<template>
  <div class="dashboard">
    <Navbar/>
    <div class="container">
      <!-- Main container -->
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <h4 class="title is-4">Seu gerenciador digital de contatos</h4>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <div class="level-item">
            <b-button
              id="addNewContact"
              label="+"
              type="is-primary"
              @click="showContactAddModal = true"
              class="is-success"
            />
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input
                  class="input"
                  type="text"
                  v-model="searchInput"
                  placeholder="Número do Whats"
                />
              </p>
              <p class="control">
                <button class="button is-primary" @click="search">
                  Buscar
                </button>
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div id="loader" v-if="isLoading === true">
        <!--Se for igual a true irá mostrar esta lista -->
        <img src="../assets/loading.gif" alt="Loader" />
      </div>

      <article class="message is-danger" v-if="contactList.length === 0"> <!-- Se nenhum registro for encontrado na busca irá exibir este conteúdo-->
        <div class="message-body">
          Contato não encontrado :(
        </div>
      </article>

      <div class="contact-list columns is-multiline" v-if="isLoading === false">
        <!--Só vai mostrar a lista de contatos se o loading for false -->
        <div
          class="column is-4"
          v-for="contact in contactList"
          :key="contact._id"
        >
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="../assets/whatsapp.svg" alt="Logo WhatsApp" />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ contact.name }}</p>
                  <p class="subtitle is-6">{{ contact.number }}</p>
                </div>
              </div>

              <div class="content">
                {{ contact.description }}
              </div>
            </div>
            <footer class="card-footer">
              <a :href="zaplink(contact.number)" class="card-footer-item">Conversar</a>
              <a href="#" class="card-footer-item btn-remove" @click="remove(contact._id)">Apagar</a>
            </footer>
          </div>
        </div>
      </div>

      <b-modal
        v-model="showContactAddModal"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Example Modal"
        close-button-aria-label="Close"
        aria-modal
      >
        <form action="">
          <div class="modal-card" style="width: 450px">
            <header class="modal-card-head">
              <p class="modal-card-title">Novo contato</p>
              <button
                type="button"
                class="delete"
                @click="showContactAddModal = false"
              />
            </header>
            <section class="modal-card-body">
              <div class="field input-full-name">
                <input
                  class="input is-primary"
                  v-model="form.name"
                  placeholder="Nome completo"
                />
                <small class="has-text-danger" v-if="errorName === true"
                  >Nome é obrigatório.</small
                >
              </div>
              <div class="field input-number">
                <input
                  class="input is-primary"
                  v-model="form.number"
                  placeholder="WhatsApp"
                />
                <small class="has-text-danger" v-if="errorNumber === true"
                  >WhatsApp é obrigatório.</small
                >
              </div>
              <div class="field text-description">
                <textarea
                  class="textarea is-primary"
                  v-model="form.description"
                  placeholder="Assunto"
                ></textarea>
                <small class="has-text-danger" v-if="errorDescription === true"
                  >Assunto é obrigatório.</small
                >
              </div>
            </section>
            <footer class="modal-card-foot">
              <b-button
                id="saveButton"
                label="Cadastrar"
                type="button is-primary is-success"
                @click="create"
              />
            </footer>
          </div>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Navbar from '@/components/Navbar.vue'


export default {
  name: "Dashboard",
  components: {
    Navbar
  },
  data() {
    //valores são iniciados da forma que é exibido aqui, ex. errorNumber iniciará como false
    return {
      isLoading: false,
      contactList: [],
      showContactAddModal: false,
      errorName: false,
      errorNumber: false,
      errorDescription: false,
      searchInput: "",
      form: {
        name: "",
        number: "",
        description: "",
      },
    };
  },
  methods: {
    zaplink(number) {
      return `https://api.whatsapp.com/send?phone=55${number}`
    },
    search() {
      this.isLoading = true; // Enquanto estiver fazendo a busca o isLoading vai ser true (mostra o loader mas não mostra a lista)

      // console.log(this.searchInput) //Exibe no console a informação que será usada para fazer a busca no banco
      if (this.searchInput != "") {
        //Adicionado a condição porque sem ela não iria ser exibido nada se clicado em buscar sem nenhuma informação no campo
        this.contactList = this.contactList.filter(
          (contact) => contact.number === this.searchInput
        ); // Pega a lista de contatos, filtra ela somente para contatos que tem o number igual ao valor de searchImput
      } else {
        //Se o input estiver vazio irá recarregar a lista, que é função que busca os registros na API
        this.list();
      }
      this.isLoading = false; //Quando terminou a busca o isLoading é alterado para falso para o loading não ser mais exibido
      console.log(this.contactList) //Pega o valor de list() ao fazer a busca
    },
    create() {
      this.errorName = false; //Antes de começar a função `create()` é preciso zerar os erros para não ficarem fixo
      this.errorNumber = false;
      this.errorDescription = false;

      if (this.form.name === "") {
        // alert('Nome é obrigatório.') //Exibe um alerta informativo
        this.errorName = true;
        // return null //Para sair a função create() e não executar o restante do código. No caso não chamar a API - Retirado o null porque quando nenhum campo do formulário é preenchido não exibe todas as obrigações do front
      }

      if (this.form.number === "") {
        // alert('WhatsApp é obrigatório.') //Exibe um alerta informativo
        this.errorNumber = true;
      }

      if (this.form.description === "") {
        // alert('Assunto é obrigatório.') //Exibe um alerta informativo
        this.errorDescription = true;
      }

      if (
        this.errorName === false &&
        this.errorNumber === false &&
        this.errorDescription === false
      ) {
        //Só irá ser consumido a API se o formulário não tiver nenhum erro
        // console.log(this.form) //Exibe o formulário no console
        axios.post('/contacts', this.form).then(async (res) => {
          //Aqui enviamos um POST para a rota "/contacts"
          await res.data; //Aqui aguardamos a promessa
          this.showContactAddModal = false; //Para fechar a modal automaticamente quando clicado no botão `Cadastrar`
          this.list(); //Chamado a função list() que carraga a lista de contatos (vai na API e pega a informação mais atual)
        });
      }
    },
    remove(contactId) {
      // console.log(contactId) //Exibe o id do contato no console
      axios.delete('/contacts/' + contactId).then(async (res) => {
        await res.data
        this.list() //Para recarregar a lista de contatos
      })
    },
    async list() {
      this.isLoading = true; // Enquanto estiver fazendo a busca o isLoading vai ser true (mostra o loader mas não mostra a lista)
      try {
        const res = await axios.get('/contacts');
        this.contactList = res.data;
        // console.log(res.data);
        // continue with other instructions
      } catch (error) {
        console.log(error);
        // handle the error
      }
      this.isLoading = false; //Quando terminou a busca o isLoading é alterado para falso para o loading não ser mais exibido
    },
  },
  mounted() {
    this.list();
  },
};
</script>

<!-- 
Exemplo de como aplicar uma regra de negócio:
Vincular propriedade com input basta adicionar o `v-model=""` 
Criado propriedade dentro de `data()` -> searchInput 
Vinculado na tag input `Número do Whats` com o v-model 
Em methods foi criado uma função chamada `search()` que ao ser chamada exibe os registros com base no que o input recebeu
No botão Buscar foi adicionado o evento de click `@click="search"` que ao clicado chama a função search()
Utilizado a função `filter()` do javaScript em contactList[] que é o objeto que recebe a lista de contatos através do GET
Para exibir o valor retornado basta substituir o valor de contactList por ele mesmo:
this.contactList = this.contactList.filter((contact) => contact.number === this.searchInput)


Feito a transferência do navbar para um componete pois ele não deverá ser exibido na tela de login
Feito o import do componente navbar.vue 
Dentro do módulo exports default foi criado um objeto `componentes` com a navbar
Dentro da tag <template> foi adicionado o componente <Navbar/> que será exibido quando acessado o dashboard apenas

-->


