<template>
  <nav id="app">
    <nav
      class="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="../assets/logo-nav.svg" width="112" height="28" />
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
              <div class="buttons">
                <a @click="logout()" class="button is-black">
                  <strong>Sair</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout() { //Função adicionada no botão sair que remove o token do localStorage e volta para a tela de login
      localStorage.removeItem('user_token') //Remove o token do localStorage
      this.$router.push('/') //E retorna para a página de login
    }
  }
}
</script>

<style>
.navbar {
  margin-bottom: 20px;
}
</style>

<!-- 
    Componente criado pois a navbar não deve ser exibida na tela de login
    Este componente está sendo importado no arquivo Dashboard.vue

    Criado a tag <script> para o botão logout

 -->