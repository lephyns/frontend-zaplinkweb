<template>
  <nav class="navbar" id="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="../assets/osso.png" width="35" />
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" id="btn-sair">
              <a @click="logout()">
                <strong class="has-text-white">Sair</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      //Função adicionada no botão sair que remove o token do localStorage e volta para a tela de login
      localStorage.removeItem("user_token"); //Remove o token do localStorage
      this.$router.push("/"); //E retorna para a página de login
    },
  },
};
</script>

<style>

#navbar {
  background-color: rgb(51, 169, 224);
  color: white;
}
</style>

<!-- 
    Componente criado pois a navbar não deve ser exibida na tela de login
    Este componente está sendo importado no arquivo Dashboard.vue

    Criado a tag <script> para o botão logout

 -->