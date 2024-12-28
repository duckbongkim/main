<template>
  <!-- <nav>
    <span>Day1</span> : | <router-link to="/">Home</router-link> | 
    <span>Day2</span> : BindingPrac ->(|
    <router-link to="/test">Test</router-link> |
    <router-link to="/string">String</router-link> |
    <router-link to="/html">Html</router-link> |
    <router-link to="/attribute">Attribute</router-link> |
    <router-link to="/class">Class</router-link> |
    <router-link to="/input">Input</router-link> |
    <router-link to="/list">List</router-link> |
    <router-link to="/tt">TT</router-link> |
    <router-link to="/CBS">CheckBoxSelectRadio</router-link> |
    ) <br /> 
    <span>Day3</span> : Event ->(
      | <router-link to="/click">Click</router-link> |
        <router-link to="/change">Change</router-link> |
        <router-link to="/change2">ChangePrac</router-link> |
        <router-link to="/key">Key</router-link> |
    )<br />
    :Extra ->(
      | <router-link to="/render">Render</router-link> |
        <router-link to="/rendershow">RenderShow</router-link> |
        <router-link to="/computed">Computed</router-link> |
        <router-link to="/watch">Watch</router-link> |
        <router-link to="/lifecycle">LifeCycle</router-link> |
    )<br />
    <span>Day4,5</span> : Reuse ->(
      | <router-link to="/pagetitle">Page</router-link> |
        <router-link to="/parentview">ParentView</router-link> |
        <router-link to="/grid">TableView</router-link> |
        <router-link to="/mygrid">Mygrid</router-link> |
    )<br />
    <span>Day6</span> : ->(
      | <router-link to="/slot">Slot</router-link> |
        <router-link to="/provide">provide</router-link> |
        <router-link to="/directive">Custom Directive</router-link> |
    )
  </nav> -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary additional-height">
  <div class="container-fluid">
    <a class="navbar-brand" @click="goToMenu('/')">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Day2
          </a>
          <ul class="dropdown-menu">
            <li><p class="inner-title">BindingPrac</p></li>
            <li><a class="dropdown-item" @click="goToMenu('/test')">Test</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/string')">String</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/html')">Html</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/attribute')">Attribute</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/class')">Class</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/list')">List</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/input')">Input</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/tt')">TT</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/CBS')">CBS</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Day3
          </a>
          <ul class="dropdown-menu">
            <li ><p class="inner-title">Event</p></li>
            <li><a class="dropdown-item" @click="goToMenu('/click')">Click</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/change')">Change</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/change2')">Change2</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/key')">Key</a></li>
            <li ><p class="inner-title">Extra</p></li>
            <li><a class="dropdown-item" @click="goToMenu('/render')">Render</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/rendershow')">RenderShow</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/computed')">Computed</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/watch')">Watch</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/lifecycle')">LifeCycle</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Day4,5
          </a>
          <ul class="dropdown-menu">
            <li ><p class="inner-title">reuse</p></li>
            <li><a class="dropdown-item" @click="goToMenu('/pagetitle')">PageTitle</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/parentview')">ParentView</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/grid')">Grid</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/mygrid')">MyGrid</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Day6
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" @click="goToMenu('/slot')">Slot</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/provide')">Provide</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/directive')">CustomDirective</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Day7
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" @click="goToMenu('/mixin')">Mixin</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/plugin')">Plugin</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/vuex')">Vuex</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Day8
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" @click="goToMenu('/login')">Login</a></li>
            
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Day9
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" @click="goToMenu('/map')">Map</a></li>
            <li><a class="dropdown-item" @click="goToMenu('/calendar')">Calendar</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
    export default{
        methods :{
            goToMenu(path){
                this.$router.push({path:path});//vue에서 사용하는 해당 경로의 라우터로 이동시키는 코드.
            }
        }
    }
</script>
<style scoped>
li{
    padding: 0 10px;
}
a{
    cursor: pointer;
    
}
.inner-title{
    margin: 10px 0 0 5px;
    font-weight: 700;
}
</style>